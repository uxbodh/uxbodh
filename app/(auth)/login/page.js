"use client";
import { useState } from "react";
import LoginForm from "./loginForm";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    
    const router = useRouter();

    const [formData, setFormData] = useState(null);
    
    const getFormData = (data) => {
        setFormData(data);
        if(data?.success) {
            router.push("/dashboard");
        }
    };
    
    return (
        <>
            <LoginForm getFormData={getFormData} />
        </>
    );
};
export default LoginPage;
