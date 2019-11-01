import React, { Component } from "react";
import { Card, Spin } from "antd";
import "./index.scss";
import api from "../../../api/index.js";
import axios from "axios";
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
    getMostValue() {
        return api.getWaterAlarmInfo();
    }
    getWaterAlarmRecord() {
        let { start_time, end_time } = this.props;
        let params = {
            start_time,
            end_time
        };
        return api.getWaterAlarmRecordEchart(params);
    }
    getHisEchartData() {
        this.setState({
            loading: true
        });
        axios.all([this.getWaterAlarmRecord(), this.getMostValue()]).then(
            axios.spread((allRecord, mostObj) => {
                let all_code = allRecord.data.code;
                let all_data = allRecord.data.data;
                let most_code = mostObj.data.code;
                let most_data = mostObj.data.data;
                if (all_code === 0 && most_code === 0) {
                    let { x_time, temperatures, pressures, phs } = all_data;
                    let { temperature, pressure, ph } = most_data;
                    const option = {
                        title: {
                            top: "20",
                            left: "50%",
                            textAlign: "center",
                            textStyle: {
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "#999"
                            },
                            text: "预警记录"
                        },
                        grid: {
                            left: "50px"
                        },
                        tooltip: {
                            trigger: "axis"
                        },
                        legend: {
                            show: true,
                            bottom: 10
                        },
                        xAxis: [
                            {
                                type: "category",
                                boundaryGap: false,
                                data: x_time,
                                axisLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "#eee"
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    color: "#333"
                                },
                                axisTick: {
                                    show: false
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: "value",
                                splitNumber: 5,
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: "#eee"
                                    }
                                },
                                axisLine: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                }
                            }
                        ],
                        series: [
                            {
                                name: "水温",
                                type: "line",
                                symbol: "circle",
                                markLine: {
                                    //最大值和最小值
                                    data: [
                                        {
                                            name: `水温阈值${temperature}℃`,
                                            yAxis: temperature,
                                            label: {
                                                show: "true",
                                                position: "end",
                                                formatter: `水温阈值${temperature}℃`
                                            },
                                            lineStyle: {
                                                normal: {
                                                    width: 3,
                                                    color: "#FF5D1D"
                                                }
                                            }
                                        }
                                    ]
                                },
                                areaStyle: {
                                    color: {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "rgba(255,64,64,0.4)" // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "rgba(255,64,64,0.1)" // 100% 处的颜色
                                            }
                                        ]
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: "rgba(255,64,64)"
                                    }
                                },
                                data: temperatures
                            },
                            {
                                name: "水压",
                                type: "line",
                                symbol: "circle",
                                markLine: {
                                    //最大值和最小值
                                    data: [
                                        {
                                            name: `水压阈值${pressure}Map`,
                                            yAxis: pressure,
                                            label: {
                                                show: "true",
                                                position: "end",
                                                formatter: `水压阈值${pressure}Map`
                                            },
                                            lineStyle: {
                                                normal: {
                                                    width: 3,
                                                    color: "rgb(255,171,250)"
                                                }
                                            }
                                        }
                                    ]
                                },
                                areaStyle: {
                                    color: {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "rgb(255,171,250,0.4)" // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "rgba(255,171,250,0.1)" // 100% 处的颜色
                                            }
                                        ]
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: "rgb(255,171,250)"
                                    }
                                },
                                data: pressures
                            },
                            {
                                name: "PH值",
                                type: "line",
                                symbol: "circle",
                                markLine: {
                                    //最大值和最小值
                                    data: [
                                        {
                                            name: `水压阈值${ph}`,
                                            yAxis: ph,
                                            label: {
                                                show: "true",
                                                position: "end",
                                                formatter: `水压阈值${ph}`
                                            },
                                            lineStyle: {
                                                normal: {
                                                    width: 3,
                                                    color: "rgb(24,144,255)"
                                                }
                                            }
                                        }
                                    ]
                                },
                                areaStyle: {
                                    color: {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "rgb(24,144,255,0.4)" // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "rgba(24,144,255,0.1)" // 100% 处的颜色
                                            }
                                        ]
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: "rgb(24,144,255)"
                                    }
                                },
                                data: phs
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
            })
        );
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
