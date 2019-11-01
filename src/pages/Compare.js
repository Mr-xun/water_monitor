import React, { PureComponent as Component } from "react";
import "../styles/compare.scss";
import { Card, Form, Button, DatePicker } from "antd";
import { chooseDate } from "../utils";
import Result from "../components/Compare/Result";
import Echart from "../components/Compare/Echart";
import moment from "moment";
const dateFormat = "YYYY-MM-DD";
const nowDate = chooseDate(0);
const startDate = chooseDate(7);
export default class Compare extends Component {
    constructor() {
        super();
        this.state = {
            a_time: startDate,
            b_time: nowDate
        };
        this.onChangeOne = this.onChangeOne.bind(this);
        this.onChangeTwo = this.onChangeTwo.bind(this);
        this.compare = this.compare.bind(this);
    }
    handleFormLayoutChange = e => {
        this.setState({ formLayout: e.target.value });
    };
    onChangeOne(date, dateString) {
        this.setState({ a_time: dateString });
    }
    onChangeTwo(date, dateString) {
        this.setState({ b_time: dateString });
    }
    compare() {
        this.refs.resultFn.getCompareData();
        this.refs.echart.initEchartData();
    }
    componentDidMount() {
        this.refs.resultFn.getCompareData();
        this.refs.echart.initEchartData();
    }
    render() {
        return (
            <div className="main">
                <Card>
                    <div className="compare-content">
                        <Form layout="inline">
                            <Form.Item label="对比时间一">
                                <DatePicker
                                    key="a_time"
                                    defaultValue={moment(startDate, dateFormat)}
                                    format={dateFormat}
                                    onChange={this.onChangeOne}
                                />
                            </Form.Item>
                            <Form.Item label="对比时间二">
                                <DatePicker
                                    key="b_time"
                                    defaultValue={moment(nowDate, dateFormat)}
                                    format={dateFormat}
                                    onChange={this.onChangeTwo}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" onClick={this.compare}>
                                    对比
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Result ref="resultFn" timeObj={this.state} />
                    <Echart ref="echart" timeObj={this.state}></Echart>
                </Card>
            </div>
        );
    }
}
