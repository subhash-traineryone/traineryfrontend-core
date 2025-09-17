import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Info } from 'lucide-react';
import { typeData } from '../../services/dashboardService';

const TypeChart: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
      height: 235,
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: ['Permanent', 'Consultant', 'Intern', 'Others'],
      labels: {
        style: {
          fontSize: '12px',
          color: '#1c1c1c66',
        },
      },
      lineWidth: 0,
      tickWidth: 0,
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        style: {
          fontSize: '12px',
          color: '#1c1c1c66',
        },
      },
      gridLineWidth: 0,
      lineWidth: 0,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [{
      type: 'bar',
      name: 'Employees',
      data: typeData.data,
    }],
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 w-full h-[317px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-gray-900">Employees by Type</h3>
        <button className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" title="More info">
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>
      
      <div className="h-[235px] flex-1">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default TypeChart;
