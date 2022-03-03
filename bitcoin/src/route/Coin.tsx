import { useParams } from "react-router-dom";

interface RouteParams {
  coinId: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  console.log(coinId);
  return <h1>Coin is  {coinId}</h1>;
}

export default Coin;
