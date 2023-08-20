import { prisma } from "@/lib/db";
import styles from "./page.module.css";
import Link from "next/link";

export const revalidate = 0

export default async function Blog() {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
        },
    });
    return (
        <main>
            <h1 className={styles["header"]}>Blog Posts</h1>
            <section className={styles["posts"]}>
                {posts.map((post, index) => (
                    <div className={styles["post"]} key={index}>
                        <Link href={`/blog/${post.id}`}>
                            <h3>{post.title}</h3>
                        </Link>

                        <h4 className={styles["date"]}>
                            Created At: {post.createdAt.toISOString()}
                        </h4>
                    </div>
                ))}
            </section>
        </main>
    );
}
