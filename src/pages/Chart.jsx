import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import chartData from '../assets/chartData.json'; 

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartDataState, setChartDataState] = useState([]);
  const [days, setDays] = useState(7);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedData = localStorage.getItem(`chart_${coinId}_${days}`);
    if (cachedData) {
      setChartDataState(JSON.parse(cachedData).map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        price,
      })));
      setIsLoading(false);
      fetchCoinDetails();
      return;
    }

    const fetchData = async () => {
      try {
        const { data: coinData } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
          headers: { 'x-cg-demo-api-key': 'CG-7nVcnFKTaKahCh2VvxTGZY7L' },
        });
        setCoin(coinData);
        const { data: chartResponse } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`, {
          headers: { 'x-cg-demo-api-key': 'CG-7nVcnFKTaKahCh2VvxTGZY7L' },
        });
        const formattedData = chartResponse.prices.map(([timestamp, price]) => ({ date: new Date(timestamp).toLocaleDateString(), price }));
        setChartDataState(formattedData);
        localStorage.setItem(`chart_${coinId}_${days}`, JSON.stringify(chartResponse.prices));
        setIsLoading(false);
      } catch (error) {
        console.error('Chart Data Error:', error.message);
        setChartDataState(chartData.prices.map(([timestamp, price]) => ({ date: new Date(timestamp).toLocaleDateString(), price }))); // Fallback to mock
        setIsLoading(false);
      }
    };
    fetchData();
  }, [coinId, days]);

  const fetchCoinDetails = async () => {
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
        headers: { 'x-cg-demo-api-key': 'CG-7nVcnFKTaKahCh2VvxTGZY7L' },
      });
      setCoin(data);
    } catch (error) {
      console.error('Coin Details Error:', error.message);
    }
  };

  const handleTimeFrameChange = (newDays) => {
    setDays(newDays);
  };

  const chartDataConfig = {
    labels: chartDataState.map(item => item.date),
    datasets: [{
      label: 'Price (USD)',
      data: chartDataState.map(item => item.price),
      borderColor: '#ffd700',
      backgroundColor: 'rgba(255, 215, 0, 0.2)',
      fill: true,
      pointRadius: 0,
    }],
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Price (Past 1 Day) in USD' } },
    scales: { y: { beginAtZero: false } },
  };

  if (isLoading) return <Typography className="text-white text-center mt-10">Loading...</Typography>;

  return (
    <Box className="bg-gray-900 min-h-screen text-white p-6">
      <Box className="flex items-center mb-6">
        <img src={coin?.image?.large} alt={coin?.name} className="w-16 h-16 mr-4" />
        <Box>
          <Typography variant="h4" className="text-gold-500">{coin?.name}</Typography>
          <Typography>Rank: {coin?.market_cap_rank}</Typography>
          <Typography>Current Price: ${coin?.market_data?.current_price?.usd.toLocaleString()}</Typography>
          <Typography>Market Cap: ${coin?.market_data?.market_cap?.usd.toLocaleString()}</Typography>
        </Box>
      </Box>
      <Box className="bg-gray-800 p-4 rounded-lg">
        <Line data={chartDataConfig} options={options} />
      </Box>
      <Box className="mt-4 flex justify-center gap-2">
        {[1, 7, 30, 90].map(days => (
          <Button
            key={days}
            variant="contained"
            className={days === 1 ? 'bg-yellow-500' : 'bg-blue-600'}
            onClick={() => handleTimeFrameChange(days)}
          >
            {days === 1 ? '24 Hours' : `${days} Days`}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Chart;