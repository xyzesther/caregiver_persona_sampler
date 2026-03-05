// src/components/AgePieChart.jsx
import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

// Receive two props: all data, and the target to highlight (string, e.g., "60 - 69")
const AgePieChart = ({ allData, highlightTarget }) => {

  // Use useMemo to cache the calculation results, only recalculate when the data changes
  const chartOption = useMemo(() => {
    if (!allData || allData.length === 0) return {};

    // 1. Count the number of people in each age group
    const ageCounts = allData.reduce((acc, curr) => {
      const age = curr.Age;
      if (age) {
        acc[age] = (acc[age] || 0) + 1;
      }
      return acc;
    }, {});

    // 2. Convert to ECharts format
    const dataForChart = Object.keys(ageCounts).map((ageKey) => {
      // Core logic: determine if this sector is equal to the passed highlightTarget
      const isHighlighted = ageKey === highlightTarget;

      return {
        name: ageKey,
        value: ageCounts[ageKey],
        itemStyle: {
          // Dynamic highlight color
          color: isHighlighted ? '#F7931E' : '#FFFFFF',
          borderColor: '#333',
          borderWidth: 1
        },
        label: {
          color: '#333',
          fontWeight: isHighlighted ? 'bold' : 'normal',
          // Only the highlighted sectors are forced to display labels, others can be hidden if they are crowded (optional)
          // show: isHighlighted 
        },
        // Only the highlighted sectors display the guiding line
        labelLine: {
          show: true, 
          lineStyle: {
             color: '#333' // Line color
          }
        }
      };
    });

    return {
      title: {
        text: 'Age Groups',
        left: 'center',
        top: 20,
        textStyle: { fontSize: 18 }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Age Distribution',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: true, // Prevent label overlap
          itemStyle: {
            borderRadius: 0
          },
          data: dataForChart
        }
      ]
    };
  }, [allData, highlightTarget]); // Dependencies: when the data or highlight target changes, the chart is redrawn

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default AgePieChart;