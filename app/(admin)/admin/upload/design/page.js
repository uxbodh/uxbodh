"use client";
import {
    Button,
    Card,
    Modal,
    Table,
    message,
    Space,
    Image,
    Switch,
    Popconfirm,
    Row,
    Col,
} from "antd";
import { useEffect, useState } from "react";
import AddDesignImage from "./addDesignPage";
import {
    getDesignPageList,
    updateDesignPageStatus,
    deleteDesignPage,
} from "../../../api/apiRoutes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const DesignPageImageList = () => {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sampleImageData, setSampleImageData] = useState([]);
    const [formData, setFormData] = useState(null);
    const [records, setRecords] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

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

    const getFormData = (data) => {
        console.log("data", data);
        setFormData(data);
        if (data?.success) {
            setIsModalOpen(false);
        }
    };

    const fetchDesignPageData = async () => {
        setLoading(true);
        let response = await getDesignPageList();
        if (response?.data?.success) {
            setSampleImageData(response?.data?.data);
        } else {
            messageApi.error(
                response?.data?.message || "Something went wrong!!!",
            );
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDesignPageData();
    }, [formData]);

    const handleConfirm = async (id) => {
        setLoading(true);
        let response = await deleteDesignPage({ id });
        try {
            if (response?.data?.success) {
                messageApi.success(response?.data?.message);
                fetchDesignPageData();
            } else {
                messageApi.error(response?.data?.message);
            }
        } catch (err) {
            messageApi.error(err.message);
        }
        setLoading(false);
    };

    const handleStatusChange = async (record) => {
        setLoading(true);
        console.log("record", record);
        let response = await updateDesignPageStatus({
            id: record?._id,
            status: record?.status,
        });
        try {
            if (response?.data?.success) {
                messageApi.success(response?.data?.message);
                fetchDesignPageData();
            } else {
                messageApi.error(response?.data?.message);
            }
        } catch (err) {
            messageApi.error(err.message);
        }
        setLoading(false);
    };
    const columns = [
        {
            title: "Image",
            dataIndex: "mainImage",
            key: "mainImage",
            width: 90,
            render: (path) => (
                <img
                    src={`${path}`}
                    alt="main"
                    style={{
                        width: 60,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 4,
                    }}
                />
            ),
        },
        {
            title: "Heading",
            dataIndex: "heading",
            key: "heading",
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: "Sub Heading",
            dataIndex: "subHeading",
            key: "subHeading",
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

    const ExpandedContent = ({ record }) => {
        return (
            <div style={{ padding: 12 }}>
                {/* Main Image */}
                <div style={{ marginBottom: 16 }}>
                    <strong>Main Image</strong>
                    <br />
                    <Image width={200} src={`${record.mainImage}`} />
                </div>

                {/* Sections */}
                <div style={{ marginBottom: 20 }}>
                    <strong>Sections</strong>

                    {record.sections?.length ? (
                        record.sections.map((sec, index) => (
                            <div
                                key={index}
                                style={{
                                    marginTop: 12,
                                    padding: 12,
                                    border: "1px solid #eee",
                                    borderRadius: 6,
                                }}
                            >
                                <p>
                                    <b>Heading:</b> {sec.heading}
                                </p>
                                <p>
                                    <b>Subheading:</b> {sec.subheading}
                                </p>
                                <div>
                                    <b>Content:</b>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: sec.content,
                                        }}
                                        style={{ marginTop: 6 }}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#999" }}>No sections added</p>
                    )}
                </div>

                {/* Gallery Images */}
                <div>
                    <strong>Gallery Images</strong>
                    <br />

                    {record.imageList?.length ? (
                        <Image.PreviewGroup>
                            <Row gutter={[20, 20]}>
                                {record.imageList.map((img, i) => (
                                    <Col key={i}>
                                        <Image width={180} src={img} />
                                    </Col>
                                ))}
                            </Row>
                        </Image.PreviewGroup>
                    ) : (
                        <p style={{ color: "#999" }}>No gallery images</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            {contextHolder}
            <Card
                title="Sample Image List"
                extra={
                    <Button type="primary" onClick={() => showModal("newUser")}>
                        Add Design Image
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
                    expandable={{
                        expandedRowRender: (record) => (
                            <ExpandedContent record={record} />
                        ),
                    }}
                />
            </Card>
            <Modal
                title="Add Design page"
                closable
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
                width={620}
            >
                <AddDesignImage
                    getFormData={getFormData}
                    formData={formData}
                    editRecord={records}
                />
            </Modal>
        </>
    );
};

export default DesignPageImageList;
