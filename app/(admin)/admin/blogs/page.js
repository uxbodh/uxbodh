"use client";

import { Button, Card, Switch, Table, message, Space, Popconfirm, Modal } from "antd";
import { useEffect, useState } from "react";
import { getBlogList, deleteBlog, createBlog, updateBlog } from "../../api/apiRoutes";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddBlogPage from "./addBlogPage";

const BlogList = () => {
    const [loading, setLoading] = useState(false);
    const [blogData, setBlogData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [records, setRecords] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = (record) => {
        if (record === "newBlog") {
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
        setFormData(data);
        if (data?.success) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        fetchBlogList();
    }, []);

    const columns = [
        {
            title: "Image",
            dataIndex: "blogImage",
            key: "blogImage",
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
            title: "Blog Title",
            dataIndex: "blogTitle",
            key: "title",
        },
        // {
        //     title: "Slug",
        //     dataIndex: "blogSlug",
        //     key: "slug",
        // },
        {
            title: "Content",
            dataIndex: "blogContent",
            key: "description",
        },
        {
            title: "Seo Title",
            dataIndex: "seoTitle",
            key: "seoTitle",
        },
        {
            title: "Seo Description",
            dataIndex: "seoDescription",
            key: "seoDescription",
        },
        {
            title: "Seo Keywords",
            dataIndex: "seoKeywords",
            key: "seoKeywords",
        },
        {
            title: "Published Date",
            dataIndex: "createdAt",
            key: "date",
            render: (_, record) => (
                <span>{dayjs(record?.createdAt).format("DD-MM-YYYY-HH:mm")}</span>
            )
        },
        {
            title: "Published",
            dataIndex: "isPublished",
            key: "isPublished",
            render: (_, record) => (
                <Switch
                    checked={record?.isPublished} // true = active, false = inactive
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    onChange={() => handleStatusChange(record)}
                />
            ),
        },
        {
            title: "Actions",
            key: "actions",
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
        }
    ]
    const fetchBlogList = async () => {
        try {
            let response = await getBlogList();
            if (response?.data?.success) {
                setBlogData(response?.data?.data);
            } else {
                messageApi.error(
                    response?.data?.message || "Failed to fetch blog list",
                );
            }
        } catch (err) {
            console.error("Blog list fetch error:", err);
            messageApi.error(
            err?.response?.data?.message ||
            err?.message ||
            "Network error. Please try again."
            );
        }
    };

    return (
        <>
            {contextHolder}
            <Card
                title="Blog List"
                extra={
                    <Button type="primary" onClick={() => showModal("newBlog")}>
                        Add Blog
                    </Button>
                }
            >
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={blogData}
                    pagination={false}
                    rowKey="_id"
                />
            </Card>
            <Modal
                title={records ? "Edit Blog" : "Add New Blog"}
                closable
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
                width={1200}
            >
                <AddBlogPage
                    getFormData={getFormData}
                    formData={formData}
                    editRecord={records}
                />
            </Modal>
        </>
    );
};
export default BlogList;
