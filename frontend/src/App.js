import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./view/mainpage";
import LoginPage from "./view/login";
import Register from "./view/register";
import SavedTrips_Redundant from "./view/savedTrips_Redundant";
import SavedTrips from "./view/savedTrips";
import UserPrefs from "./view/userPrefs";
// import Itinerary from "./view/itinerary";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/mytripsold">
          <SavedTrips_Redundant />
        </Route>
        <Route exact path="/mytrips">
          <SavedTrips />
        </Route>
        <Route exact path="/preferences">
          <UserPrefs />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
