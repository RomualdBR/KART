import { useState } from "react";
import { mutate } from "swr";
import { useAuth } from "../../utils/context";

export default function PostForm() {
	const [error, setError] = useState("");
	const { token } = useAuth();

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
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ content })
		}).then(res => res.json());

		mutate(
			key =>
				typeof key === "string" && key.startsWith("http://localhost:3000/post")
		);
	}

	return (
		<div className="bg-white rounded-xl shadow-md p-6 mb-6">
			<div className="flex items-start gap-4">
				<form action={createPost} className="flex-1">
					<textarea
						name="content"
						className="w-full border-2 border-gray-200 rounded-lg p-4 text-gray-800 resize-none transition-colors"
						rows={3}
					/>
					{error && (
						<p className="text-red-500 text-sm mt-2">{error}</p>
					)}

					<div className="flex mt-4">
						<button
							type="submit"
							className="px-6 py-2 bg-blue text-white font-medium rounded-lg"
						>
							Publier
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
