import logo from "./logo.svg";
import "./App.css";

import Home from "./pages/Home";
import SuperHeroes from "./pages/SuperHeroes";
import RQHeroes from "./pages/RQHeroes";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/superheroes">SuperHeroes</Link>
            </li>
            <li>
              <Link to="/rqheroes">RQHeroes</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/rqheroes">
            <RQHeroes />
          </Route>
          <Route path="/superheroes">
            <SuperHeroes />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
