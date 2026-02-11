import type { Post } from "./types";

export default function PostCard({ post }: { post: Post }) {
	return (
		<div className="bg-white rounded-xl shadow-md overflow-hidden">
			<div className="p-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div
						className={`w-12 h-12 rounded-full  bg-green-600 flex items-center justify-center text-white font-bold text-lg`}
					>
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

			<div className={`w-full h-20 bg-linear-to-br bg-green-200`}>
				<div className="w-full h-full flex items-center justify-center text-white text-6xl opacity-20">
					🥝
				</div>
			</div>
		</div>
	);
}
