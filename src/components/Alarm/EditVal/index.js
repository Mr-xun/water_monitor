import React, { Component } from "react";
import { Modal, message, Form, Input, Radio } from "antd";
import "./index.scss";
import api from "../../../api/index.js";
class EditMostVal extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            value: ""
        };
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleOk = e => {
        let { form, type, refreshData } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            let params = {
                [type]: fieldsValue.inputVal,
                [type + "_flag"]: fieldsValue.radioType
            };
            api.updateAlarmValue(params).then(res => {
                if (res.data.message === "success") {
                    message.success("修改成功");
                    refreshData();
                } else {
                    message.warning(res.data.message);
                }
                this.handleCancel();
            });
        });
    };

    handleCancel() {
        this.props.onClose();
    }
    render() {
        let { visible, title, type, valObj } = this.props;
        let inpVal = valObj[type];
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="edit-content">
                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>
                        <Form layout="horizontal">
                            <Form.Item label="预警值" {...formItemLayout}>
                                {getFieldDecorator("inputVal", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入预警值!"
                                        }
                                    ]
                                })(<Input placeholder={inpVal} />)}
                            </Form.Item>
                            <Form.Item label="判断值" {...formItemLayout}>
                                {getFieldDecorator("radioType", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请选择判断值!"
                                        }
                                    ]
                                })(
                                    <Radio.Group>
                                        <Radio value={true}>大于该值</Radio>
                                        <Radio value={false}>小于该值</Radio>
                                    </Radio.Group>
                                )}
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}
EditMostVal = Form.create({ name: "validate_other" })(EditMostVal);
export default EditMostVal;
