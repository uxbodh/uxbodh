import { Button, Card } from "antd";
import Link from "next/link";

const BlogList = () => {
    return (
        <>
            <Card
                title="Blog List"
                extra={
                    <Link href="/admin/blogs/addBlog">
                        <Button type="primary">Add Blog</Button>
                    </Link>
                }
            />
        </>
    );
};
export default BlogList;
