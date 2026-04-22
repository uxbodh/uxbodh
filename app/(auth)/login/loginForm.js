"use client";
import { Button, Card, Col, Form, Row, Input, Alert } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { loginDashboard } from "../api/apiRoutes";
import { useState } from "react";

const LoginForm = ({ getFormData }) => {

    const [form] = Form.useForm();
    const [errorMsg, setErrorMsg] = useState(null);

    const setFormDataFunction = (data) => {
        getFormData(data);
    };

    const onFinish = async(values) => {
        let payload = {
            userName: values?.userName,
            password: values?.password
        }
        let response = await loginDashboard(payload);
        setFormDataFunction(response?.data);
        if(!response?.data?.success) {
            setErrorMsg(response?.data?.message);
        }
        
    };

    return (
        <>
            <Row style={{ paddingTop: 100 }}>
                <Col span={8}></Col>
                <Col span={8}>
                    <Card
                        extra={
                            <img
                                src="../../images/logo.svg"
                                alt="logo"
                                style={{ display: "block", margin: "0 auto" }}
                            />
                        }
                        style={{borderRadius: 10}}
                        hoverable
                    >
                        {errorMsg && 
                            <Alert
                                title={errorMsg}
                                type="error"
                                closable
                                style={{marginBottom: 20}}
                            />
                        }

                        <Form 
                            form={form} 
                            onFinish={onFinish}
                            layout="vertical"
                        >
                            <Form.Item
                                label={null}
                                name="userName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                label={null}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
                            </Form.Item>
                            <Form.Item
                                style={{ textAlign: "center" }}
                            >
                                <Button type="primary" size="large" htmlType="submit" style={{paddingLeft: 30, paddingRight: 30}}>Login</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default LoginForm;
