// src/components/PriceChart.jsx
import { Line } from 'react-chartjs-2';
import { Box , Button} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PriceChart = ({ data, onTimeFrameChange }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [{
      label: 'Price (USD)',
      data: data.map(item => item.price),
      borderColor: '#ffd700',
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
      fill: true,
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Price History' } },
  };

  return (
    <Box className="bg-gray-800 p-4 rounded-lg">
      <Line data={chartData} options={options} />
      <Box className="mt-4 flex justify-center gap-2">
        {[1, 7, 30].map(days => (
          <Button key={days} variant="contained" className="bg-blue-600" onClick={() => onTimeFrameChange(days)}>
            {days} Days
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default PriceChart;















// src/components/PriceChart.jsx
// import { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// import { Button, Box } from '@mui/material';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const PriceChart = ({ chartData, onTimeFrameChange }) => {
//   const [timeFrame, setTimeFrame] = useState('7');

//   const data = {
//     labels: chartData.map(item => item.date),
//     datasets: [
//       {
//         label: 'Price (USD)',
//         data: chartData.map(item => item.price),
//         borderColor: '#ffd700',
//         backgroundColor: 'rgba(255, 215, 0, 0.2)',
//         fill: true,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: { legend: { position: 'top' } },
//     scales: {
//       x: { title: { display: true, text: 'Date' } },
//       y: { title: { display: true, text: 'Price (USD)' } },
//     },
//   };

//   const handleTimeFrame = (days) => {
//     setTimeFrame(days);
//     onTimeFrameChange(days);
//   };

//   return (
//     <Box sx={{ bgcolor: '#1a1c22', p: 3, borderRadius: 2 }} className="shadow-lg">
//       <Box className="flex gap-2 mb-4">
//         <Button
//           variant={timeFrame === '1' ? 'contained' : 'outlined'}
//           onClick={() => handleTimeFrame('1')}
//         >
//           1 Day
//         </Button>
//         <Button
//           variant={timeFrame === '7' ? 'contained' : 'outlined'}
//           onClick={() => handleTimeFrame('7')}
//         >
//           7 Days
//         </Button>
//         <Button
//           variant={timeFrame === '30' ? 'contained' : 'outlined'}
//           onClick={() => handleTimeFrame('30')}
//         >
//           30 Days
//         </Button>
//       </Box>
//       <Line data={data} options={options} />
//     </Box>
//   );
// };

// export default PriceChart;