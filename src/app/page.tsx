import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {
    return <main className={styles["main"]}>
        <h1>Welcome to Blog</h1>
        <p>with Blog you can post any articles you want about various topics...</p>
        <Link href="#">See the posts</Link>
    </main>;
}
