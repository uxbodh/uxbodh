import {
    EditOutlined,
    EyeOutlined,
    HighlightOutlined,
    HomeOutlined,
    PlusOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu, Layout, theme } from "antd";
import { useRouter, usePathname } from "next/navigation";

const { Sider } = Layout;

const AdminSidebar = ({ collapsed }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const router = useRouter();
    const pathname = usePathname();

    return (
        <>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={260}
                collapsedWidth={80}
                style={{
                    padding: 20,
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[pathname]}
                    onClick={({ key }) => router.push(key)}
                    items={[
                        {
                            key: "/dashboard",
                            icon: <HomeOutlined />,
                            label: "Home",
                        },
                        {
                            key: "/admin/users",
                            icon: <UserOutlined />,
                            label: "Users",
                        },
                        {
                            key: "blog",
                            icon: <EditOutlined />,
                            label: "Blogs",
                            children: [
                                {
                                    key: "/admin/blogs/addBlog",
                                    icon: <PlusOutlined />,
                                    label: "Add Blog",
                                },
                                {
                                    key: "/admin/blogs",
                                    icon: <EyeOutlined />,
                                    label: "View Blogs",
                                },
                            ],
                        },
                        {
                            key: "/admin/upload/sample",
                            icon: <UploadOutlined />,
                            label: "Slider Image",
                        },
                        {
                            key: "/admin/upload/design",
                            icon: <UploadOutlined />,
                            label: "Design Page",
                        },
                    ]}
                />
            </Sider>
        </>
    );
};

export default AdminSidebar;
