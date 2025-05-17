import React, { useState, useEffect } from 'react';
import { Calendar, Filter, DollarSign, Clock, ChevronUp, ChevronDown } from 'lucide-react';

const ViewBookingHistory = () => {
  const bookingsData = [
    // June 2024 - 18 jobs ($1750 total)
    { id: 1, date: '2024-06-01', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 2, date: '2024-06-03', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 3, date: '2024-06-05', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 4, date: '2024-06-07', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 5, date: '2024-06-08', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 6, date: '2024-06-10', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 7, date: '2024-06-12', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 9, date: '2024-06-15', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 10, date: '2024-06-17', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 11, date: '2024-06-19', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 13, date: '2024-06-22', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 14, date: '2024-06-24', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 15, date: '2024-06-26', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 16, date: '2024-06-28', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 17, date: '2024-06-29', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 18, date: '2024-06-30', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },

    // July 2024 - 20 jobs ($1950 total)
    { id: 19, date: '2024-07-01', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 20, date: '2024-07-02', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 21, date: '2024-07-03', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 22, date: '2024-07-05', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 23, date: '2024-07-07', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 24, date: '2024-07-08', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 25, date: '2024-07-10', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 26, date: '2024-07-12', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 27, date: '2024-07-14', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 28, date: '2024-07-15', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 29, date: '2024-07-17', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 30, date: '2024-07-19', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 31, date: '2024-07-21', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 32, date: '2024-07-22', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 33, date: '2024-07-24', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 34, date: '2024-07-26', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 35, date: '2024-07-28', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 36, date: '2024-07-29', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 37, date: '2024-07-30', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 38, date: '2024-07-31', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },

    // August 2024 - 22 jobs ($2150 total)
    { id: 39, date: '2024-08-01', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 40, date: '2024-08-02', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 41, date: '2024-08-03', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 42, date: '2024-08-05', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 43, date: '2024-08-07', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 44, date: '2024-08-08', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 45, date: '2024-08-10', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 46, date: '2024-08-12', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 47, date: '2024-08-14', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 48, date: '2024-08-15', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 49, date: '2024-08-17', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 50, date: '2024-08-19', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 51, date: '2024-08-21', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 52, date: '2024-08-22', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 53, date: '2024-08-24', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 54, date: '2024-08-26', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 55, date: '2024-08-28', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 56, date: '2024-08-29', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 57, date: '2024-08-30', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 58, date: '2024-08-31', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 59, date: '2024-08-04', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 60, date: '2024-08-06', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },

    // September 2024 - 18 jobs ($1800 total)
    { id: 61, date: '2024-09-01', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 62, date: '2024-09-03', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 63, date: '2024-09-05', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 64, date: '2024-09-07', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 65, date: '2024-09-08', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 66, date: '2024-09-10', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 67, date: '2024-09-12', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 68, date: '2024-09-14', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 69, date: '2024-09-15', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 70, date: '2024-09-17', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 71, date: '2024-09-19', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 72, date: '2024-09-21', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 73, date: '2024-09-22', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 74, date: '2024-09-24', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 75, date: '2024-09-26', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 76, date: '2024-09-28', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 77, date: '2024-09-29', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 78, date: '2024-09-30', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },

    // October 2024 - 15 jobs ($1500 total)
    { id: 79, date: '2024-10-01', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 80, date: '2024-10-03', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 81, date: '2024-10-05', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 82, date: '2024-10-07', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 83, date: '2024-10-08', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 84, date: '2024-10-10', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 85, date: '2024-10-12', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 86, date: '2024-10-14', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 87, date: '2024-10-15', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 88, date: '2024-10-17', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 89, date: '2024-10-19', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 90, date: '2024-10-21', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 91, date: '2024-10-22', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 92, date: '2024-10-24', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 93, date: '2024-10-26', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },

    // November 2024 - 12 jobs ($1250 total)
    { id: 94, date: '2024-11-01', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 95, date: '2024-11-03', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 96, date: '2024-11-05', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 97, date: '2024-11-07', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 98, date: '2024-11-08', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 99, date: '2024-11-10', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 100, date: '2024-11-12', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 101, date: '2024-11-14', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 102, date: '2024-11-15', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 103, date: '2024-11-17', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 104, date: '2024-11-19', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 105, date: '2024-11-21', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },

    // December 2024 - 8 jobs ($900 total)
    { id: 106, date: '2024-12-01', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 107, date: '2024-12-03', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 108, date: '2024-12-05', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 109, date: '2024-12-07', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 110, date: '2024-12-08', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 111, date: '2024-12-10', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 112, date: '2024-12-12', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 113, date: '2024-12-14', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },

    // January 2025 - 5 jobs ($500 total)
    { id: 114, date: '2025-01-01', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 115, date: '2025-01-03', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 116, date: '2025-01-05', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 117, date: '2025-01-07', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 118, date: '2025-01-09', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },

    // February 2025 - 8 jobs ($850 total)
    { id: 119, date: '2025-02-01', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 120, date: '2025-02-03', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 121, date: '2025-02-05', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 122, date: '2025-02-07', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 123, date: '2025-02-09', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 124, date: '2025-02-11', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 125, date: '2025-02-13', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 126, date: '2025-02-15', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },

    // March 2025 - 12 jobs ($1200 total)
    { id: 127, date: '2025-03-01', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 128, date: '2025-03-03', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 129, date: '2025-03-05', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 130, date: '2025-03-07', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 131, date: '2025-03-09', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 132, date: '2025-03-11', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 133, date: '2025-03-13', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 134, date: '2025-03-15', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 135, date: '2025-03-17', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 136, date: '2025-03-19', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 137, date: '2025-03-21', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 138, date: '2025-03-23', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },

    // April 2025 - 10 jobs ($980 total)
    { id: 139, date: '2025-04-01', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 140, date: '2025-04-03', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 141, date: '2025-04-05', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 142, date: '2025-04-07', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 143, date: '2025-04-09', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 144, date: '2025-04-11', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 145, date: '2025-04-13', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 146, date: '2025-04-15', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 147, date: '2025-04-17', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 148, date: '2025-04-19', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },

    // May 2025 - 15 jobs ($1420 total)
    { id: 149, date: '2025-05-01', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 150, date: '2025-05-03', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 151, date: '2025-05-05', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 152, date: '2025-05-07', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 153, date: '2025-05-09', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 154, date: '2025-05-11', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 155, date: '2025-05-13', service: 'Office Cleaning', duration: '5 hours', amount: 200, status: 'Completed' },
    { id: 156, date: '2025-05-15', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 157, date: '2025-05-17', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 158, date: '2025-05-19', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
    { id: 160, date: '2025-05-23', service: 'Regular Cleaning', duration: '2 hours', amount: 80, status: 'Completed' },
    { id: 161, date: '2025-05-25', service: 'Deep Cleaning', duration: '3 hours', amount: 120, status: 'Completed' },
    { id: 162, date: '2025-05-27', service: 'Move-in Cleaning', duration: '4 hours', amount: 150, status: 'Completed' },
  ];

  // Usage in your component:
  const [bookings, setBookings] = useState(bookingsData);

  const [expandedMonths, setExpandedMonths] = useState({});
  const [filter, setFilter] = useState({ time: 'all', service: 'all' });
  const [filteredBookings, setFilteredBookings] = useState([]);

  const serviceTypes = [...new Set(bookingsData.map(booking => booking.service))];

  const groupByMonth = (bookings) => {
    return bookings.reduce((acc, booking) => {
      const monthYear = booking.date.substring(0, 7); // "YYYY-MM"
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(booking);
      return acc;
    }, {});
  };

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11 (Jan-Dec)

    let filtered = bookingsData;

    // Time filter
    if (filter.time !== 'all') {
      const monthsBack = {
        '3m': 3,
        '6m': 6,
        '9m': 9,
        '1y': 12
      }[filter.time];

      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.date);
        const bookingYear = bookingDate.getFullYear();
        const bookingMonth = bookingDate.getMonth();

        // Calculate how many months back this booking is
        const monthsDifference = (currentYear - bookingYear) * 12 + (currentMonth - bookingMonth);

        // Only include if within the last N months AND not in the future
        return monthsDifference >= 0 && monthsDifference < monthsBack;
      });
    }

    // Service type filter
    if (filter.service !== 'all') {
      filtered = filtered.filter(booking => booking.service === filter.service);
    }

    setFilteredBookings(filtered);
  }, [filter, bookingsData]);

  const toggleMonth = (monthYear) => {
    setExpandedMonths(prev => ({
      ...prev,
      [monthYear]: !prev[monthYear]
    }));
  };

  const formatMonthYear = (monthYear) => {
    const [year, month] = monthYear.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const calculateTotalEarnings = (bookings) => {
    return bookings.reduce((total, booking) => total + booking.amount, 0);
  };

  const monthlyBookings = groupByMonth(filteredBookings);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            <Calendar className="inline mr-2" size={20} />
            Booking History
          </h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center">
              <Filter className="text-gray-500 mr-2" size={18} />
              <select
                className="bg-white border border-gray-300 rounded-md py-1 px-3 text-sm"
                value={filter.time}
                onChange={(e) => setFilter({ ...filter, time: e.target.value })}
              >
                <option value="all">All Time</option>
                <option value="3m">Last 3 Months</option>
                <option value="6m">Last 6 Months</option>
                <option value="9m">Last 9 Months</option>
                <option value="1y">Last Year</option>
              </select>
            </div>

            <div className="flex items-center">
              <Filter className="text-gray-500 mr-2" size={18} />
              <select
                className="bg-white border border-gray-300 rounded-md py-1 px-3 text-sm"
                value={filter.service}
                onChange={(e) => setFilter({ ...filter, service: e.target.value })}
              >
                <option value="all">All Services</option>
                {serviceTypes.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              <DollarSign className="inline mr-1" size={14} />
              Total: ${calculateTotalEarnings(filteredBookings)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(monthlyBookings).map(([monthYear, monthBookings]) => {
            const monthTotal = calculateTotalEarnings(monthBookings);
            const isExpanded = expandedMonths[monthYear];

            return (
              <div key={monthYear} className="bg-white shadow rounded-lg overflow-hidden">
                {/* Month Header */}
                <div
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleMonth(monthYear)}
                >
                  <div className="flex items-center">
                    <h2 className="font-semibold text-lg">
                      {formatMonthYear(monthYear)}
                    </h2>
                    <span className="ml-2 text-sm text-gray-500">
                      ({monthBookings.length} jobs)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-3">
                      ${monthTotal}
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Month Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              <Clock className="inline mr-1" size={14} />
                              Duration
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                              <DollarSign className="inline mr-1" size={14} />
                              Amount
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {monthBookings.map(booking => (
                            <tr key={booking.id}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">
                                {new Date(booking.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                {booking.service}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm">
                                {booking.duration}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                                ${booking.amount}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                  {booking.status}
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
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">{filteredBookings.length}</h3>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500 text-sm">Total Earnings</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">${calculateTotalEarnings(filteredBookings)}</h3>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500 text-sm">Average per Booking</p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              ${filteredBookings.length > 0 ? (calculateTotalEarnings(filteredBookings) / filteredBookings.length).toFixed(2) : 0}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookingHistory;