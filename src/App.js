import { Switch , Route} from "react-router-dom";
import Landing from "./components/Landing";
import VideoPage from "./components/VideoPage";
import ipConfig from "./ipConfig.json"
export const config = {
    //  endpoint: `http://${ipConfig.workspaceIp}:8082/v1`,
    endpoint: `https://xflix-backend-o0u4.onrender.com/v1`,
  };
  
function App(){
    
    return (
        <>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/video/:Id" component={VideoPage}/>
        </Switch>
        </>
    )
}
export default App;