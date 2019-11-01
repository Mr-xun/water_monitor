import React, { PureComponent as Component } from "react";
import { Card } from "antd";
import "../styles/historyData.scss";
import TopCard from "../components/Home/TopCard";
import BottomEchart from "../components/Home/BottomEchart";
export default class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className="main">
                <Card>
                    <TopCard />
                    <BottomEchart />
                </Card>
            </div>
        );
    }
}
