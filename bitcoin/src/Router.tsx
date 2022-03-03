import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./route/Coin";
import Coins from "./route/Coins";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin></Coin>
        </Route>
        <Route path="/">
          <Coins></Coins>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;