import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./layouts/Home";
import PortApps from "./pages/PortApps";
import TemplateSelector from "./pages/TemplateSelector";


const App = () => {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/port" component={PortApps} />
      <Route exact path="/templates" component={TemplateSelector} />
      <Route path="/404">
        <h1>404</h1>
      </Route>
      <Redirect from="*" to="/404" />
    </Switch>
  </Router>
  );
};

export default App;