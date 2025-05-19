import React, { useState, useEffect } from "react";
import {
  Calendar,
  Filter,
  DollarSign,
  Clock,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
const user_id = localStorage.getItem("user_id");
const port = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const ViewBookingHistory = () => {

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [filter, setFilter] = useState({ time: "all", service: "all" });
  const [expandedMonths, setExpandedMonths] = useState({});

  const fetchBookingHistory = async () => {
    try {
      const res = await axios.get(
        `${port}/api/getAllPaymentTransactionByUserId?user_id=${user_id}`
      );
      const paymentData = res.data.payment;

      const transformed = paymentData.map((p) => ({
        id: p.id || `${p.booking_timestamp}-${p.service_id}`, // or generate UUID
        date: p.payment_timestamp,
        service: p.service_tags[0],
        duration: "1 hr", // replace with actual duration if available
        amount: parseFloat(p.price),
        status: "Completed", // set dynamically if needed
      }));

      setBookings(transformed);
      setServiceTypes([...new Set(transformed.map((b) => b.service))]);
    } catch (err) {
      console.error("Error fetching booking data:", err);
    }
  };

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let filtered = [...bookings];

    // Time filter
    if (filter.time !== "all") {
      const monthsBack = { "3m": 3, "6m": 6, "9m": 9, "1y": 12 }[filter.time];
      filtered = filtered.filter((booking) => {
        const date = new Date(booking.date);
        const monthsDiff =
          (currentYear - date.getFullYear()) * 12 +
          (currentMonth - date.getMonth());
        return monthsDiff >= 0 && monthsDiff < monthsBack;
      });
    }

    // Service filter
    if (filter.service !== "all") {
      filtered = filtered.filter((b) => b.service === filter.service);
    }

    setFilteredBookings(filtered);
  }, [filter, bookings]);

  const groupByMonth = (data) =>
    data.reduce((acc, booking) => {
      const monthYear = booking.date.substring(0, 7);
      acc[monthYear] = acc[monthYear] || [];
      acc[monthYear].push(booking);
      return acc;
    }, {});

  const toggleMonth = (monthYear) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [monthYear]: !prev[monthYear],
    }));
  };

  const formatMonthYear = (monthYear) => {
    const [year, month] = monthYear.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const calculateTotalEarnings = (bookings) =>
    bookings.reduce((sum, b) => sum + b.amount, 0);

  const monthlyBookings = groupByMonth(filteredBookings);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            <Calendar className="inline mr-2" size={20} />
            Booking History
          </h1>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Time Filter */}
            <div className="flex items-center">
              <Filter className="text-gray-500 mr-2" size={18} />
              <select
                className="bg-white border border-gray-300 rounded-md py-1 px-3 text-sm"
                value={filter.time}
                onChange={(e) =>
                  setFilter({ ...filter, time: e.target.value })
                }
              >
                <option value="all">All Time</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="9m">Last 9 Months</option>
                <option value="1y">Last Year</option>
              </select>
            </div>

            {/* Service Filter */}
            <div className="flex items-center">
              <Filter className="text-gray-500 mr-2" size={18} />
              <select
                className="bg-white border border-gray-300 rounded-md py-1 px-3 text-sm"
                value={filter.service}
                onChange={(e) =>
                  setFilter({ ...filter, service: e.target.value })
                }
              >
                <option value="all">All Services</option>
                {serviceTypes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Earnings */}
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <DollarSign className="inline mr-1" size={14} />
              Total: ${calculateTotalEarnings(filteredBookings)}
            </div>
          </div>
        </div>

        {/* Monthly Booking Groups */}
        <div className="space-y-4">
          {Object.entries(monthlyBookings).map(([monthYear, bookings]) => {
            const isExpanded = expandedMonths[monthYear];
            return (
              <div key={monthYear} className="bg-white shadow rounded-lg">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleMonth(monthYear)}
                >
                  <div className="flex items-center">
                    <h2 className="font-semibold text-lg">
                      {formatMonthYear(monthYear)}
                    </h2>
                    <span className="ml-2 text-sm text-gray-500">
                      ({bookings.length} jobs)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-3">
                      ${calculateTotalEarnings(bookings)}
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {["Date", "Service", "Duration", "Amount", "Status"].map((heading, i) => (
                              <th
                                key={i}
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                              >
                                {heading === "Duration" && (
                                  <Clock className="inline mr-1" size={14} />
                                )}
                                {heading === "Amount" && (
                                  <DollarSign className="inline mr-1" size={14} />
                                )}
                                {heading}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {bookings.map((b) => (
                            <tr key={b.id}>
                              <td className="px-4 py-2 text-sm whitespace-nowrap">
                                {new Date(b.date).toLocaleDateString("en-US", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </td>
                              <td className="px-4 py-2 text-sm font-medium">{b.service}</td>
                              <td className="px-4 py-2 text-sm">{b.duration}</td>
                              <td className="px-4 py-2 text-sm font-medium">${b.amount}</td>
                              <td className="px-4 py-2">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    b.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {Object.keys(monthlyBookings).length === 0 && (
            <div className="bg-white shadow rounded-xl p-8 text-center">
              <p className="text-gray-500">No bookings found matching your filters</p>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <SummaryCard title="Total Bookings" value={filteredBookings.length} />
          <SummaryCard
            title="Total Earnings"
            value={`$${calculateTotalEarnings(filteredBookings)}`}
          />
          <SummaryCard
            title="Average per Booking"
            value={
              filteredBookings.length > 0
                ? `$${(calculateTotalEarnings(filteredBookings) / filteredBookings.length).toFixed(2)}`
                : "$0.00"
            }
          />
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-xl p-4">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
  </div>
);

export default ViewBookingHistory;