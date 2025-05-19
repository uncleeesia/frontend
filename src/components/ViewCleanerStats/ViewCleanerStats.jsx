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
        <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
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
    jobs: 0,
    rating: 0,
    income: 0,
  });

  const [serviceData, setServiceData] = useState([]);
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [paymentRes, reviewRes] = await Promise.all([
          axios.get(`${port}/api/getAllPaymentTransactionByUserId?user_id=${user_id}`),
          axios.get(`${port}/api/getAllReviewsById?user_id=${user_id}`)
        ]);

        const payments = paymentRes.data.payment || [];
        const reviews = reviewRes.data.reviews || [];

        // Count services used
        const tagCounts = {};
        payments.forEach((entry) => {
          entry.service_tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        });
        const result = Object.entries(tagCounts).map(([name, value]) => ({ name, value }));
        setServiceData(result);

        // Setup months
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

        // Map service_id -> review_scores
        const serviceReviewMap = {};
        reviews.forEach((r) => {
          if (!serviceReviewMap[r.service_id]) {
            serviceReviewMap[r.service_id] = [];
          }
          serviceReviewMap[r.service_id].push(r.review_score);
        });

        payments.forEach((booking) => {
          const date = new Date(booking.payment_timestamp);
          const month = date.toLocaleString("default", { month: "short" });

          if (dataByMonth[month]) {
            dataByMonth[month].jobs += 1;
            dataByMonth[month].income += parseFloat(booking.price) || 0;

            const scores = serviceReviewMap[booking.service_id] || [];
            scores.forEach((s) => {
              dataByMonth[month].scoreTotal += s;
              dataByMonth[month].scoreCount += 1;
            });
          }
        });

        const fullData = rollingMonths.map((month) => {
          const { jobs, income, scoreTotal, scoreCount } = dataByMonth[month];
          const avgScore = scoreCount > 0 ? +(scoreTotal / scoreCount).toFixed(2) : 0;
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
        const totalScoreCount = filteredData.reduce((sum, d) => sum + (d.jobs || 0), 0);
        const overallAvgScore = totalScoreCount > 0 ? +(totalScoreSum / totalScoreCount).toFixed(2) : 0;

        setJobData(filteredData);
        setStats((prev) => ({
          ...prev,
          jobs: totalJobs,
          income: totalIncome,
          rating: overallAvgScore,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, [dateRange]);

  const handleExportPDF = async () => {
    // You already have this part implemented.
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-black">
          <ArrowLeft size={18} /> Back
        </button>
        <ExportPdfButton onExport={handleExportPDF} isExporting={isExporting} />
      </div>

      <DateRangeSelector currentRange={dateRange} onChange={setDateRange} />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard title="Profile Views" value={stats.views} />
        <StatCard title="Liked Received" value={stats.saves} />
        <StatCard title="Completed Jobs" value={stats.jobs} />
        <StatCard title="Rating" value={`${stats.rating.toFixed(1)} / 5`} />
        <StatCard title="Total Revenue" value={`$${stats.income}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Jobs & Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={jobData}>
              <defs>
                <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34D399" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="income" stroke="#34D399" fillOpacity={1} fill="url(#incomeColor)" />
              <Area type="monotone" dataKey="jobs" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Service Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={serviceData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ViewCleanerStats;
