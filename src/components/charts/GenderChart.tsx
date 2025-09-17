import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Info } from 'lucide-react';
import { genderData } from '../../services/dashboardService';

const GenderChart: React.FC = () => {
  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      width: 140,
      height: 140,
      backgroundColor: 'transparent',
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        size: 90,
        innerSize: '65%',
        dataLabels: {
          enabled: false,
        },
        showInLegend: false,
        borderWidth: 2,
        borderRadius: 8,
      },
    },
    series: [{
      type: 'pie',
      name: 'Gender',
      data: genderData,
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
        <h3 className="text-sm font-medium text-gray-900">Employees by Gender</h3>
        <button className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer" title="More info">
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="flex justify-center mb-4 w-36">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        
        {/* Legend */}
        <div className="space-y-3">
          {genderData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-900">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.y}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenderChart;
