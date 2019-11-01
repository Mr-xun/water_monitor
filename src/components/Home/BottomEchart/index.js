import React, { PureComponent as Component } from "react";
import { Card, Col, Spin, Row, Button, DatePicker } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import "./index.scss";
import { chooseDate } from "../../../utils";
import ReactEcharts from "echarts-for-react";
import { drawCoreDataEcharts } from "../../../utils/draw-homeEchart";
import api from "../../../api/index.js";
moment.locale("zh-cn");
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const nowDate = chooseDate(0);
const startDate = chooseDate(30);
export default class BottomEchart extends Component {
    constructor() {
        super();
        this.state = {
            timeObj: {
                start_time: startDate,
                end_time: nowDate
            },
            loading: false,
            min_water_temperature_options: {},
            avg_water_temperature_options: {},
            max_water_temperature_options: {},

            min_water_pressure_options: {},
            avg_water_pressure_options: {},
            max_water_pressure_options: {},

            min_water_ph_options: {},
            avg_water_ph_options: {},
            max_water_ph_options: {},

            avg_water_electrolytic_options: {}
        };
        this.onChange = this.onChange.bind(this);
        this.search = this.search.bind(this);
    }
    getEveryEchartValue() {
        let params = this.state.timeObj;
        this.setState({
            loading: true
        });
        api.getWaterEveryValue(params).then(res => {
            let { code, data } = res.data;
            if (code === 0) {
                let min_water_temperature = {
                    text: "最低值",
                    value: `${data.min_water_temperature}`,
                    color: "rgba(24, 144, 255,1)"
                };
                let avg_water_temperature = {
                    text: "平均值",
                    value: `${data.avg_water_temperature}`,
                    color: "rgb(255, 97, 97)"
                };
                let max_water_temperature = {
                    text: "最高值",
                    value: `${data.max_water_temperature}`,
                    color: "rgb(230, 87, 34)"
                };
                let min_water_pressure = {
                    text: "最低值",
                    value: `${data.min_water_pressure}`,
                    color: "rgba(24, 144, 255,1)"
                };
                let avg_water_pressure = {
                    text: "平均值",
                    value: `${data.avg_water_pressure}`,
                    color: "rgb(255, 97, 97)"
                };
                let max_water_pressure = {
                    text: "最高值",
                    value: `${data.max_water_pressure}`,
                    color: "rgb(230, 87, 34)"
                };

                let min_water_ph = {
                    text: "最低值",
                    value: `${data.min_water_ph}`,
                    color: "rgba(24, 144, 255,1)"
                };
                let avg_water_ph = {
                    text: "平均值",
                    value: `${data.avg_water_ph}`,
                    color: "rgb(255, 97, 97)"
                };
                let max_water_ph = {
                    text: "最高值",
                    value: `${data.max_water_ph}`,
                    color: "rgb(230, 87, 34)"
                };

                
                let avg_water_electrolytic = {
                    text: "该区间电解性",
                    value: `${data.avg_water_electrolytic}`,
                    color: "rgb(255, 97, 97)"
                };
                this.setState({
                    min_water_temperature_options: drawCoreDataEcharts(
                        min_water_temperature
                    ),
                    avg_water_temperature_options: drawCoreDataEcharts(
                        avg_water_temperature
                    ),
                    max_water_temperature_options: drawCoreDataEcharts(
                        max_water_temperature
                    ),
                    min_water_pressure_options: drawCoreDataEcharts(
                        min_water_pressure
                    ),
                    avg_water_pressure_options: drawCoreDataEcharts(
                        avg_water_pressure
                    ),
                    max_water_pressure_options: drawCoreDataEcharts(
                        max_water_pressure
                    ),
                    min_water_ph_options: drawCoreDataEcharts(min_water_ph),
                    avg_water_ph_options: drawCoreDataEcharts(avg_water_ph),
                    max_water_ph_options: drawCoreDataEcharts(max_water_ph),
                    avg_water_electrolytic_options: drawCoreDataEcharts(
                        avg_water_electrolytic
                    )
                });
            } else {
                this.setState({
                    top_value: {}
                });
            }
            this.setState({
                loading: false
            });
        });
    }

    onChange(date, dateString) {
        this.setState({
            timeObj: {
                start_time: dateString[0],
                end_time: dateString[1]
            }
        });
    }
    search() {
        this.getEveryEchartValue();
    }
    componentDidMount() {
        this.getEveryEchartValue();
    }
    render() {
        let {
            loading,
            min_water_temperature_options,
            avg_water_temperature_options,
            max_water_temperature_options,
            min_water_pressure_options,
            avg_water_pressure_options,
            max_water_pressure_options,
            min_water_ph_options,
            avg_water_ph_options,
            max_water_ph_options,
            avg_water_electrolytic_options
        } = this.state;
        return (
            <div className="top-content">
                <div className="search-content">
                    <RangePicker
                        defaultValue={[
                            moment(startDate, dateFormat),
                            moment(nowDate, dateFormat)
                        ]}
                        onChange={this.onChange}
                        className="timeComp"
                    />
                    <Button type="primary" onClick={this.search}>
                        查询
                    </Button>
                </div>
                <div
                    className="top-card"
                    style={{ background: "#ECECEC", padding: "20px" }}
                >
                    <Row
                        gutter={16}
                        type="flex"
                        justify="space-around"
                        align="middle"
                    >
                        <Col span={12}>
                            <Card title="水温值统计（℃）" bordered={false}>
                                <Spin spinning={loading}>
                                    <div className="echart-box">
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "33.3%",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={
                                                min_water_temperature_options
                                            }
                                        />
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "33.3%",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={
                                                avg_water_temperature_options
                                            }
                                        />
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "33.3%",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={
                                                max_water_temperature_options
                                            }
                                        />
                                    </div>
                                </Spin>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="水压值统计（Mpa）" bordered={false}>
                                <Spin spinning={loading}>
                                    <div className="echart-box">
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "33.3%",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={min_water_pressure_options}
                                        />
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "33.3%",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={avg_water_pressure_options}
                                        />
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "33.3%",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={max_water_pressure_options}
                                        />
                                    </div>
                                </Spin>
                            </Card>
                        </Col>
                    </Row>
                    <Row
                        gutter={16}
                        type="flex"
                        justify="space-around"
                        align="middle"
                        style={{ marginTop: "15px" }}
                    >
                        <Col span={12}>
                            <Card title="PH值统计" bordered={false}>
                                <Spin spinning={loading}>
                                    <div className="echart-box">
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "33.3%",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={min_water_ph_options}
                                        />
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "33.3%",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={avg_water_ph_options}
                                        />
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "33.3%",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={max_water_ph_options}
                                        />
                                    </div>
                                </Spin>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="电解性统计" bordered={false}>
                                <Spin spinning={loading}>
                                    <div className="echart-box">
                                        <ReactEcharts
                                            style={{
                                                height: 200,
                                                width: "50%",
                                                margin: "0 auto",
                                                display: "inline block"
                                            }}
                                            notMerge={true}
                                            lazyUpdate={true}
                                            option={
                                                avg_water_electrolytic_options
                                            }
                                        />
                                    </div>
                                </Spin>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
