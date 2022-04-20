import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./view/mainpage";
// import Itinerary from "./view/itinerary";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        {/* <Route exact path="/itinerary">
          <Itinerary />
        </Route> */}
      </Switch>
    </Router>
  );
}

export default App;
