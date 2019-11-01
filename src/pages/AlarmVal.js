import React, { PureComponent as Component } from "react";
import "../styles/index.scss";
import { Card } from "antd";
import Record from "../components/Alarm/Record";
import WarnMostValue from "../components/Alarm/WarnMost";
const tabList = [
    {
        key: "tab1",
        tab: "预警记录"
    },
    {
        key: "tab2",
        tab: "预警值"
    }
];
const contentList = {
    tab1: <Record />,
    tab2: <WarnMostValue />
};
export default class Alarm extends Component {
    constructor() {
        super();
        this.state = {
            key: "tab1"
        };
    }
    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };
    render() {
        return (
            <div className="main">
                <Card
                    style={{ width: "100%" }}
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, "key");
                    }}
                >
                    {contentList[this.state.key]}
                </Card>
            </div>
        );
    }
}
