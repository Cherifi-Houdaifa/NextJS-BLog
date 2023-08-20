"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { signOut } from "next-auth/react";

export default function ChangeUsernameForm({className}: {className: string}) {
    const [isLoading, setIsLoading] = useState(false);

    const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements.item(0) as HTMLInputElement;
        const newUsername = input.value;
        if (newUsername.length === 0) {
            return;
        }
        setIsLoading(true);
        const response = await fetch("/api/new-username", {
            method: "POST",
            body: JSON.stringify({
                newUsername,
            }),
        });
        setIsLoading(false);
        if (response.status === 200) {
            await signOut();
        }
    };

    return (
        <form onSubmit={formSubmitHandler} className={className}>
            <input type="text" placeholder="New Username" name="newUsername" autoComplete="off"/>
            {isLoading ? (
                <button type="submit" disabled={true}>
                    Loading...
                </button>
            ) : (
                <button type="submit">Change</button>
            )}
        </form>
    );
}
