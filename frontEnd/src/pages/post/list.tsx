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

function PostCard({ post }: { post: Post }) {

	return (
		<div className="bg-white rounded-xl shadow-md overflow-hidden">
			<div className="p-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className={`w-12 h-12 rounded-full  bg-green-600 flex items-center justify-center text-white font-bold text-lg`}>
						K
					</div>
					<div>
						<h3 className="font-semibold text-gray-900">{post.pseudo}</h3>
						<p className="text-sm text-gray-500">{post.created_at}</p>
					</div>
				</div>
				<div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
					<span className="text-white font-bold text-xs">🥝</span>
				</div>
			</div>

			<div className="px-4 pb-3">
				<p className="text-gray-700 leading-relaxed">{post.content}</p>
			</div>

			<div className={`w-full h-20 bg-gradient-to-br bg-green-200`}>
				<div className="w-full h-full flex items-center justify-center text-white text-6xl opacity-20">
					🥝
				</div>
			</div>
		</div>
	);
}