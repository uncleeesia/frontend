import React, { useState, useEffect, useRef } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#34D399', '#60A5FA', '#FBBF24', '#F87171'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
        <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
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
      {isExporting ? 'Exporting...' : 'Export as PDF'}
    </button>
  );
}

function CleanerStats() {
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const dashboardRef = useRef(null);
  const [dateRange, setDateRange] = useState('3m');
  
  const [stats, setStats] = useState({ 
    views: 1240, 
    saves: 85, 
    jobs: 42, 
    rating: 4.7,
    income: 4250,
  });
  
  const [serviceData, setServiceData] = useState([
    { name: 'Regular Cleaning', value: 35 },
    { name: 'Deep Cleaning', value: 25 },
    { name: 'Move-in Cleaning', value: 25 },
    { name: 'Office Cleaning', value: 15 }
  ]);
  
  const [jobData, setJobData] = useState([
    { month: 'Jan', jobs: 5, income: 500 },
    { month: 'Feb', jobs: 8, income: 850 },
    { month: 'Mar', jobs: 12, income: 1200 },
    { month: 'Apr', jobs: 10, income: 980 },
    { month: 'May', jobs: 15, income: 1420 },
    { month: 'Jun', jobs: 18, income: 1750 },
    { month: 'Jul', jobs: 20, income: 1950 },
    { month: 'Aug', jobs: 22, income: 2150 },
    { month: 'Sep', jobs: 18, income: 1800 },
    { month: 'Oct', jobs: 15, income: 1500 },
    { month: 'Nov', jobs: 12, income: 1250 },
    { month: 'Dec', jobs: 8, income: 900 }
  ]);

  useEffect(() => {
    console.log(`Date range changed to: ${dateRange}`);
    
    if (dateRange === '3m') {
      setJobData([
        { month: 'Oct', jobs: 15, income: 1500 },
        { month: 'Nov', jobs: 12, income: 1250 },
        { month: 'Dec', jobs: 8, income: 900 }
      ]);
      setStats(prev => ({...prev, jobs: 35, income: 3650}));
    } else if (dateRange === '6m') {
      setJobData([
        { month: 'Jul', jobs: 20, income: 1950 },
        { month: 'Aug', jobs: 22, income: 2150 },
        { month: 'Sep', jobs: 18, income: 1800 },
        { month: 'Oct', jobs: 15, income: 1500 },
        { month: 'Nov', jobs: 12, income: 1250 },
        { month: 'Dec', jobs: 8, income: 900 }
      ]);
      setStats(prev => ({...prev, jobs: 95, income: 9650}));
    } else if (dateRange === '9m') {
      setJobData([
        { month: 'Apr', jobs: 10, income: 980 },
        { month: 'May', jobs: 15, income: 1420 },
        { month: 'Jun', jobs: 18, income: 1750 },
        { month: 'Jul', jobs: 20, income: 1950 },
        { month: 'Aug', jobs: 22, income: 2150 },
        { month: 'Sep', jobs: 18, income: 1800 },
        { month: 'Oct', jobs: 15, income: 1500 },
        { month: 'Nov', jobs: 12, income: 1250 },
        { month: 'Dec', jobs: 8, income: 900 }
      ]);
      setStats(prev => ({...prev, jobs: 138, income: 13700}));
    } else if (dateRange === '1y') {
      setJobData([
        { month: 'Jan', jobs: 5, income: 500 },
        { month: 'Feb', jobs: 8, income: 850 },
        { month: 'Mar', jobs: 12, income: 1200 },
        { month: 'Apr', jobs: 10, income: 980 },
        { month: 'May', jobs: 15, income: 1420 },
        { month: 'Jun', jobs: 18, income: 1750 },
        { month: 'Jul', jobs: 20, income: 1950 },
        { month: 'Aug', jobs: 22, income: 2150 },
        { month: 'Sep', jobs: 18, income: 1800 },
        { month: 'Oct', jobs: 15, income: 1500 },
        { month: 'Nov', jobs: 12, income: 1250 },
        { month: 'Dec', jobs: 8, income: 900 }
      ]);
      setStats(prev => ({...prev, jobs: 163, income: 16250}));
    }
  }, [dateRange]);

  const handleExportPDF = async () => {
    // ... (keep your existing PDF export function)
  };

  return (
    <div ref={dashboardRef} className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
            <DateRangeSelector onChange={setDateRange} currentRange={dateRange} />
            <div data-export-button>
              <ExportPdfButton onExport={handleExportPDF} isExporting={isExporting} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 text-center">Cleaner Performance Dashboard</h2>
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Profile Views" value={stats.views.toLocaleString()} />
            <StatCard title="Liked Received" value={stats.saves} />
            <StatCard title="Completed Jobs" value={stats.jobs} />
            <StatCard title="Rating" value={`${stats.rating.toFixed(1)} / 5`} />
          </div>
          
          {/* Income & Jobs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Jobs Chart */}
            <div className="bg-white shadow rounded-xl p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Jobs Taken Up (Monthly)</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={jobData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis allowDecimals={false} stroke="#666" />
                    <Tooltip 
                      cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        border: '1px solid #eee',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Monthly Revenue</h3>
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
                      formatter={(value) => [`${value}`, 'Revenue']}
                      cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        border: '1px solid #eee',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Service Type Distribution</h3>
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
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CleanerStats;