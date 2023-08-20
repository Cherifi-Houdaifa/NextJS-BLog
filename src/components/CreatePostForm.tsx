"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostForm({ className }: { className: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const titleInput = e.currentTarget.elements.item(0) as HTMLInputElement;
        const contentInput = e.currentTarget.elements.item(
            1
        ) as HTMLTextAreaElement;

        const title = titleInput.value;
        const content = contentInput.value;

        if (title.length === 0 || content.length === 0) {
            return;
        }
        setIsLoading(true);
        const response = await fetch("/api/new-post", {
            method: "POST",
            body: JSON.stringify({
                title,
                content,
            }),
        });
        setIsLoading(false);
        if (response.status === 200) {
            titleInput.value = "";
            contentInput.value = "";

            router.refresh();
            alert("You have created the blog post successfully");
        }
    };
    return (
        <form className={className} onSubmit={formSubmitHandler}>
            <input type="text" name="title" placeholder="Title" />
            <textarea
                name="content"
                cols={30}
                rows={10}
                placeholder="Content"
            ></textarea>
            {isLoading ? (
                <button type="submit" disabled>
                    Loading...
                </button>
            ) : (
                <button type="submit">Create post</button>
            )}
        </form>
    );
}
