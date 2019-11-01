import React, { PureComponent as Component } from "react";
import { Card, Col, Row, Spin, Button, Icon, Divider } from "antd";
import "./index.scss";
import api from "../../../api/index.js";
import EditMostVal from "../EditVal";
export default class WarnMostValue extends Component {
    constructor() {
        super();
        this.state = {
            modal_visible: false,
            loading: false,
            valueObj: {
                ph: "--",
                ph_flag: true,
                pressure: "--",
                pressure_flag: true,
                temperature: "--",
                temperature_flag: true
            }
        };
        this.openModal = this.openModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.getCurrentVal = this.getCurrentVal.bind(this);
    }
    getCurrentVal() {
        this.setState({
            loading: true
        });
        api.getWaterAlarmInfo().then(res => {
            let { code, data } = res.data;
            if (code === 0) {
                this.setState({
                    valueObj: data
                });
            } else {
                this.setState({
                    valueObj: {}
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    openModal(type, title) {
        this.setState({
            modal_visible: true,
            type,
            title
        });
    }
    cancelModal() {
        this.setState({
            modal_visible: false
        });
    }
    componentDidMount() {
        this.getCurrentVal();
    }
    render() {
        let {
            ph,
            ph_flag,
            pressure,
            pressure_flag,
            temperature,
            temperature_flag
        } = this.state.valueObj;
        let { modal_visible, type, title, valueObj, loading } = this.state;
        let TempVal = () => <span>{temperature}</span>;
        let PreVal = () => <span>{pressure}</span>;
        let PhVal = () => <span>{ph}</span>;
        let TempIcon = () => (
            <Icon
                type={temperature_flag ? "up-circle" : "down-circle"}
                theme="twoTone"
                twoToneColor="#fd5454"
            />
        );
        let PreIcon = () => (
            <Icon
                type={pressure_flag ? "up-circle" : "down-circle"}
                theme="twoTone"
                twoToneColor="#fd5454"
            />
        );
        let PhIcon = () => (
            <Icon
                type={ph_flag ? "up-circle" : "down-circle"}
                theme="twoTone"
                twoToneColor="#fd5454"
            />
        );

        return (
            <div className="most-content">
                <div style={{ background: "#ECECEC", padding: "30px" }}>
                    <Row
                        gutter={16}
                        type="flex"
                        justify="space-around"
                        align="middle"
                    >
                        <Col span={8}>
                            <Card title="水温阈值" bordered>
                                <div className="card-box">
                                    <div className="left-con">
                                        <div className="icon">
                                            <TempIcon />
                                        </div>
                                        <div className="val">
                                            <Spin spinning={loading}>
                                                <TempVal />
                                            </Spin>
                                        </div>
                                    </div>
                                    <div className="right-con">
                                        <Divider
                                            type="vertical"
                                            style={{ height: "100%" }}
                                        />
                                        <Button
                                            type="primary"
                                            shape="round"
                                            icon="edit"
                                            onClick={() =>
                                                this.openModal(
                                                    "temperature",
                                                    "修改水温阈值"
                                                )
                                            }
                                        >
                                            修改
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="水压阈值" bordered>
                                <div className="card-box">
                                    <div className="left-con">
                                        <div className="icon">
                                            <PreIcon />
                                        </div>
                                        <div className="val">
                                            <Spin spinning={loading}>
                                                <PreVal />
                                            </Spin>
                                        </div>
                                    </div>
                                    <div className="right-con">
                                        <Divider
                                            type="vertical"
                                            style={{ height: "100%" }}
                                        />
                                        <Button
                                            type="primary"
                                            shape="round"
                                            icon="edit"
                                            onClick={() =>
                                                this.openModal(
                                                    "pressure",
                                                    "修改水压阈值"
                                                )
                                            }
                                        >
                                            修改
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title="PH值阈值" bordered>
                                <div className="card-box">
                                    <div className="left-con">
                                        <div className="icon">
                                            <PhIcon />
                                        </div>
                                        <div className="val">
                                            <Spin spinning={loading}>
                                                <PhVal />
                                            </Spin>
                                        </div>
                                    </div>
                                    <div className="right-con">
                                        <Divider
                                            type="vertical"
                                            style={{ height: "100%" }}
                                        />
                                        <Button
                                            type="primary"
                                            shape="round"
                                            icon="edit"
                                            onClick={() =>
                                                this.openModal(
                                                    "ph",
                                                    "修改PH值阈值"
                                                )
                                            }
                                        >
                                            修改
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <EditMostVal
                    type={type}
                    title={title}
                    valObj={valueObj}
                    visible={modal_visible}
                    onClose={this.cancelModal}
                    refreshData={this.getCurrentVal}
                />
            </div>
        );
    }
}
