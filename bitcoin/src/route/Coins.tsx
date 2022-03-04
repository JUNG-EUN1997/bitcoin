import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../theme";

const Container = styled.div`
  width: 50%;
  min-width: 480px;
  margin: auto;
`;
const Header = styled.div`
  display: flex;
  height: 10vh;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
  padding-top: 2vh;
  margin-bottom: 5vh;
`;
const CoinList = styled.div``;
const Coin = styled.div`
  background-color: #fff;
  color: #353b48;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 8px;
  a {
    color: initial;
  }
`;

const coins = [
  {
    id: 1,
    name: "bitcoin",
  },
  {
    id: 2,
    name: "bitcoin2",
  },
  {
    id: 2,
    name: "bitcoin3",
  },
];

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // const [coins, setCoins] = useState<ICoins[]>([]);
  return (
    <Container>
      <Header>Coins</Header>
      <CoinList>
        {coins.map((coin) => (
          <Link to={`/${coin.id}`}>
            <Coin>{coin.name}</Coin>
          </Link>
        ))}
      </CoinList>
    </Container>
  );
}

export default Coins;
