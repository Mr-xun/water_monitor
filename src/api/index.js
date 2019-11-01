import request from "./http";
const ORIGIN_PATH = "http://62.234.138.175:8000"; //远端
const LOCAL_PATH = "http://localhost:8000"; //本地
let _CURRENT_PATH_ = (function() {
    //选择接口
    let currentHost = window.location.host;
    switch (currentHost) {
        case "62.234.138.175:8000":
            return ORIGIN_PATH;
        default:
            return ORIGIN_PATH;
    }
})();
export default {
    getDynamicWaterInfo() {
        //获取动态水质信息
        return request.get(_CURRENT_PATH_ + "/water/getDynamicWaterInfo");
    },
    getWaterHisTableData(params) {
        //获取动态水质历史数据
        return request.post(_CURRENT_PATH_ + "/water/getWaterInfos", params);
    },
    delWaterRecord(params) {
        //获坏点剔除
        return request.post(_CURRENT_PATH_ + "/water/delWaterInfo", params);
    },
    updateWaterAvg(params) {
        //三水波纹, 用于修改改时间点的数据为前后的平均值
        return request.post(_CURRENT_PATH_ + "/water/updateWaterInfo", params);
    },
    getWaterHisEchartData(params) {
        //获取动态水质历史数据Echart
        return request.post(
            _CURRENT_PATH_ + "/water/getWaterInfosChart",
            params
        );
    },
    getWaterCompareResult(params) {
        //获取动态水质两个时刻的数据对比
        return request.post(_CURRENT_PATH_ + "/water/compareWaterInfo", params);
    },
    getWaterAlarmRecord(params) {
        //获取获取报警信息记录
        return request.post(
            _CURRENT_PATH_ + "/water/getAlertWaterInfos",
            params
        );
    },
    getWaterAlarmRecordEchart(params) {
        //获取获取报警信息记录图表
        return request.post(
            _CURRENT_PATH_ + "/water/getAlertWaterInfosChart",
            params
        );
    },
    getWaterAlarmInfo() {
        //获取获取预警值
        return request.get(_CURRENT_PATH_ + "/water/getAlertInfo");
    },
    updateAlarmValue(params) {
        //更新预警值
        return request.post(_CURRENT_PATH_ + "/water/updateAlertPoint", params);
    },
    getWaterEveryValue(params) {
        //统计的显示（最小最、大值，平均值)
        return request.post(
            _CURRENT_PATH_ + "/water/getSpecifiedWaterInfo",
            params
        );
    }
};
