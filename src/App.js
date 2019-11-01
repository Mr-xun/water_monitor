import React from "react";
import "./App.scss";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import ContentWrap from "./components/ContentWrap";
import Index from "./pages/Index";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
const App = () => {
    return (
        <div className="App" style={{ height: "100%" }}>
            <ConfigProvider locale={zhCN}>
                <Router>
                    <Switch>
                        <Route exact path="/index" component={Index}></Route>
                        <Redirect exact path="/" to="/index"></Redirect>
                        <Route component={ContentWrap} />
                    </Switch>
                </Router>
            </ConfigProvider>
        </div>
    );
};
export default App;
