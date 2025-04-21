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