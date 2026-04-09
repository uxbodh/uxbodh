import "./auth.scss";
export const metadata = {
    title: "UX Health | Auth",
};

export default function AuthLayout({ children }) {
    return (
        <div className="auth-layout" style={{minHeight: "100vh", background: "#ECF1F7"}}>
            {children}
        </div>
    );
}