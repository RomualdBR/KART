import { useState } from "react";
import useSWR from "swr";
import type { Post } from "./types";

const initialLimit = 5;

export default function PostList() {
	const [limit, setLimit] = useState(initialLimit);

	const { data: posts, isLoading } = useSWR<Post[]>(
		`http://localhost:3000/post?limit=${limit}`,
		url => fetch(url).then(res => res.json()),
		{ keepPreviousData: true }
	);

	if (isLoading || !posts) return "Loading...";

	return (
		<div className="flex flex-col gap-2">
			{posts.map(post => (
				<div key={post.id}>{post.content}</div>
			))}

			<button
				type="button"
				onClick={() => setLimit(prev => prev + initialLimit)}
			>
				Load more...
			</button>
		</div>
	);
}
