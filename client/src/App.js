import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import CountryDetail from "./components/CountryDetail/CountryDetail";

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} component={LandingPage} />
      <Route path={"/home"} component={NavBar}></Route>
      <Route exact path={"/home"} component={Home}></Route>
      <Route exact path={"/home/activity/create"} component={ActivityCreate}/>
      <Route exact path={"/home/:id"} component={CountryDetail}/>
    </div>
  );
}

export default App;
