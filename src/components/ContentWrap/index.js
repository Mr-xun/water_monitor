import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    NavLink,
    Switch
} from "react-router-dom";
import "./index.scss";
import { getRootPath } from "../../utils";
import Home from "../../pages/Home";
import HistoryData from "../../pages/HistoryData";
import Compare from "../../pages/Compare";
import AlarmVal from "../../pages/AlarmVal";
import NotFound from "../../pages/NotFound";

import { Layout, Menu, Icon } from "antd";
const { Header, Sider, Content } = Layout;
export default class ContentWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultKeys: "/history"
        };
    }
    componentWillMount() {
        this.setState({
            defaultKeys: getRootPath()
        });
    }
    render() {
        let { defaultKeys } = this.state;
        return (
            <Layout className="wrapper">
                <Header>
                    <div className="head-logo"></div>
                    <h1 className="head-title">矿井水害监测数据分析与可视化</h1>
                </Header>
                <Layout>
                    <Router>
                        <Sider>
                            <Menu
                                style={{ height: "100%" }}
                                defaultSelectedKeys={[defaultKeys]}
                                mode="inline"
                            >
                                <Menu.Item key="/home">
                                    <NavLink exact to="/home">
                                        <Icon type="bank" />
                                        首页
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/history">
                                    <NavLink exact to="/history">
                                        <Icon type="unordered-list" />
                                        历史&更正
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/compare">
                                    <NavLink exact to="/compare">
                                        <Icon type="column-width" />
                                        对比
                                    </NavLink>
                                </Menu.Item>
                                <Menu.Item key="/alarmVal">
                                    <NavLink exact to="/alarmVal">
                                        <Icon type="bell" />
                                        预警
                                    </NavLink>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Content>
                            <Switch>
                                <Route
                                    exact
                                    path="/water/index.html"
                                    component={Home}
                                ></Route>
                                <Route
                                    exact
                                    path="/home"
                                    component={Home}
                                ></Route>
                                <Route
                                    exact
                                    path="/compare"
                                    component={Compare}
                                ></Route>
                                <Route
                                    exact
                                    path="/history"
                                    component={HistoryData}
                                ></Route>
                                <Route
                                    exact
                                    path="/alarmVal"
                                    component={AlarmVal}
                                ></Route>
                                <Route component={NotFound} />
                            </Switch>
                        </Content>
                    </Router>
                </Layout>
            </Layout>
        );
    }
}
