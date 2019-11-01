import React, { Component } from "react";
import { Card, Spin } from "antd";
import "./index.scss";
import api from "../../../api/index.js";
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
    getHisEchartData() {
        let { times } = this.props;
        let params = {
            start_time: times[0],
            end_time: times[1]
        };
        this.setState({
            loading: true
        });
        api.getWaterHisEchartData(params).then(res => {
            let { data, code } = res.data;
            if (code === 0) {
                let { x_time, temperatures, pressures, phs } = data;
                const option = {
                    tooltip: {
                        trigger: "axis"
                    },
                    title: {
                        text: "水属性值历史数据",
                        textStyle: {
                            //文字颜色
                            color: "#999",
                            //字体风格,'normal','italic','oblique'
                            fontStyle: "normal",
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: "bold",
                            //字体系列
                            fontFamily: "sans-serif",
                            //字体大小
                            fontSize: 18
                        },
                        x: "center",
                        y: "5%"
                    },
                    legend: {
                        data: ["水温", "水压", "PH值"],
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
                    xAxis: [
                        {
                            type: "category",
                            data: x_time,
                            axisLine: {
                                lineStyle: {
                                    color: "#999"
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: "value",
                            splitNumber: 4,
                            splitLine: {
                                lineStyle: {
                                    type: "dashed",
                                    color: "#DDD"
                                }
                            },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: "#333"
                                }
                            },
                            nameTextStyle: {
                                color: "#999"
                            },
                            splitArea: {
                                show: false
                            }
                        }
                    ],
                    series: [
                        {
                            name: "水温",
                            type: "line",
                            data: temperatures,
                            lineStyle: {
                                normal: {
                                    width: 8,
                                    color: {
                                        type: "linear",
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "#A9F387" // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "#48D8BF" // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: "rgba(72,216,191, 0.3)",
                                    shadowBlur: 10,
                                    shadowOffsetY: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#A9F387",
                                    borderWidth: 10,
                                    borderColor: "#A9F387"
                                }
                            },
                            smooth: true
                        },
                        {
                            name: "水压",
                            type: "line",
                            data: pressures,
                            lineStyle: {
                                normal: {
                                    width: 8,
                                    color: {
                                        type: "linear",
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "#f7b402" // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "#ff7403" // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: "#ff74033b",
                                    shadowBlur: 10,
                                    shadowOffsetY: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#f7b402",
                                    borderWidth: 10,
                                    borderColor: "#f7b402"
                                }
                            },
                            smooth: true
                        },
                        {
                            name: "PH值",
                            type: "line",
                            data: phs,
                            lineStyle: {
                                normal: {
                                    width: 8,
                                    color: {
                                        type: "linear",
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "#78b9f5" // 0% 处的颜色
                                            },
                                            {
                                                offset: 1,
                                                color: "#184cff" // 100% 处的颜色
                                            }
                                        ],
                                        globalCoord: false // 缺省为 false
                                    },
                                    shadowColor: "#78b9f54a",
                                    shadowBlur: 10,
                                    shadowOffsetY: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#78b9f5",
                                    borderWidth: 10,
                                    borderColor: "#78b9f5"
                                }
                            },
                            smooth: true
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
