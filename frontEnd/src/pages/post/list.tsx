import { useEffect, useState } from "react";

type Post = {id: number; content: string }

export default function PostList() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchPosts() {
			const response: Post[] = await fetch(`http://localhost:3000/post`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => res.json())
				.finally(() => setIsLoading(false));

			setPosts(response);
		}

		fetchPosts();
	}, []);

    if (isLoading) return "Loading..."

	return (
		<div className="flex flex-col gap-2">
			{posts.map(post => (
				<div key={post.id}>{post.content}</div>
			))}
		</div>
	);
}
