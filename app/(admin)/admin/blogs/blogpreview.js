import { getReadingTime } from "@/app/utils/readingTime";
import { sanitizeHtml } from "@/app/utils/sanitizeHtml";
// import { BookOpen, Calendar } from "lucide-react";
import { BookOutlined, CalendarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/userContext";
import dayjs from "dayjs";

const BlogPreview = ({ data }) => {
    const [content, setContent] = useState("");

    const { user, loading } = useUser();

    if (loading) return null;

    useEffect(() => {
        const clean = sanitizeHtml(data?.content || "");
        setContent(clean);
    }, [data]);

    const readingTime = getReadingTime(content);

    const imageUrl = data?.blogImage?.[0]?.response?.url;

    return (
        <>
            <div
                className="blogPreviewWrapper"
                style={{ display: "inline-block" }}
            >
                <h1>{data?.title}</h1>
                <div className="blog-info">
                    <div>
                        <div className="author">
                            {user?.fullName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="marginRight">{user?.fullName}</div>
                    <div>
                        <CalendarOutlined size={18} />
                    </div>
                    <div className="marginRight">
                        {dayjs().format("DD-MM-YYYY")}
                    </div>
                    <div className="reading-time">
                        <BookOutlined size={18} />
                    </div>
                    <div className="marginRight">{readingTime}</div>
                </div>
                <div style={{ marginTop: 40 }}>
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={imageUrl}
                            style={{ borderRadius: 12 }}
                        />
                    )}
                </div>
                <div style={{ marginTop: 30 }}>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </>
    );
};
export default BlogPreview;
