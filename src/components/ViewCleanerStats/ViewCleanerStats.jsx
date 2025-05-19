import React, { useState, useEffect, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const port = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const user_id = localStorage.getItem("user_id");
// campbellmartin@example.com, P@ssw0rd | user_id 6

const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F87171"];

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
    </div>
  );
}

function DateRangeSelector({ onChange, currentRange }) {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-4">
      <div>
        <label
          htmlFor="dateRange"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date Range
        </label>
        <select
          id="dateRange"
          className="bg-white border border-gray-300 rounded-md py-1 px-3 text-sm"
          value={currentRange}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="3m">Last 3 months</option>
          <option value="6m">Last 6 months</option>
          <option value="9m">Last 9 months</option>
          <option value="1y">Last year</option>
        </select>
      </div>
    </div>
  );
}

function ExportPdfButton({ onExport, isExporting }) {
  return (
    <button
      onClick={onExport}
      disabled={isExporting}
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors disabled:bg-green-400"
    >
      <FileText size={18} />
      {isExporting ? "Exporting..." : "Export as PDF"}
    </button>
  );
}

function ViewCleanerStats() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const dashboardRef = useRef(null);
  const [dateRange, setDateRange] = useState("3m");

  const [stats, setStats] = useState({
    views: 1240,
    saves: 85,
    jobs: 42,
    rating: 4.7,
    income: 4250,
  });

  const [serviceData, setServiceData] = useState([
    { name: "Regular Cleaning", value: 35 },
    { name: "Deep Cleaning", value: 25 },
    { name: "Move-in Cleaning", value: 25 },
    { name: "Office Cleaning", value: 15 },
  ]);

  const [jobData, setJobData] = useState([
    { month: "Jun", jobs: 18, income: 1750 },
    { month: "Jul", jobs: 20, income: 1950 },
    { month: "Aug", jobs: 22, income: 2150 },
    { month: "Sep", jobs: 18, income: 1800 },
    { month: "Oct", jobs: 15, income: 1500 },
    { month: "Nov", jobs: 12, income: 1250 },
    { month: "Dec", jobs: 8, income: 900 },
    { month: "Jan", jobs: 5, income: 500 },
    { month: "Feb", jobs: 8, income: 850 },
    { month: "Mar", jobs: 12, income: 1200 },
    { month: "Apr", jobs: 10, income: 980 },
    { month: "May", jobs: 15, income: 1420 },
  ]);

  useEffect(() => {
    axios
      .get(`${port}/api/getAllPaymentTransactionByUserId?user_id=${user_id}`)
      .then((res) => {
        const payment = res.data.payment;
        console.log(payment);
        const tagCounts = {};
        payment.forEach((entry) => {
          entry.service_tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        });
        const result = Object.entries(tagCounts).map(([name, value]) => ({
          name,
          value,
        }));

        axios
          .get(`${port}/api/getAllReviewsById?user_id=${user_id}`)
          .then((res) => {
            console.log(res.data.reviews);
          });

        setServiceData(result);

        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const now = new Date();
        const currentMonthIdx = now.getMonth();
        const rollingMonths = Array.from(
          { length: 12 },
          (_, i) => monthOrder[(currentMonthIdx - 11 + i + 12) % 12]
        );

        const dataByMonth = {};
        rollingMonths.forEach((month) => {
          dataByMonth[month] = {
            jobs: 0,
            income: 0,
            scoreTotal: 0,
            scoreCount: 0,
          };
        });

        payment.forEach((booking) => {
          const date = new Date(booking.payment_timestamp);
          const month = date.toLocaleString("default", { month: "short" });
          if (dataByMonth[month]) {
            dataByMonth[month].jobs += 1;
            dataByMonth[month].income += parseFloat(booking.price) || 0;

            const score = booking.review_score;
            if (typeof score === "number") {
              dataByMonth[month].scoreTotal += score;
              dataByMonth[month].scoreCount += 1;
            }
          }
        });

        const fullData = rollingMonths.map((month) => {
          const { jobs, income, scoreTotal, scoreCount } = dataByMonth[month];
          const avgScore =
            scoreCount > 0 ? +(scoreTotal / scoreCount).toFixed(2) : 0;
          return { month, jobs, income, avgScore };
        });

        const rangeMap = { "3m": 3, "6m": 6, "9m": 9, "1y": 12 };
        const limit = rangeMap[dateRange] || 12;
        const filteredData = fullData.slice(-limit);

        const totalJobs = filteredData.reduce((sum, d) => sum + d.jobs, 0);
        const totalIncome = filteredData.reduce((sum, d) => sum + d.income, 0);
        const totalScoreSum = filteredData.reduce(
          (sum, d) => sum + d.avgScore * (d.jobs || 1),
          0
        );
        const totalScoreCount = filteredData.reduce(
          (sum, d) => sum + (d.jobs || 0),
          0
        );
        const overallAvgScore =
          totalScoreCount > 0
            ? +(totalScoreSum / totalScoreCount).toFixed(2)
            : 0;

        setJobData(filteredData);
        setStats((prev) => ({
          ...prev,
          jobs: totalJobs,
          income: totalIncome,
          rating: overallAvgScore,
        }));
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [dateRange]);

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);

      // Simple date format (DDMMYY)
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = String(now.getFullYear()).slice(-2);
      const dateString = `${day}${month}${year}`;

      const fileName = prompt(
        "Enter a name for your PDF file:",
        `MyPerformanceSummary_${dateString}`
      );

      if (!fileName) {
        setIsExporting(false);
        return;
      }

      const jsPDF = await import("jspdf");
      const { default: JsPDF } = jsPDF;

      let dateRangeText = "Last 3 months";
      if (dateRange === "6m") dateRangeText = "Last 6 months";
      if (dateRange === "9m") dateRangeText = "Last 9 months";
      if (dateRange === "1y") dateRangeText = "Last year";

      const pdf = new JsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.setProperties({
        title: "My Performance Dashboard",
        subject: `Performance Statistics (${dateRangeText})`,
        author: "Cleaning Service App",
        creator: "Dashboard Export Tool",
      });

      pdf.setFontSize(22);
      pdf.setTextColor(33, 33, 33);
      pdf.text("My Performance Dashboard", pdfWidth / 2, 15, {
        align: "center",
      });

      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Report Period: ${dateRangeText}`, pdfWidth / 2, 22, {
        align: "center",
      });

      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      pdf.text(`Generated on: ${currentDate}`, pdfWidth / 2, 28, {
        align: "center",
      });

      pdf.setDrawColor(200, 200, 200);
      pdf.line(15, 32, pdfWidth - 15, 32);

      // Key Statistics
      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.text("Key Performance Metrics", 15, 40);

      pdf.setFontSize(11);
      pdf.setTextColor(70, 70, 70);

      const statsY = 48;
      pdf.text("Profile Views:", 15, statsY);
      pdf.text("Liked Received:", 15, statsY + 7);
      pdf.text("Completed Jobs:", 15, statsY + 14);
      pdf.text("Rating:", 15, statsY + 21);
      pdf.text("Total Revenue:", 15, statsY + 28);

      pdf.setFont(undefined, "bold");
      pdf.text(stats.views.toLocaleString(), 55, statsY);
      pdf.text(stats.saves.toString(), 55, statsY + 7);
      pdf.text(stats.jobs.toString(), 55, statsY + 14);
      pdf.text(`${stats.rating.toFixed(1)} / 5`, 55, statsY + 21);
      pdf.text(`${stats.income.toLocaleString()}`, 55, statsY + 28);
      pdf.setFont(undefined, "normal");

      // Monthly Jobs and Revenue
      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.text("Monthly Jobs and Revenue", 15, 85);

      pdf.setFontSize(10);
      pdf.setTextColor(70, 70, 70);

      pdf.setFont(undefined, "bold");
      pdf.text("Month", 15, 95);
      pdf.text("Jobs Completed", 60, 95);
      pdf.text("Revenue", 110, 95);
      pdf.setFont(undefined, "normal");

      let tableY = 102;
      jobData.forEach((data, i) => {
        pdf.text(data.month, 15, tableY + i * 7);
        pdf.text(data.jobs.toString(), 60, tableY + i * 7);
        pdf.text(`${data.income}`, 110, tableY + i * 7);
      });

      const totalJobs = jobData.reduce((sum, item) => sum + item.jobs, 0);
      const totalIncome = jobData.reduce((sum, item) => sum + item.income, 0);

      tableY = tableY + jobData.length * 7 + 5;
      pdf.setDrawColor(200, 200, 200);
      pdf.line(15, tableY - 7, 150, tableY - 7);
      pdf.setFont(undefined, "bold");
      pdf.text("Total", 15, tableY);
      pdf.text(totalJobs.toString(), 60, tableY);
      pdf.text(`${totalIncome}`, 110, tableY);
      pdf.setFont(undefined, "normal");

      // Service Type Distribution
      let nextSectionY = tableY + 15;

      if (nextSectionY > pdfHeight - 20) {
        pdf.addPage();
        nextSectionY = 20;
      }

      pdf.setFontSize(16);
      pdf.setTextColor(33, 33, 33);
      pdf.text("Service Type Distribution", 15, nextSectionY);

      pdf.setFontSize(10);
      pdf.setTextColor(70, 70, 70);

      let serviceY = nextSectionY + 10;
      pdf.setFont(undefined, "bold");
      pdf.text("Service Type", 15, serviceY);
      pdf.text("Percentage", 100, serviceY);
      pdf.setFont(undefined, "normal");

      serviceData.forEach((service, i) => {
        pdf.text(service.name, 15, serviceY + (i + 1) * 7);
        pdf.text(`${service.value}%`, 100, serviceY + (i + 1) * 7);
      });

      // Footer
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(`Page ${i} of ${pageCount}`, pdfWidth / 2, pdfHeight - 10, {
          align: "center",
        });
        pdf.text(
          "Generated by CleanerStats Dashboard",
          pdfWidth - 15,
          pdfHeight - 10,
          { align: "right" }
        );
      }

      // Save with user-specified filename
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      ref={dashboardRef}
      className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)} // Go back to previous page
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Profile</span>
          </button>

          <div className="flex gap-4 items-center">
            <DateRangeSelector
              onChange={setDateRange}
              currentRange={dateRange}
            />
            <div data-export-button>
              <ExportPdfButton
                onExport={handleExportPDF}
                isExporting={isExporting}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            My Performance Dashboard
          </h2>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Profile Views"
              value={stats.views.toLocaleString()}
            />
            <StatCard title="Liked Received" value={stats.saves} />
            <StatCard title="Completed Jobs" value={stats.jobs} />
            <StatCard title="Rating" value={`${stats.rating.toFixed(1)} / 5`} />
          </div>

          {/* Income & Jobs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Jobs Chart */}
            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Jobs Taken Up (Monthly)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={jobData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis allowDecimals={false} stroke="#666" />
                    <Tooltip
                      cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #eee",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="jobs"
                      name="Jobs Completed"
                      fill="#60A5FA"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Income Chart */}
            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Monthly Revenue
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={jobData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis
                      stroke="#666"
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}`, "Revenue"]}
                      cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #eee",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="income"
                      name="Revenue"
                      stroke="#34D399"
                      fill="#34D399"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-right text-lg font-semibold text-gray-700">
                Total: ${stats.income}
              </div>
            </div>
          </div>

          {/* Service Distribution */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Service Type Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {serviceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCleanerStats;
