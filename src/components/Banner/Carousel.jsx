import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import axios from "axios";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

// Utility function to format numbers
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Styled components
const CarouselContainer = styled('div')({
  height: "50%",
  display: "flex",
  alignItems: "center",
  marginTop: "80px",
  zIndex: 1,

});

const CarouselItem = styled(Link)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textTransform: "uppercase",
  color: "white",
});

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      // Using CORS proxy ONLY for dev
      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const apiUrl = TrendingCoins(currency);

      const { data } = await axios.get(proxyUrl + encodeURIComponent(apiUrl));
      if (Array.isArray(data)) {
        setTrending(data);
      } else {
        console.error("Unexpected API response:", data);
        setTrending([]);
      }
    } catch (error) {
      console.error("Failed to fetch trending coins:", error);
      setTrending([]);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <CarouselItem key={coin.id} to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
        <span>
          {coin?.symbol.toUpperCase()}&nbsp;
          <span style={{ color: profit ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}>
            {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </CarouselItem>
    );
  });

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  return (
    <CarouselContainer>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </CarouselContainer>
  );
};

export default Carousel;