import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../theme";
import { fetchCoins } from "../api";

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
    display: flex;
    align-items: center;
  }
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
const Loading = styled.div`
  text-align: center;
`;
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
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);
  console.log(data?.slice(0, 100));

  return (
    <Container>
      <Header>Coins</Header>
      <CoinList>
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))
        )}
      </CoinList>
    </Container>
  );
}

export default Coins;
