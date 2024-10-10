import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';

// Colors for charts
const COLORS = ['#00876c','#4e9f88','#7db7a4','#7cd9e3','#f4e07f','#f1a255','#d43d51'];
const COLORS2 = ['#003f5c', '#2f4b7c','#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600']

const Charts = ({ data }) => {
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

    if (salary <= 3) salaryRange = '1-3 LPA';
    else if (salary <= 6) salaryRange = '4-6 LPA';
    else if (salary <= 10) salaryRange = '7-10 LPA';
    else salaryRange = '11+ LPA';

    const existing = acc.find((item) => item.name === salaryRange);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: salaryRange, value: 1 });
    }
    return acc;
  }, []);

  // 3. Hiring Process Distribution for RadarChart
  const hiringProcessData = data.reduce((acc, job) => {
    const process = job.hiringProcess;
    const existing = acc.find((item) => item.process === process);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ process, count: 1 });
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 py-10">
      <h1 className='text-center text-4xl text-gray-600 font-semibold mb-8 tracking-wider [background:linear-gradient(_to_bottom,transparent_40%,#fce041_)] px-2 py-2'>
        Detailed Job Application Insights
      </h1>
      <div className="grid grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Pie Chart for Job Status */}
        <div className="chart flex flex-col items-center bg-white p-6 border border-gray-400 rounded-md shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">JOB STATUS</h3>
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
        <div className="chart bg-white p-6 border border-gray-400 rounded-md shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">CTC DISTRIBUTION</h3>
          <BarChart width={500} height={300} data={ctcData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#A0DEFF" />
          </BarChart>
        </div>

        {/* Radar Chart for Hiring Process */}
        <div className="chart bg-white p-6 border border-gray-400 rounded-md shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">HIRING PROCESS DISTRIBUTION</h3>
          <RadarChart outerRadius={90} width={500} height={300} data={hiringProcessData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="process" />
            <PolarRadiusAxis />
            <Radar name="Hiring Processes" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </div>

        {/* Pie Chart With Gap for Location */}
        <div className="chart flex flex-col items-center bg-white p-6 border border-gray-400 rounded-md shadow-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">JOB LOCATIONS</h3>
          <PieChart width={400} height={300}>
            <Pie
                data={locationData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={(entry) => entry.name}
                paddingAngle={5}  // Padding between slices
                >
                {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Charts;
