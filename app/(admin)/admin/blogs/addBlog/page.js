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
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { UploadOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import BlogPreview from "../blogpreview";

const AddBlog = () => {
    const [form] = Form.useForm();
    const editorRef = useRef(null);
    const [formData, setFormData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempData, setTempData] = useState(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        setFormData(values);
        let payload = {
            seoTitle: values?.seoTitle,
            seoDescription: values?.seoDescription,
            seoKeywords: values?.seoKeywords,
            title: values?.title,
            content: values?.content,
            blogImage: values?.blogImage,
        }
        messageApi.success("Blog data captured successfully");
    };

    const handlePreview = async (file) => {
        const values = form.getFieldsValue(true);
        setTempData(values);
        showModal();
    };
    return (
        <>
            {contextHolder}
            <div className="pageTitle">Add Blog</div>
            <Form
                form={form}
                name="addblog"
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={16}>
                    {/* ================= SEO BLOCK ================= */}
                    <Col span={24}>
                        <div className="sectionTitle">SEO Block</div>
                    </Col>

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
                        >
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Col>

                    {/* ================= CONTENT BLOCK ================= */}
                    <Col span={24}>
                        <div className="sectionTitle">Content Block</div>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            name="title"
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
                            name="blogImage"
                            label="Image"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) return e;
                                return e?.fileList;
                            }}
                        >
                            <Upload
                                name="file" // MUST match formidable field
                                listType="picture"
                                maxCount={1}
                                action="/api/admin/uploadImage"
                                folder="blog"
                                onChange={(info) => {
                                    if (info?.file?.status === "done") {
                                        if (info?.file?.response?.success) {
                                            messageApi.success(
                                                info?.file?.response?.message,
                                            );
                                        } else {
                                            messageApi.error("Upload failed");
                                        }
                                    }
                                    if (info?.file?.status === "error") {
                                        messageApi.error("Image upload failed");
                                    }
                                }}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="content"
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
                        >
                            <Editor
                                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
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
                                    images_upload_handler: async (blobInfo) => {
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
                    <Col span={24}>
                        <Form.Item>
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
                width="1280px"
                className="blog-modal"
            >
                <BlogPreview border data={tempData} />
            </Modal>
        </>
    );
};
export default AddBlog;
