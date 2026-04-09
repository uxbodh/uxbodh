"use client";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Space, theme } from "antd";
import LogoutButton from "./logout";
import { useUser } from "@/app/context/userContext";

const { Header, colorBgContainer } = Layout;
const AdminHeader = ({ collapsed, setCollapsed }) => {

    const { user, loading } = useUser();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    if (loading) return null;

    console.log('user',user)

    return (
        <>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <div>
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 44,
                            height: 44,
                            margin: "10px 20px",
                        }}
                    />
                    <Avatar icon={<UserOutlined />} /> <b>{user?.fullName}</b>
                    <LogoutButton />
                </div>
            </Header>
        </>
    );
};

export default AdminHeader;
