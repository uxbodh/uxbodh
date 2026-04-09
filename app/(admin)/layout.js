"use client";

import { Layout, theme } from "antd";
import { useState } from "react";
import AdminSidebar from "./components/sidebar";
import AdminHeader from "./components/header";
import "@/app/common.scss";
import { UserProvider } from "@/app/context/userContext";

const { Content } = Layout;

export default function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <UserProvider>
        <Layout style={{ minHeight: "100vh" }}>
            <AdminSidebar collapsed={collapsed} />
            <Layout style={{background: "#E2E8F0"}}>
                <AdminHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />
                <Content
                    style={{
                        margin: 24,
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
        </UserProvider>
    );
}
