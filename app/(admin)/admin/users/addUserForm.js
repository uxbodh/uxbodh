import { Button, Col, Form, Input, Radio, Row, message } from "antd";
import { addUser, updateUser } from "../../api/apiRoutes";
import { useEffect } from "react";

const statusOptions = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
];

const AddUser = ({ getFormData, editRecord }) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const isEdit = !!editRecord?._id;

    const setFormDataFunction = (data) => {
        getFormData(data);
    };

    const onFinish = async (values) => {
        let payload = {
            userName: values?.userName,
            password: values?.password,
            fullName: values?.fullName,
            emailId: values?.emailId,
            status: values?.status,
        };

        let response = null;
        if (editRecord) {
            response = await updateUser(payload, editRecord?._id);
        } else {
            response = await addUser(payload);
        }

        if (response?.data?.success) {
            setFormDataFunction(response?.data);
            messageApi.success(response?.data?.message);
            form.resetFields();
        } else {
            messageApi.error(response?.data?.message);
        }
    };

    useEffect(() => {
        if (editRecord) {
            form.setFieldsValue({
                userName: editRecord.userName,
                fullName: editRecord.fullName,
                emailId: editRecord.emailId,
                status: editRecord.status,
            });
        } else {
            form.resetFields();
            form.setFieldsValue({
                status: true,
            });
        }
    }, [editRecord, form]);

    return (
        <>
            {contextHolder}
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                style={{ marginTop: 20 }}
            >
                <Row gutter={20}>
                    <Col span={12}>
                        <Form.Item
                            name="userName"
                            label="User Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter user name",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter User Name"
                                disabled={isEdit ? true : false}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: !isEdit,
                                    message: "Please enter password",
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder={
                                    isEdit
                                        ? "Leave blank to keep same password"
                                        : "Enter Password"
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="fullName"
                            label="Full Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter full name",
                                },
                            ]}
                        >
                            <Input placeholder="Enter Full Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="emailId"
                            label="Email Id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter email ID",
                                },
                                {
                                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter valid email ID",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter Email ID"
                                disabled={isEdit ? true : false}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="status">
                            <Radio.Group options={statusOptions} />
                        </Form.Item>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
};
export default AddUser;
