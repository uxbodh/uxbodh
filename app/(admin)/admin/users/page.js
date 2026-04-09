"use client";
import { Button, Card, Modal, Space, Spin, Table, Tag, message } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import AddUser from "./addUserForm";
import { getUserList } from "../../api/apiRoutes";

const UserList = () => {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState(null);
    const [records, setRecords] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = (record) => {
        if(record==="newUser") {
            setRecords(null)
        } else {
            setRecords(record)
        }
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchUserList = async () => {
        setLoading(true);
        let response = await getUserList();
        if (response?.data?.success) {
            setUserData(response?.data?.data);
        } else {
            messageApi.error(
                response?.data?.message || "Something went wrong!!!"
            );
        }
        setLoading(false);
    };

    const getFormData = (data) => {
        setFormData(data);
        if (data?.success) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        fetchUserList();
    }, [formData]);

    const columns = [
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email ID",
            dataIndex: "emailId",
            key: "emailId",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <Tag
                    size="medium"
                    color={record?.status === true ? "green" : "red"}
                >
                    {record?.status ? "Active" : "Inactive"}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size={20}>
                    <EditOutlined onClick={() => showModal(record)} />
                    <DeleteOutlined style={{ color: "red" }} />
                </Space>
            ),
        },
    ];

    return (
        <>
            {contextHolder}
            <Card
                title="User List"
                extra={
                    <Button
                        onClick={() => showModal('newUser')}
                        type="primary"
                        icon={<PlusCircleOutlined />}
                    >
                        Add User
                    </Button>
                }
            >
                <Spin spinning={loading}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={userData}
                        rowKey={(record) => record._id}
                        pagination={false}
                    />
                </Spin>
            </Card>
            <Modal
                title="Add User"
                closable
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={700}
            >
                <AddUser getFormData={getFormData} formData={formData} editRecord={records} />
            </Modal>
        </>
    );
};

export default UserList;
