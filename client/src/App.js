import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <Route exact path={"/"} component={LandingPage} />
      <Route path={"/home"}></Route>
    </div>
  );
}

export default App;
