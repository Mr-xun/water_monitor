import React, { Component } from "react";
import { Table, Spin, message } from "antd";
import api from "../../../api/index.js";
import "./index.scss";
const { Column } = Table;
let initData = [
    {
        key: "1",
        source: "对比时间",
        compare1: "---",
        compare2: "---"
    },
    {
        key: "2",
        source: "温度",
        compare1: "---",
        compare2: "---"
    },
    {
        key: "3",
        source: "水压",
        compare1: "---",
        compare2: "---"
    },
    {
        key: "4",
        source: "PH值",
        compare1: "---",
        compare2: "---"
    },
    {
        key: "5",
        source: "电解性",
        compare1: "---",
        compare2: "---"
    }
];
export default class HistoryData extends Component {
    constructor() {
        super();
        this.state = {
            resultData: initData,
            loading: false
        };
    }
    getCompareData() {
        let params = { ...this.props.timeObj };
        this.setState({
            loading: true
        });
        api.getWaterCompareResult(params).then(res => {
            let { code, data } = res.data;
            if (code === 0) {
                let newData = JSON.parse(JSON.stringify(initData));
                newData[0]["compare1"] = data[0].curTime
                    ? data[0].curTime
                    : "--";
                newData[0]["compare2"] = data[1].curTime
                    ? data[1].curTime
                    : "--";
                newData[1]["compare1"] =
                    data[0].temperature >= 0
                        ? data[0].temperature + " ℃"
                        : "--";
                newData[1]["compare2"] =
                    data[1].temperature >= 0
                        ? data[1].temperature + " ℃"
                        : "--";
                newData[2]["compare1"] =
                    data[0].pressure >= 0 ? data[0].pressure + "Mpa" : "--";
                newData[2]["compare2"] =
                    data[1].pressure >= 0 ? data[1].pressure + "Mpa" : "--";
                newData[3]["compare1"] = data[0].ph >= 0 ? data[0].ph : "--";
                newData[3]["compare2"] = data[1].ph >= 0 ? data[1].ph : "--";
                newData[4]["compare1"] = data[0].electrolytic ? "强" : "弱";
                newData[4]["compare2"] = data[1].electrolytic ? "强" : "弱";
                this.setState({
                    resultData: newData
                });
            } else {
                message.warning(res.data.message);
                this.setState({
                    resultData: initData
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    render() {
        let { resultData, loading } = this.state;
        return (
            <div>
                <Spin spinning={loading}>
                    <Table dataSource={resultData} bordered pagination={false}>
                        <Column
                            title="对比源"
                            dataIndex="source"
                            key="source"
                        />
                        <Column
                            title="对比一"
                            dataIndex="compare1"
                            key="compare1"
                        />
                        <Column
                            title="对比二"
                            dataIndex="compare2"
                            key="compare2"
                        />
                    </Table>
                </Spin>
            </div>
        );
    }
}
