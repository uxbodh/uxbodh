"use client";
import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Row,
    Upload,
    message,
    Space,
} from "antd";
import { CheckCircleOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
    createSampleImageUpload,
    updateSampleImageUpload,
} from "../../../api/apiRoutes";

const AddSampleImage = ({ getFormData, editRecord }) => {
    const [form] = Form.useForm();
    const editorRef = useRef(null);

    const [thumbFileList, setThumbFileList] = useState([]);
    const [imageFileList, setImageFileList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    console.log("editRecord", editRecord);
    const isEdit = !!editRecord?._id;

    const setFormDataFunction = (data) => {
        getFormData(data);
    };

    const onFinish = async (values) => {
        console.log("Form Values:", values);
        let payload = {
            thumbnail: values?.thumbnail,
            image: values?.image,
            contentHeading: values?.contentHeading,
            content: values?.content,
            markerPostion: values?.markerPostion,
        };
        console.log("payload", payload);

        let response = null;

        try {
            if (editRecord) {
                response = await updateSampleImageUpload(
                    payload,
                    editRecord?._id,
                );
            } else {
                response = await createSampleImageUpload(payload);
            }

            if (response?.data?.success) {
                setFormDataFunction(response?.data);
                messageApi.success(response?.data?.message);
                form.resetFields();
                setThumbFileList([]);
                setImageFileList([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (editRecord) {
            // Convert URLs to UploadFile objects for AntD Upload
            const thumbFileList = editRecord.thumbnail
                ? [
                      {
                          uid: "-1", // unique id for react
                          name: editRecord.thumbnail.split("/").pop(),
                          status: "done",
                          url: editRecord.thumbnail,
                      },
                  ]
                : [];

            const imageFileList = editRecord.image
                ? [
                      {
                          uid: "-2",
                          name: editRecord.image.split("/").pop(),
                          status: "done",
                          url: editRecord.image,
                      },
                  ]
                : [];

            setThumbFileList(thumbFileList);
            setImageFileList(imageFileList);

            // Set form values
            form.setFieldsValue({
                thumbnail: editRecord.thumbnail,
                image: editRecord.image,
                contentHeading: editRecord.contentHeading,
                content: editRecord.content,
                markerPostion: editRecord.markerPostion,
                status: editRecord.status,
            });
        } else {
            form.resetFields();
            setThumbFileList([]);
            setImageFileList([]);
            form.setFieldsValue({
                status: true,
            });
        }
    }, [editRecord, form]);

    return (
        <>
            {contextHolder}
            <Card style={{ marginTop: 20 }}>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Row gutter={20}>
                        <Col span={12}>
                            <Form.Item
                                label="Thumbnail"
                                name="thumbnail"
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
                                    name="thumbnail"
                                    listType="picture-card"
                                    data={{ folder: "homepage-slider" }}
                                    action="/api/admin/upload"
                                    fileList={thumbFileList}
                                    onChange={(info) => {
                                        setThumbFileList(info.fileList);

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
                                    {thumbFileList.length >= 1 ? null : (
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
                        <Col span={12}>
                            <Form.Item
                                label="Image"
                                name="image"
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
                                    name="image"
                                    listType="picture-card"
                                    data={{ folder: "homepage-slider" }}
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
                            <Form.Item label="Marker Position">
                                <Form.List name="markerPostion">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(
                                                ({
                                                    key,
                                                    name,
                                                    ...restField
                                                }) => (
                                                    <Space
                                                        key={key}
                                                        style={{
                                                            display: "flex",
                                                            marginBottom: 8,
                                                            width: 520,
                                                        }}
                                                        align="baseline"
                                                    >
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                "topOffset",
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Missing top offset",
                                                                },
                                                            ]}
                                                            style={{
                                                                width: 246,
                                                            }}
                                                        >
                                                            <Input placeholder="Top offset" />
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[
                                                                name,
                                                                "leftOffset",
                                                            ]}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        "Missing left offset",
                                                                },
                                                            ]}
                                                            style={{
                                                                width: 246,
                                                            }}
                                                        >
                                                            <Input placeholder="Left offset" />
                                                        </Form.Item>
                                                        <MinusCircleOutlined
                                                            onClick={() =>
                                                                remove(name)
                                                            }
                                                        />
                                                    </Space>
                                                ),
                                            )}
                                            <Form.Item
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined />}
                                                >
                                                    Add Marker
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="contentHeading"
                                label="Content Heading"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter content heading",
                                    },
                                ]}
                            >
                                <Input placeholder="Content Heading" />
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
                                    apiKey={
                                        process.env.NEXT_PUBLIC_TINYMCE_API_KEY
                                    }
                                    onInit={(evt, editor) =>
                                        (editorRef.current = editor)
                                    }
                                    init={{
                                        height: 400,
                                        menubar: false,
                                        plugins:
                                            "advlist autolink lists link image charmap preview anchor " +
                                            "searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                                        toolbar:
                                            "undo redo | formatselect | bold italic underline | forecolor backcolor | " +
                                            "alignleft aligncenter alignright alignjustify | ",
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
                        <Col span={24}>
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </>
    );
};
export default AddSampleImage;
