import { useState } from "react";
import { mutate } from "swr";

export default function PostForm() {
	const [error, setError] = useState("");

	async function createPost(formData: FormData) {
		"use server";

		const content = formData.get("content");

		// Check if content is a string and is not empty
		if (typeof content !== "string" || !content) {
			setError("Invalid content");
			return;
		}

		await fetch(`http://localhost:3000/post`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("jwt")}`
			},
			body: JSON.stringify({ content })
		}).then(res => res.json());

		mutate(
			key =>
				typeof key === "string" && key.startsWith("http://localhost:3000/post")
		);
	}

	return (
		<form action={createPost} className="flex gap-3 items-end">
			<div className="flex flex-col ">
				<textarea name="content" className="border p-1" />
				{error && <span>{error}</span>}
			</div>

			<button type="submit" className="h-min">
				Kart
			</button>
		</form>
	);
}
