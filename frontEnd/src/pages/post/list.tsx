import { useEffect, useRef, useState } from "react";
import type { Post } from "./types";

const limit = 5 as const;

export default function PostList({ postToAdd }: { postToAdd: Post | null }) {
	const [offset, setOffset] = useState(0);
	const [posts, setPosts] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const isMountedRef = useRef(false);

	useEffect(() => {
		if (!postToAdd) return;

		// eslint-disable-next-line react-hooks/set-state-in-effect
		setPosts(prev => [postToAdd, ...prev]);
	}, [postToAdd]);

	useEffect(() => {
		if (!isMountedRef.current) {
			isMountedRef.current = true;
			return;
		}

		async function fetchPosts() {
			const response: Post[] = await fetch(
				`http://localhost:3000/post?offset=${offset}&limit=${limit}&user_id=4`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" }
				}
			).then(res => res.json());

			setIsLoading(false);
			setPosts(prev => [...prev, ...response]);
		}

		fetchPosts();
	}, [offset]);

	if (isLoading) return "Loading...";

	console.log(posts)

	return (
		<div className="flex flex-col gap-2">
			{posts.map(post => (
				<div key={post.id}>{post.content}</div>
			))}

			<button type="button" onClick={() => setOffset(prev => prev + limit)}>
				Load more...
			</button>
		</div>
	);
}
