import React, { Component } from "react";
import { Card, Spin } from "antd";
import "./index.scss";
import api from "../../../api/index.js";
import echarts from "echarts";
import ReactEcharts from "echarts-for-react";
// 时间-流量关系曲线的数据
export default class Echarts extends Component {
    constructor() {
        super();
        this.state = {
            option: {},
            haveData: true
        };
    }
    initEchartData() {
        let params = { ...this.props.timeObj };
        this.setState({
            loading: true
        });
        api.getWaterCompareResult(params).then(res => {
            let { code, data } = res.data;
            if (code === 0) {
                let legends = [data[0].curTime, data[1].curTime];
                let data_one = [
                    data[0].temperature,
                    data[0].pressure,
                    data[0].ph
                ];
                let data_two = [
                    data[1].temperature,
                    data[1].pressure,
                    data[1].ph
                ];
                let option = {
                    tooltip: {
                        trigger: "axis"
                    },
                    grid: {
                        left: "2%",
                        right: "4%",
                        bottom: "14%",
                        top: "16%",
                        containLabel: true
                    },
                    legend: {
                        data: legends,
                        padding: 5,
                        itemGap: 20,
                        itemWidth: 30,
                        itemHeight: 10,
                        x: "center",
                        y: "bottom",
                        textStyle: {
                            color: "#333",
                            fontSize: 14
                        }
                    },
                    xAxis: {
                        type: "category",
                        data: ["温度", "水压", "PH值"],
                        axisLine: {
                            lineStyle: {
                                color: "#999"
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                fontFamily: "Microsoft YaHei"
                            }
                        }
                    },
                    yAxis: {
                        type: "value",
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#999"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: "rgba(255,255,255,0.3)"
                            }
                        },
                        axisLabel: {}
                    },
                    series: [
                        {
                            name: legends[0],
                            type: "bar",
                            barWidth: "15%",
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color: "#fccb05"
                                            },
                                            {
                                                offset: 1,
                                                color: "#f5804d"
                                            }
                                        ]
                                    ),
                                    barBorderRadius: 12
                                }
                            },
                            data: data_one
                        },
                        {
                            name: legends[1],
                            type: "bar",
                            barWidth: "15%",
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        0,
                                        0,
                                        1,
                                        [
                                            {
                                                offset: 0,
                                                color: "#248ff7"
                                            },
                                            {
                                                offset: 1,
                                                color: "#6851f1"
                                            }
                                        ]
                                    ),
                                    barBorderRadius: 11
                                }
                            },
                            data: data_two
                        }
                    ]
                };
                this.setState({
                    option: option,
                    haveData: true,
                    loading: false
                });
            } else {
                this.setState({
                    haveData: false
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    render() {
        let { haveData, option, loading } = this.state;
        let Comp = () => (
            <ReactEcharts
                className="echart-box"
                style={{ height: 400, width: "80%", margin: "o auto" }}
                notMerge={true}
                lazyUpdate={true}
                option={option}
            />
        );
        if (!haveData) {
            Comp = () => (
                <div className="no-data">
                    <Card
                        className="no-card"
                        bordered={true}
                        style={{ margin: "0 auto", width: "80%" }}
                    >
                        <img
                            src={require("../../../assets/imgs/404.png")}
                            alt=""
                        />
                        <h4 className="tip-title">当前条件暂无数据</h4>
                    </Card>
                </div>
            );
        }
        return (
            <div className="Echarts">
                <Spin spinning={loading}>
                    <Comp />
                </Spin>
            </div>
        );
    }
}
