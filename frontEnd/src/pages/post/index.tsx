import { useState } from "react";
import PostForm from "./form";
import PostList from "./list";
import type { Post } from "./types";

export default function Post() {
	const [postToAdd, setPostToAdd] = useState<Post | null>(null);

	return (
		<>
			<h1>Posts Page</h1>
			<PostForm setPostToAdd={setPostToAdd} />
			<PostList postToAdd={postToAdd} />
		</>
	);
}
