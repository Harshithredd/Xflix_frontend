import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import VideoPage from "./components/VideoPage";
export const config = {
  endpoint: process.env?.REACT_APP_API_URL,
};

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/video/:Id" component={VideoPage} />
    </Switch>
  );
}
export default App;
