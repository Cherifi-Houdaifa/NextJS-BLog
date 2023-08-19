import styles from "./page.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
    return <main>Hello world</main>;
}
