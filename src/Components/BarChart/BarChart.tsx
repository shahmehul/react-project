import React, { useState } from 'react'
import './ BarChart.css';

function BarChart() {

  const [data, setData] = useState([
    { id: 'dep-1', name: 'Legal', ticketCount: 32, color: '#3F888F' },
    { id: 'dep-2', name: 'Sales', ticketCount: 20, color: '#FFA420' },
    { id: 'dep-3', name: 'Engineering', ticketCount: 60, color: '#287233' },
    { id: 'dep-4', name: 'Manufacturing', ticketCount: 5, color: '#4E5452' },
    { id: 'dep-5', name: 'Maintenance', ticketCount: 14, color: '#642424' },
    {
      id: 'dep-6',
      name: 'Human Resourcing',
      ticketCount: 35,
      color: '#1D1E33',
    },
    { id: 'dep-7', name: 'Events', ticketCount: 43, color: '#E1CC4F' },
    { id: 'dep-8', name: 'Events2', ticketCount: 41, color: '#6f556dff' },
    { id: 'dep-9', name: 'Events3', ticketCount: 33, color: '#16451aff' },
    { id: 'dep-10', name: 'Events4', ticketCount: 22, color: '#8e4fe1ff' },
  ]);

  return (
    <div className="bar-chart">
      <h2>Ticket Count</h2>
      <div className='chart'>
        {
          data.map((item) => (
            <div key={item.id} className='bar tooltip' style={{ backgroundColor: item.color, height: `${Math.ceil(item.ticketCount * 100 / 60)}%` }}>
              <span className='tooltiptext'> {item.name}: {item.ticketCount} tickets</span>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default BarChart;
