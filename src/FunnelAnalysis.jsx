import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const FunnelAnalysis = () => {
  const [funnelData, setFunnelData] = useState([
    {
      stage: 'Page Views',
      users: 100000,
      conversionRate: 100,
    },
    {
      stage: 'Product Views',
      users: 45000,
      conversionRate: 45,
    },
    {
      stage: 'Add to Cart',
      users: 15000,
      conversionRate: 33.33,
    },
    {
      stage: 'Checkout Started',
      users: 7500,
      conversionRate: 50,
    },
    {
      stage: 'Purchases',
      users: 3000,
      conversionRate: 40,
    }
  ]);

  const benchmarks = {
    'Product Views': { good: 45, average: 35 },
    'Add to Cart': { good: 35, average: 25 },
    'Checkout Started': { good: 65, average: 45 },
    'Purchases': { good: 45, average: 25 }
  };

  const handleUserChange = (index, value) => {
    const newFunnelData = [...funnelData];
    const numValue = parseInt(value) || 0;
    newFunnelData[index].users = numValue;
    
    newFunnelData.forEach((item, i) => {
      if (i === 0) {
        item.conversionRate = 100;
      } else {
        item.conversionRate = ((item.users / newFunnelData[i-1].users) * 100).toFixed(1);
      }
    });
    
    setFunnelData(newFunnelData);
  };

  const getHealthStatus = (stage, conversionRate) => {
    if (!benchmarks[stage]) return null;
    
    if (conversionRate >= benchmarks[stage].good) {
      return { color: '#4ade80', text: 'Good' };
    } else if (conversionRate >= benchmarks[stage].average) {
      return { color: '#facc15', text: 'Average' };
    } else {
      return { color: '#f87171', text: 'Needs Improvement' };
    }
  };

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      color: 'white',
    }}>
      <div style={{
        background: 'transparent',
        borderRadius: '8px',
        marginBottom: '20px',
        padding: '20px',
      }}>
        <h2 style={{ marginBottom: '20px', color: 'white' }}>Ecommerce Funnel Analysis</h2>
        <div style={{ height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={funnelData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.2)"
              />
              <XAxis 
                type="number"
                stroke="white"
                tick={{ fill: 'white' }}
              />
              <YAxis 
                dataKey="stage"
                type="category"
                stroke="white"
                tick={{ fill: 'white' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  color: 'white'
                }}
              />
              <Bar dataKey="users" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{
        background: 'transparent',
        borderRadius: '8px',
        marginBottom: '20px',
        padding: '20px',
      }}>
        {funnelData.map((stage, index) => (
          <div key={stage.stage} style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '20px',
            paddingBottom: '20px',
          }}>
            <h3 style={{
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'white'
            }}>{stage.stage}</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}>
              <div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '5px' }}>Users</p>
                <input
                  type="number"
                  value={stage.users}
                  onChange={(e) => handleUserChange(index, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    color: 'white'
                  }}
                />
              </div>
              <div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '5px' }}>Conversion Rate</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                  {stage.conversionRate}%
                </p>
              </div>
              {getHealthStatus(stage.stage, stage.conversionRate) && (
                <div>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '5px' }}>Status</p>
                  <p style={{
                    color: getHealthStatus(stage.stage, stage.conversionRate).color,
                    fontWeight: 'bold',
                  }}>
                    {getHealthStatus(stage.stage, stage.conversionRate).text}
                  </p>
                </div>
              )}
            </div>
            {benchmarks[stage.stage] && (
              <div style={{
                marginTop: '10px',
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.7)',
              }}>
                Benchmarks: Good ≥ {benchmarks[stage.stage].good}% | Average ≥ {benchmarks[stage.stage].average}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunnelAnalysis;
