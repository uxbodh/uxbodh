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
import {
    MinusCircleOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
    createDesignPage,
    createDesignDetailPage,
    updateDesignPage,
    updateDesignDetailPage,
} from "../../../api/apiRoutes";

const AddDesignImage = ({ getFormData, editRecord }) => {
    const [form] = Form.useForm();
    const editorRef = useRef(null);

    const [imageFileList, setImageFileList] = useState([]);
    const [pageImageList, setPageImageList] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const isEdit = !!editRecord?._id;

    const setFormDataFunction = (data) => {
        getFormData(data);
    };

    const onFinish = async (values) => {

        let isDesignPageSuccess = null;
        let isDesignDetailPageSuccess = null;
        let resDesignPage = null;
        let resDesignDetailPage = null;

        let payloadDesignPage = {
            heading: values?.heading,
            subHeading: values?.subHeading,
            mainImage: values?.mainImage,
        };

        let payloadDesignDetailPage = {
            slug: resDesignPage?.data?.data?.slug,
            imageList: values?.imageList,
            sections: values?.sections,
        };

        try {
            if (editRecord) {
                resDesignPage = await updateDesignPage(
                    payloadDesignPage,
                    editRecord?._id,
                );
                resDesignDetailPage = await updateDesignDetailPage(
                    {
                        slug: resDesignPage?.data?.data?.slug,
                        imageList: 
                            pageImageList?.map((item) => item?.url),
                        sections: values?.sections,
                    },
                    editRecord?._id,
                );
            } else {
                resDesignPage = await createDesignPage(payloadDesignPage);
                payloadDesignDetailPage.slug = resDesignPage?.data?.data?.slug;
                resDesignDetailPage = await createDesignDetailPage(payloadDesignDetailPage);
                
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

    useEffect(() => {
        if (editRecord) {
            // Convert URLs to UploadFile objects for AntD Upload

            const imageFileList = editRecord.mainImage
                ? [
                      {
                          uid: "-2",
                          name: editRecord.mainImage.split("/").pop(),
                          status: "done",
                          url: editRecord.mainImage,
                      },
                  ]
                : [];

            const pageImageFileList = editRecord.imageList?.length
                ? editRecord.imageList.map((img, index) => ({
                      uid: `-${index + 2}`,
                      name: img.split("/").pop(),
                      status: "done",
                      url: img,
                  }))
                : [];

            setImageFileList(imageFileList);
            setPageImageList(pageImageFileList);

            // Set form values
            form.setFieldsValue({
                heading: editRecord.heading,
                subHeading: editRecord.subHeading,
                mainImage: editRecord.mainImage,
                imageList: pageImageFileList,
                sections: editRecord.sections,
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
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Card title="Design Page" style={{ marginTop: 20 }}>
                    <Row gutter={20}>
                        <Col span={16}>
                            <Form.Item
                                label="Heading"
                                name="heading"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter heading",
                                    },
                                ]}
                            >
                                <Input placeholder="Heading" />
                            </Form.Item>
                            <Form.Item
                                label="Sub Heading"
                                name="subHeading"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter sub heading",
                                    },
                                ]}
                                style={{ marginBottom: 0 }}
                            >
                                <Input placeholder="Heading" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Main Image"
                                name="mainImage"
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
                                style={{ marginBottom: 0 }}
                            >
                                <Upload
                                    name="mainImage"
                                    listType="picture-card"
                                    data={{ folder: "design" }}
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
                    </Row>
                </Card>
                <Card title="Design Details Page" style={{ marginTop: 20 }}>
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.List name="sections">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name }) => (
                                            <Card
                                                key={key}
                                                style={{ marginBottom: 16 }}
                                                title={`Section ${name + 1}`}
                                                extra={
                                                    <MinusCircleOutlined
                                                        onClick={() =>
                                                            remove(name)
                                                        }
                                                        style={{
                                                            color: "red",
                                                            fontSize: 18,
                                                        }}
                                                    />
                                                }
                                            >
                                                {/* Heading */}
                                                <Form.Item
                                                    label="Heading"
                                                    name={[name, "heading"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Heading required",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Heading" />
                                                </Form.Item>

                                                {/* Subheading */}
                                                <Form.Item
                                                    label="Subheading"
                                                    name={[name, "subheading"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Subheading required",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="Subheading" />
                                                </Form.Item>

                                                {/* Content (TinyMCE) */}
                                                <Form.Item
                                                    label="Content"
                                                    name={[name, "content"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Content required",
                                                        },
                                                    ]}
                                                    trigger="onEditorChange"
                                                    valuePropName="value"
                                                    getValueFromEvent={(
                                                        content,
                                                    ) => content}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <Editor
                                                        apiKey={
                                                            process.env
                                                                .NEXT_PUBLIC_TINYMCE_API_KEY
                                                        }
                                                        onInit={(evt, editor) =>
                                                            (editorRef.current =
                                                                editor)
                                                        }
                                                        init={{
                                                            height: 300,
                                                            menubar: false,
                                                            plugins:
                                                                "advlist autolink lists link image charmap preview anchor " +
                                                                "searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
                                                            toolbar:
                                                                "undo redo | formatselect | bold italic underline | forecolor backcolor | " +
                                                                "alignleft aligncenter alignright alignjustify | ",
                                                            images_upload_handler:
                                                                async (
                                                                    blobInfo,
                                                                ) => {
                                                                    const formData =
                                                                        new FormData();
                                                                    formData.append(
                                                                        "file",
                                                                        blobInfo.blob(),
                                                                    );

                                                                    const res =
                                                                        await fetch(
                                                                            "/api/uploadImage",
                                                                            {
                                                                                method: "POST",
                                                                                body: formData,
                                                                            },
                                                                        );

                                                                    const data =
                                                                        await res.json();
                                                                    return data.url;
                                                                },
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Card>
                                        ))}

                                        {/* Add Button */}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                icon={<PlusOutlined />}
                                            >
                                                Add Section
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Image"
                                name="imageList"
                                getValueFromEvent={(e) => {
                                    if (!e?.fileList) return [];
                                    return e.fileList
                                        .filter((f) => f.status === "done")
                                        .map(
                                            (f) =>
                                                f.response?.uploaded?.[0]
                                                    ?.url || null,
                                        )
                                        .filter(Boolean);
                                }}
                            >
                                <Upload
                                    action="/api/admin/upload"
                                    listType="picture"
                                    multiple
                                    data={{ folder: "design" }}
                                    fileList={pageImageList}
                                    onChange={(info) => {
                                        setPageImageList(info.fileList);

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
                                    <Button icon={<UploadOutlined />}>
                                        Upload Image
                                    </Button>
                                </Upload>
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
                </Card>
            </Form>
        </>
    );
};
export default AddDesignImage;
