"use client";

import {
    LogoutOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { logoutDashboard } from "../api/apiRoutes";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await logoutDashboard();
        router.push("/login"); // ⬅️ redirect
        router.refresh(); // 🔁 middleware re-run
    };

    return (
        <Button
            type="link"
            icon={<LogoutOutlined />}
            style={{ float: "right", margin: "15px 12px" }}
            onClick={handleLogout}
        >
            Logout
        </Button>
    );
};

export default LogoutButton;
