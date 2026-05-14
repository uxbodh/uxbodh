"use client";

import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Upload,
    message,
    Card,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import BlogPreview from "./blogpreview";
import { createBlog, updateBlog } from "../../api/apiRoutes";

const AddBlogPage = ({ getFormData, editRecord }) => {
    const [form] = Form.useForm();
    const editorRef = useRef(null);

    const [imageFileList, setImageFileList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const isEdit = !!editRecord?._id;

    const setFormDataFunction = (data) => {
        getFormData(data);
    };
    const [formData, setFormData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempData, setTempData] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        let payload = {
            seoTitle: values?.seoTitle,
            seoDescription: values?.seoDescription,
            seoKeywords: values?.seoKeywords,
            blogTitle: values?.blogTitle,
            blogContent: values?.blogContent,
            blogImage: values?.blogImage,
        };

        let response = null;
        try {
            if (editRecord) {
                response = await createBlog(payload);
            } else {
                response = await updateBlog(payload);
            }

            if (resDesignPage?.data?.success) {
                messageApi.success(resDesignPage?.data?.message);
                isDesignPageSuccess = true;
            } else {
                messageApi.error(resDesignPage?.data?.message);
            }
            if (resDesignDetailPage?.data?.success) {
                messageApi.success(resDesignDetailPage?.data?.message);
                isDesignDetailPageSuccess = true;
            } else {
                messageApi.error(resDesignDetailPage?.data?.message);
            }
            if (isDesignPageSuccess && isDesignDetailPageSuccess) {
                setFormDataFunction({ success: true });
                form.resetFields();
                setImageFileList([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePreview = async (file) => {
        const values = form.getFieldsValue(true);
        setTempData(values);
        showModal();
    };

    useEffect(() => {
        if (editRecord) {
            // Convert URLs to UploadFile objects for AntD Upload

            const imageFileList = editRecord.blogImage
                ? [
                      {
                          uid: "-2",
                          name: editRecord.blogImage.split("/").pop(),
                          status: "done",
                          url: editRecord.blogImage,
                      },
                  ]
                : [];

            setImageFileList(imageFileList);

            // Set form values
            form.setFieldsValue({
                seoTitle: editRecord.seoTitle,
                seoDescription: editRecord.seoDescription,
                seoKeywords: editRecord.seoKeywords,
                blogTitle: editRecord.blogTitle,
                blogContent: editRecord.blogContent,
                blogImage: editRecord.blogImage,
            });
        } else {
            form.resetFields();
            setImageFileList([]);
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
                name="addblog"
                layout="vertical"
                onFinish={onFinish}
            >
                <Card title="SEO Block">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="seoTitle"
                                label="Title for SEO"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter SEO title",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter title for SEO" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="seoDescription"
                                label="Description for SEO"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter SEO description",
                                    },
                                ]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="seoKeywords"
                                label="Keywords for SEO"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter SEO keywords",
                                    },
                                ]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input.TextArea rows={3} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card title="Content Block" style={{ marginTop: 20 }}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="blogTitle"
                                label="Blog Title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter blog title",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter blog title" />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item
                                label="Blog Image"
                                name="blogImage"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please upload an image",
                                    },
                                ]}
                                getValueFromEvent={(e) => {
                                    if (
                                        !e ||
                                        !e.fileList ||
                                        e.fileList.length === 0
                                    )
                                        return null;
                                    // pick the URL of the first uploaded file
                                    return (
                                        e.fileList[0].response?.uploaded?.[0]
                                            ?.url || null
                                    );
                                }}
                            >
                                <Upload
                                    name="blogImage"
                                    listType="picture-card"
                                    data={{ folder: "blog" }}
                                    action="/api/admin/upload"
                                    fileList={imageFileList}
                                    onChange={(info) => {
                                        setImageFileList(info.fileList);

                                        if (info.file.status === "done") {
                                            if (info.file.response?.success) {
                                                messageApi.success(
                                                    info.file.response.message,
                                                );
                                            } else {
                                                messageApi.error(
                                                    "Upload failed",
                                                );
                                            }
                                        } else if (
                                            info.file.status === "error"
                                        ) {
                                            messageApi.error(
                                                "Image upload failed",
                                            );
                                        }
                                    }}
                                >
                                    {imageFileList.length >= 1 ? null : (
                                        <>
                                            <button
                                                style={{
                                                    border: 0,
                                                    background: "none",
                                                }}
                                                type="button"
                                            >
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>
                                                    Upload
                                                </div>
                                            </button>
                                        </>
                                    )}
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="blogContent"
                                label="Content"
                                initialValue=""
                                rules={[
                                    {
                                        required: true,
                                        message: "Content is required",
                                    },
                                ]}
                                trigger="onEditorChange"
                                valuePropName="value"
                                getValueFromEvent={(content) => content} // content is string
                                style={{ marginBottom: 0 }}
                            >
                                <Editor
                                    apiKey={
                                        process.env.NEXT_PUBLIC_TINYMCE_API_KEY
                                    }
                                    onInit={(evt, editor) =>
                                        (editorRef.current = editor)
                                    }
                                    init={{
                                        height: 400,
                                        menubar: true,
                                        plugins:
                                            "advlist autolink lists link image charmap preview anchor " +
                                            "searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                                        toolbar:
                                            "undo redo | formatselect | bold italic underline | " +
                                            "alignleft aligncenter alignright alignjustify | " +
                                            "bullist numlist outdent indent | link image media | preview code",
                                        images_upload_handler: async (
                                            blobInfo,
                                        ) => {
                                            const formData = new FormData();
                                            formData.append(
                                                "file",
                                                blobInfo.blob(),
                                            );

                                            const res = await fetch(
                                                "/api/uploadImage",
                                                {
                                                    method: "POST",
                                                    body: formData,
                                                },
                                            );

                                            const data = await res.json();
                                            return data.url;
                                        },
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        {/* ================= ACTION BUTTONS ================= */}
                    </Row>
                </Card>
                <Row justify="end" gutter={16} style={{ marginTop: 20 }}>
                    <Col span={24}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: 12,
                                }}
                            >
                                <Button>Save Draft</Button>
                                <Button type="primary" onClick={handlePreview}>
                                    Preview
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={1280}
                className="blog-modal"
            >
                <BlogPreview border data={tempData} />
            </Modal>
        </>
    );
};
export default AddBlogPage;
