import React, { PureComponent as Component } from "react";
import api from "../../../api/index.js";
import { Table, Tag, message, Spin, Divider, Button } from "antd";
const { Column } = Table;
export default class HistoryData extends Component {
    constructor() {
        super();
        this.state = {
            tableData: [],
            loading: false
        };
    }
    getHisData() {
        let { times } = this.props;
        let params = {
            start_time: times[0],
            end_time: times[1]
        };
        this.setState({
            loading: true
        });
        api.getWaterHisTableData(params).then(res => {
            let { data, code } = res.data;
            if (code === 0) {
                data.forEach((item, index) => {
                    item.key = index;
                });
                this.setState({
                    tableData: data
                });
            } else {
                message.warning(res.data.message);
                this.setState({
                    tableData: []
                });
            }
            this.setState({
                loading: false
            });
        });
    }
    delRecord({ curTime }) {
        let params = { cur_time: curTime };
        api.delWaterRecord(params).then(res => {
            let { code } = res.data;
            if (code === 0) {
                message.success("坏点剔除成功");
            } else {
                message.warning(res.data.message);
            }
            this.props.refreshData();
        });
    }
    updateRecord({ curTime }) {
        let parmas = { cur_time: curTime };
        api.updateWaterAvg(parmas).then(res => {
            let { code } = res.data;
            if (code === 0) {
                message.success("三点滤波更新成功");
            } else {
                message.warning(res.data.message);
            }
            this.props.refreshData();
        });
    }
    render() {
        let { tableData, loading } = this.state;
        return (
            <div className="history-wrap">
                <Spin spinning={loading}>
                    <Table pagination={false} dataSource={tableData}>
                        <Column
                            title="日期"
                            dataIndex="curTime"
                            key="curTime"
                        />
                        <Column
                            title="水温"
                            dataIndex="temperature"
                            key="temperature"
                            render={val => <span>{val + "℃"}</span>}
                        />
                        <Column title="PH值" dataIndex="ph" key="ph" />
                        <Column
                            title="水压"
                            dataIndex="pressure"
                            key="pressure"
                            render={val => <span>{val + "Mpa"}</span>}
                        />
                        <Column
                            title="电解性"
                            dataIndex="electrolytic"
                            key="electrolytic"
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
                        <Column
                            title="操作"
                            key="action"
                            render={(text, record) => (
                                <span>
                                    <Button
                                        size="small"
                                        type="danger"
                                        onClick={() => {
                                            this.delRecord(record);
                                        }}
                                    >
                                        坏点剔除
                                    </Button>
                                    <Divider type="vertical" />
                                    <Button
                                        size="small"
                                        type="primary"
                                        onClick={() => {
                                            this.updateRecord(record);
                                        }}
                                    >
                                        三点滤波
                                    </Button>
                                </span>
                            )}
                        />
                    </Table>
                </Spin>
            </div>
        );
    }
}
