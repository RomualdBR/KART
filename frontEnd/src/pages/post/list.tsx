import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "./types";
import PostCard from "../../components/post_card";

const limit = 5 as const;

export default function PostList({ postToAdd }: { postToAdd: Post | null }) {
	const [cursor, setCursor] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState<Post[]>([]);
	const isMountedRef = useRef(false);

	const fetchPosts = useCallback(async () => {
		const { posts, nextCursor }: { posts: Post[]; nextCursor: string } =
			await fetch(
				`http://localhost:3000/post/?cursor=${cursor}&limit=${limit}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				}
			).then(res => res.json());

		setIsLoading(false);
		setPosts(prev => [...prev, ...posts]);
		if (nextCursor) setCursor(nextCursor);
	}, [cursor]);

	useEffect(() => {
		if (!isMountedRef.current) {
			isMountedRef.current = true;
			return;
		}

		fetchPosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!postToAdd) return;

		setPosts(prev => [postToAdd, ...prev]);
	}, [postToAdd]);

	if (isLoading || !posts)
		return <div className="text-xl text-gray-500">Loading... 🥝</div>;

	return (
		<div className="w-full">
			<div className="grid grid-cols-3 gap-4 lg:gap-6">
				{posts.map(post => (
					<PostCard key={post.id} post={post} />
				))}
			</div>

			<div className="flex justify-center mt-8">
				<button type="button" onClick={fetchPosts}>
					Load more...
				</button>
			</div>
		</div>
	);
}
