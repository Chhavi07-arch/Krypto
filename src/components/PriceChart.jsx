// src/components/PriceChart.jsx
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Button, Box } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PriceChart = ({ chartData, onTimeFrameChange }) => {
  const [timeFrame, setTimeFrame] = useState('7');

  const data = {
    labels: chartData.map(item => item.date),
    datasets: [
      {
        label: 'Price (USD)',
        data: chartData.map(item => item.price),
        borderColor: '#ffd700',
        backgroundColor: 'rgba(255, 215, 0, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Price (USD)' } },
    },
  };

  const handleTimeFrame = (days) => {
    setTimeFrame(days);
    onTimeFrameChange(days);
  };

  return (
    <Box sx={{ bgcolor: '#1a1c22', p: 3, borderRadius: 2 }} className="shadow-lg">
      <Box className="flex gap-2 mb-4">
        <Button
          variant={timeFrame === '1' ? 'contained' : 'outlined'}
          onClick={() => handleTimeFrame('1')}
        >
          1 Day
        </Button>
        <Button
          variant={timeFrame === '7' ? 'contained' : 'outlined'}
          onClick={() => handleTimeFrame('7')}
        >
          7 Days
        </Button>
        <Button
          variant={timeFrame === '30' ? 'contained' : 'outlined'}
          onClick={() => handleTimeFrame('30')}
        >
          30 Days
        </Button>
      </Box>
      <Line data={data} options={options} />
    </Box>
  );
};

export default PriceChart;