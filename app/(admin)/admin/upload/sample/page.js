"use client";
import { useEffect, useState } from "react";
import AddSampleImage from "./addSampleImage";
import {
    getSampleUploadList,
    updateSampleImageStatus,
    deleteSampleImageUpload,
} from "../../../api/apiRoutes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// const baseUrl =
//     typeof window !== "undefined"
//         ? window.location.origin
//         : "https://uxbodh.com";

const {
    Card,
    Table,
    Button,
    Modal,
    Tag,
    Space,
    Switch,
    message,
    Popconfirm,
} = require("antd");

const SampleImageList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sampleImageData, setSampleImageData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);
    const [records, setRecords] = useState(null);

    const getFormData = (data) => {
        console.log("data", data);
        setFormData(data);
        if (data?.success) {
            setIsModalOpen(false);
        }
    };
    const showModal = (record) => {
        if (record === "newUser") {
            setRecords(null);
        } else {
            setRecords(record);
        }
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fetchSampleImageData = async () => {
        let response = await getSampleUploadList();
        if (response?.data?.success) {
            setSampleImageData(response?.data?.data);
        }
    };

    const handleStatusChange = async (record) => {
        setLoading(true);
        console.log("record", record);
        let response = await updateSampleImageStatus({
            id: record?._id,
            status: record?.status,
        });
        try {
            if (response?.data?.success) {
                messageApi.success(response?.data?.message);
                fetchSampleImageData();
            }
        } catch (err) {
            messageApi.error(err.message);
        }
        setLoading(false);
    };

    const handleConfirm = async (id) => {
        setLoading(true);
        let response = await deleteSampleImageUpload({ id });
        try {
            if (response?.data?.success) {
                messageApi.success(response?.data?.message);
                fetchSampleImageData();
            }
        } catch (err) {
            messageApi.error(err.message);
        }
        setLoading(false);
    };

    const columns = [
        {
            title: "Thubmail",
            dataIndex: "thumbnail",
            key: "thumbnail",
            render: (url) => (
                <img src={url} alt="thumb" style={{ width: 80 }} />
            ),
            width: 120,
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (url) => (
                <img src={url} alt="thumb" style={{ width: 80 }} />
            ),
            width: 120,
        },
        {
            title: "Marker Position",
            dataIndex: "markerPostion",
            key: "markerPostion",
            render: (markers) => (
                <>
                    {markers.map((marker, idx) => (
                        <div key={idx}>
                            {idx + 1}. Top: {marker.topOffset}, Left:{" "}
                            {marker.leftOffset}
                        </div>
                    ))}
                </>
            ),
            width: 200,
        },
        {
            title: "Title",
            dataIndex: "contentHeading",
            key: "contentHeading",
            width: 250,
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            width: 250,
            ellipsis: true,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <Switch
                    checked={record.status} // true = active, false = inactive
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                    onChange={() => handleStatusChange(record)}
                />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size={20}>
                    <EditOutlined onClick={() => showModal(record)} />
                    <Popconfirm
                        icon={false}
                        description="Are you sure to delete this record?"
                        onConfirm={() => handleConfirm(record?._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchSampleImageData();
    }, [formData]);

    return (
        <>
            {contextHolder}
            <Card
                title="Sample Image List"
                extra={
                    <Button type="primary" onClick={() => showModal("newUser")}>
                        Add Sample Image
                    </Button>
                }
            >
                <Table
                    loading={loading}
                    bordered
                    dataSource={sampleImageData}
                    columns={columns}
                    rowKey="_id"
                    pagination={false}
                    scroll={{ x: 1200 }}
                />
            </Card>
            <Modal
                title="Add Sample Image"
                closable
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
                width={620}
            >
                <AddSampleImage
                    getFormData={getFormData}
                    formData={formData}
                    editRecord={records}
                />
            </Modal>
        </>
    );
};
export default SampleImageList;
