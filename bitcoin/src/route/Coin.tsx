import { useQuery } from "react-query";
import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchTickersInfo } from "../api";
import Price from "./Price";
import Chart from "./Chart";

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

const Loading = styled.div`
  text-align: center;
`;

const BackBtn = styled.span`
  border: 1px solid #fff;
  display: inline-block;
  padding: 8px;
  margin-top: 8px;
`;

const Loader = styled.div`
  text-align: center;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
  line-height: 1.3;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
interface RouteParams {
  coinId: string;
}

interface IState {
  name:string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<IState>();
  console.log(state);
  const { isLoading: infoLoading, data: coinInfo } = useQuery(
    `[info,${coinId}]`,
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: trickerLoading, data: trickerInfo } = useQuery(
    `[tricker,${coinId}]`,
    () => fetchTickersInfo(coinId)
  );

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  const loading = infoLoading || trickerLoading;

  return (
    <Container>
      <Link to={`/`}>
        <BackBtn>????????????</BackBtn>
      </Link>
      <Header>
        <Header>
          {state?.name ? state.name : loading ? "Loading..." : coinInfo?.name}
        </Header>
        {/*?????? ??????????????? ???????????? ????????? ?????? ??????????????? ????????? ?????????(ex ?????? ???????????? ??????) ?????? ?????? ?????? ?????? */}
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{coinInfo?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${coinInfo?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${trickerInfo?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{coinInfo?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{trickerInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{trickerInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>chart</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            {/* <Route path={`/${coinId}/chart`}> ?????? ????????? ????????? ?????? ???, chart??? ???????????? ??? param?????? ???????????? ??????*/}
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
