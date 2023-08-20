import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import styles from "./page.module.css"
import ChangeUsernameForm from "@/components/ChangeUsernameForm";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return (
            <main className={styles["main"]}>
                <h1 className={styles["header"]}>You are not signed in</h1>
                <Link href="/api/auth/signin">Signin?</Link>
            </main>
        );
    }
    return (
        <main>
            <h1 className={styles["header"]}>Hello {session.user.name}</h1>
            <h3 className={styles["mini-header"]}>Change Your Username</h3>
            <ChangeUsernameForm className={styles["main"]}/>
            <h4 className={styles["mini-header"]}>Note: You will get logged out</h4>
        </main>
    );
}
