import React, { Component } from "react";
import { Statistic } from "antd";
import moment from "moment";
export default class CurTime extends Component {
    constructor() {
        super();
        this.state = {
            time: ""
        };
    }
    setCurrnetTime() {
        this.setState({
            time: moment().format("YYYY-MM-DD hh:mm:ss")
        });
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setCurrnetTime(), 1000);
    }
    render() {
        let { time } = this.state;
        return (
            <div>
                <Statistic value={time} />
            </div>
        );
    }
}
