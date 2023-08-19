"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCommentForm({ postid }: { postid: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements.item(0) as HTMLInputElement;
        const text = input.value;
        if (text.length === 0) {
            return;
        }
        setIsLoading(true)
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({
                text,
                postid,
            }),
        });
        setIsLoading(false)
        if (response.status === 200) {
            // success
            input.value = "";
            router.refresh();
        }
    };

    return (
        <form onSubmit={formSubmitHandler}>
            <input type="text" name="text" />
            <button type="submit" disabled={isLoading}>{isLoading ? "Loading...": "Create Comment"}</button>
        </form>
    );
}
