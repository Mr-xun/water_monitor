/**
 * @param {*} _this this
 * @param {String} dom dom元素
 * @param {String} value value值
 * @param {String} text 文本内容
 * @param {String} color 主题颜色
 * @description 首页核心数据
 */
import echart from "echarts";
export const drawCoreDataEcharts = ({ value, text, color }) => {
    var data1 = [
        {
            text: text,
            value: value,
            color: color
        }
    ];
    function dataFormat(
        v = {
            value: "12345,12",
            color: "#5dd054"
        }
    ) {
        return [
            {
                value: 0,
                name: v.value,
                itemStyle: {
                    normal: {
                        color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: "#5dd054"
                            },
                            {
                                offset: 1,
                                color: v.color
                            }
                        ])
                    }
                },
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 30,
                            fontWeight: 500,
                            color: "#333"
                        }
                    }
                }
            }
        ];
    }

    function childrenFun(str = "按钮") {
        return [
            {
                type: "rect",
                left: "center",
                top: "center",
                shape: {
                    width: 150,
                    height: 40,
                    r: 20
                },
                style: {
                    fill: color,
                    lineWidth: 2
                }
            },
            {
                type: "text",
                left: "center",
                top: "center",
                style: {
                    fill: "#fff",
                    text: str,
                    font: "14px Microsoft YaHei"
                }
            }
        ];
    }
    let option = {
        legend: {
            show: false
        },
        tooltip: {
            show: false
        },
        series: [
            {
                type: "pie",
                radius: [60, 75],
                center: ["50%", "40%"],
                hoverAnimation: false,
                label: {
                    normal: {
                        position: "center"
                    }
                },
                data: dataFormat(data1[0])
            }
        ],
        graphic: {
            elements: [
                {
                    type: "group",
                    left: "center",
                    bottom: "0%",
                    z: 100,
                    children: childrenFun(data1[0].text)
                }
            ]
        }
    };
    return option;
};
