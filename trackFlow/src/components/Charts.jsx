import React from 'react';
import { IoClose } from 'react-icons/io5';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Colors for charts
const COLORS = ['#00876c','#6aaa96','#aecdc2','#afbeb9','#f0b8b8','#e67f83','#d43d51'];

const Charts = ({ data, onClose }) => {
  // 1. Job Status Distribution for PieChart
  const jobStatusData = [
    { name: 'Offered', value: data.filter(job => job.status === 'Offered').length },
    { name: 'Interviewing', value: data.filter(job => job.status === 'Interviewing').length },
    { name: 'Scheduled', value: data.filter(job => job.status === 'Scheduled').length },
    { name: 'Applied', value: data.filter(job => job.status === 'Applied').length },
    { name: 'Pending', value: data.filter(job => job.status === 'Pending').length },
    { name: 'Paused', value: data.filter(job => job.status === 'Paused').length },
    { name: 'Rejected', value: data.filter(job => job.status === 'Rejected').length },
  ];

  // 2. CTC Distribution for BarChart
  const ctcData = data.reduce((acc, job) => {
    const salary = parseFloat(job.salary);
    let salaryRange = '';

    if (salary <= 8) salaryRange = '1-8 LPA';
    else if (salary <= 20) salaryRange = '9-20 LPA';
    else if (salary <= 30) salaryRange = '21-30 LPA';
    else salaryRange = '31+ LPA';

    const existing = acc.find((item) => item.name === salaryRange);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: salaryRange, value: 1 });
    }
    return acc;
  }, []);

  // 4. Location Distribution for PieChart
  const locationData = data.reduce((acc, job) => {
    const location = job.location;
    const existing = acc.find((item) => item.name === location);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: location, value: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center min-h-screen py-10 z-50">
      <div className='bg-gray-800 p-10 rounded-lg'>
        <div className='flex flex-row relative'>
          <h1 className='text-center items-center text-5xl font-poppins tracking-wider text-white font-bold mb-10'>
            Stats
          </h1>
          <button onClick={onClose} className="text-white absolute right-0"><IoClose size={28} /></button>
        </div>
        
        <div className="grid grid-cols-2 gap-8 max-w-6xl w-full">
          {/* Pie Chart for Job Status */}
          <div className="chart flex flex-col items-center bg-white border-2 border-black p-6 rounded">
            <h3 className="text-xl font-semibold text-center font-poppins">Job Status</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={jobStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={(entry) => entry.name}
              >
                {jobStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Bar Chart for CTC */}
          <div className="chart bg-white border-2 border-black p-6 rounded">
            <h3 className="text-xl font-semibold mb-4 text-center font-poppins">CTC Distribution</h3>
            <BarChart width={500} height={300} data={ctcData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#00308F" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
