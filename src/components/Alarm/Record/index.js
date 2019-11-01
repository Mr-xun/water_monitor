import React, { PureComponent as Component } from "react";
import api from "../../../api/index.js";
import moment from "moment";
import "moment/locale/zh-cn";
import "./index.scss";
import { chooseDate } from "../../../utils";
import { Table, Tag, Spin, DatePicker, Button, message } from "antd";
import Echarts from "../Echarts";
const { Column } = Table;
const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";
const nowDate = chooseDate(0);
const startDate = chooseDate(30);
export default class Record extends Component {
    constructor() {
        super();
        this.state = {
            recordData: [],
            start_time: startDate,
            end_time: nowDate,
            loading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.search = this.search.bind(this);
    }
    onChange(date, dateString) {
        this.setState({
            start_time: dateString[0],
            end_time: dateString[1]
        });
    }
    search() {
        this.getRecord();
        this.refs.echart.getHisEchartData();
    }
    getRecord() {
        let { start_time, end_time } = this.state;
        let params = { start_time, end_time };
        this.setState({
            loading: true
        });
        api.getWaterAlarmRecord(params).then(res => {
            let { code, data } = res.data;
            if (code === 0) {
                data.forEach((item, index) => {
                    item.key = index;
                });
                this.setState({
                    recordData: data
                });
            } else {
                message.warning(res.data.message);
                this.setState({
                    recordData: []
                });
            }
            this.setState({
                loading: false
            });
        });
    }

   
    componentDidMount() {
        this.getRecord();
        this.refs.echart.getHisEchartData();
    }
    render() {
        let {
            recordData,
            loading,
            start_time,
            end_time,
        } = this.state;
        return (
            <div className="record-wrap">
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
                <Echarts
                    start_time={start_time}
                    end_time={end_time}
                    ref="echart"
                />
                <div className="table-content">
                    <Spin spinning={loading}>
                        <Table
                            dataSource={recordData}
                            bordered
                            pagination={false}
                        >
                            <Column title="日期" dataIndex="curTime" />
                            <Column
                                title="水温"
                                dataIndex="temperature"
                                render={val => <span>{val + "℃"}</span>}
                            />
                            <Column
                                title="水压"
                                dataIndex="pressure"
                                render={val => <span>{val + "Mpa"}</span>}
                            />
                            <Column title="PH值" dataIndex="ph" />
                            <Column
                                title="电解性"
                                dataIndex="electrolytic"
                                render={tags => (
                                    <span>
                                        <Tag
                                            color={tags ? "green" : "geekblue"}
                                            key={tags}
                                        >
                                            {tags ? "强" : "弱"}
                                        </Tag>
                                    </span>
                                )}
                            />
                        </Table>
                    </Spin>
                </div>
            </div>
        );
    }
}
