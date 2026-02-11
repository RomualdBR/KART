import { useState } from "react";
import useSWR from "swr";
import type { Post } from "./types";
import PostCard from "../../components/post_card";

const initialLimit = 5;

export default function PostList() {
	const [limit, setLimit] = useState(initialLimit);

	const { data: posts, isLoading } = useSWR<Post[]>(
		`http://localhost:3000/post?limit=${limit}`,
		url => fetch(url).then(res => res.json()),
		{ keepPreviousData: true }
	);

	console.log("Fetched posts:", posts);

	const distributeIntoColumns = (items: Post[]) => {
		const columns: Post[][] = [[], [], []];
		items.forEach((item, index) => {
			columns[index % 3].push(item);
		});
		return columns;
	};

	const columns = distributeIntoColumns(posts || []);

	if (isLoading || !posts) return <div className="text-xl text-gray-500">Loading... 🥝</div>;

	return (
		<div className="w-full">
			<div className="grid grid-cols-3 gap-4 lg:gap-6">
				{columns.map((column, colIndex) => (
					<div key={colIndex} className="flex flex-col gap-4 lg:gap-6">
						{column.map((post) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				))}
			</div>

			<div className="flex justify-center mt-8">
				<button
					type="button"
					onClick={() => setLimit(prev => prev + initialLimit)}
				>
					Load more...
				</button>
			</div>
		</div>
	);
}

