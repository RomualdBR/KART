import PostForm from "./form";
import PostList from "./list";

export default function Post() {
	return (
		<>
			<h1>Posts Page</h1>
			<PostForm />
            <PostList />
		</>
	);
}
