import React, { Component } from "react";
import { Popover } from "antd";
import api from "../api/index.js";

import "../styles/index.scss";

export default class Index extends Component {
    constructor() {
        super();
        this.state = {
            info_data: {}
        };
        this.goPages = this.goPages.bind(this);
        this.getData = this.getData.bind(this);
    }
    render() {
        let { temperature, pressure, ph, electrolytic } = this.state.info_data;
        const content = (
            <div className="tip-box">
                <p>
                    <em>水温：</em>
                    <span>{temperature ? temperature.value + "℃" : "--"}</span>
                </p>
                <p>
                    <em>水压：</em>
                    <span>{pressure ? pressure.value + "Mpa" : "--"}</span>
                </p>
                <p>
                    <em>PH值：</em>
                    <span>{ph ? ph.value : "--"}</span>
                </p>
                <p>
                    <em>电解质：</em>
                    <span>{electrolytic ? "强" : "弱"}</span>
                </p>
            </div>
        );
        return (
            <div className="index-main">
                <div className="index-title">
                    <h3>矿井水害监测</h3>
                </div>
                <div className="img-bg">
                    <img src={require("../assets/imgs/index.bmp")} alt="" />
                </div>
                <div className="loca-box local-one">
                    <Popover
                        content={content}
                        title="该处水质信息"
                        trigger="hover"
                    >
                        <img
                            onMouseEnter={this.getData}
                            onClick={this.goPages}
                            src={require("../assets/imgs/local2.png")}
                            alt=""
                        />
                    </Popover>
                </div>
                <div className="loca-box local-two">
                    <Popover
                        content={content}
                        title="该处水质信息"
                        trigger="hover"
                    >
                        <img
                            onMouseEnter={this.getData}
                            onClick={this.goPages}
                            src={require("../assets/imgs/local2.png")}
                            alt=""
                        />
                    </Popover>
                </div>
                <div className="loca-box local-three">
                    <Popover
                        content={content}
                        title="该处水质信息"
                        trigger="hover"
                    >
                        <img
                            onMouseEnter={this.getData}
                            onClick={this.goPages}
                            src={require("../assets/imgs/local2.png")}
                            alt=""
                        />
                    </Popover>
                </div>
                <div className="loca-box local-four">
                    <Popover
                        content={content}
                        title="该处水质信息"
                        trigger="hover"
                    >
                        <img
                            onMouseEnter={this.getData}
                            onClick={this.goPages}
                            src={require("../assets/imgs/local2.png")}
                            alt=""
                        />
                    </Popover>
                </div>
            </div>
        );
    }
    goPages() {
        this.props.history.push("/home");
    }
    getData() {
        api.getDynamicWaterInfo().then(res => {
            let { code, data } = res.data;
            if (code === 0) {
                this.setState({
                    info_data: data
                });
            } else {
                this.setState({
                    info_data: {}
                });
            }
        });
    }
}
