import { prisma } from "@/lib/db";
import styles from "./page.module.css";
import CreateCommentForm from "@/components/CreateCommentForm";

export default async function Post({
    params: { postid },
}: {
    params: { postid: string };
}) {
    const post = await prisma.post.findUnique({
        where: {
            id: postid,
        },
    });
    const comments = await prisma.comment.findMany({
        where: {
            postId: postid,
        },
        select: {
            text: true,
            user: {
                select: {
                    name: true,
                },
            },
        },
    });
    if (!post) {
        return (
            <main>
                <h1 className={styles["header"]}>This post does not exist</h1>
            </main>
        );
    }
    return (
        <main>
            <h1 className={styles["header"]}>{post.title}</h1>
            <p className={styles["date"]}>
                Created At: {post.createdAt.toISOString()}
            </p>
            <p className={styles["content"]}>{post.content}</p>

            <h1 className={styles["header"]}>Comments</h1>
            <CreateCommentForm postid={postid} />
            <section className={styles["comments"]}>
                {comments.map((comment,index) => (
                    <div className={styles["comment"]} key={index}>
                        <h2>By {comment.user.name}</h2>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}
