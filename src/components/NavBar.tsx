"use client"

import styles from "./NavBar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function NavBar() {
    const {data: session, status} = useSession()

    return (
        <nav className={styles["nav"]}>
            <div className={styles["links"]}>
                <Link href="#">Home</Link>
                <Link href="#">Blog</Link>
                <Link href="#">Profile</Link>
                <Link href="#">About</Link>
            </div>
            <div className={styles["data"]}>
                {session ? (
                    <>
                        <Image
                            className={styles["profile-pic"]}
                            src={session.user.image as string}
                            alt="User profile picture"
                            width={60}
                            height={60}
                        />
                        <p>{session.user.name}</p>
                        <Link href="/api/auth/signout">Signout</Link>
                        <Link href="#">Create a post</Link>
                    </>
                ) : (
                    <>
                        <Link href="/api/auth/signin">Signin</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
