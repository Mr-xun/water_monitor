import React, { PureComponent as Component } from "react";
import { Card, DatePicker, Button } from "antd";
import "../styles/historyData.scss";
import moment from "moment";
import "moment/locale/zh-cn";
import { chooseDate } from "../utils";
import TableData from "../components/History/TableData";
import Echarts from "../components/History/Echarts";
moment.locale("zh-cn");
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";
const nowDate = chooseDate(0);
const startDate = chooseDate(30);
export default class History extends Component {
    constructor() {
        super();
        this.state = {
            timeArr: [startDate, nowDate]
        };
        this.onChange = this.onChange.bind(this);
        this.search = this.search.bind(this);
    }
    onChange(date, dateString) {
        this.setState({
            timeArr: dateString
        });
    }
    search() {
        this.refs.table.getHisData();
        this.refs.echart.getHisEchartData();
    }
    componentDidMount() {
        this.search();
    }
    render() {
        let { timeArr } = this.state;
        return (
            <div className="main">
                <Card>
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
                    <Echarts times={timeArr} ref="echart" />
                    <TableData
                        times={timeArr}
                        refreshData={this.search}
                        ref="table"
                    />
                </Card>
            </div>
        );
    }
}
