import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import AgePieChart from './components/AgePieChart';

function App() {
  const [allData, setAllData] = useState([]);
  const [currentSamplerIndex, setCurrentSamplerIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/caregivers_2023_cleaned.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setAllData(results.data);
            setLoading(false);
          }
        });
      });
  }, []);

  const handleNextSampler = () => {
    setCurrentSamplerIndex((prev) => (prev + 1) % allData.length);
  };

  if (loading) return <div>Loading Global Data...</div>;

  const currentSampler = allData[currentSamplerIndex];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px', padding: '10px', background: '#eee' }}>
        <h3>Current Sampler Profile (Row {currentSamplerIndex + 1})</h3>
        <p><strong>Age:</strong> {currentSampler.Age}</p>
        <p><strong>Relationship:</strong> {currentSampler['relationship to the person you care for']}</p>
        <button onClick={handleNextSampler} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Next Sampler (Click to test dynamic highlight)
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Card container */}
        <div style={{ 
          width: '500px',
          border: '1px solid #ddd', 
          borderRadius: '12px', 
          padding: '20px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          {/* Key point: Pass all data (allData) to the chart to calculate the distribution
             Pass the age of the current person (currentSampler.Age) to the chart to highlight 
          */}
          <AgePieChart 
            allData={allData} 
            highlightTarget={currentSampler.Age} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;