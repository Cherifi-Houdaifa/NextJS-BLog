import styles from "./page.module.css";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import CreatePostForm from "@/components/CreatePostForm";

export default async function New() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <main className={styles["main"]}>
                <h1>You are not signed in</h1>
                <h1>You can't create a post</h1>
                <p>
                    Signin <Link href="/api/auth/signin">here</Link>
                </p>
            </main>
        );
    }
    return (
        <main className={styles["main"]}>
            <h1>Create a blog post</h1>
            <CreatePostForm className={styles["form"]} />
        </main>
    );
}
