import PostForm from "./form";
import PostList from "./list";
import type { Post } from "./types";

export default function Post() {
	return (
		<>
			<h1>Posts Page</h1>
			<PostForm  />
			<PostList />
		</>
	);
}
