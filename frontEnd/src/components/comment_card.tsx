import type { Comment } from "../types/comment";
export default function CommentCard({ comment }: { comment: Comment }) {
    return (
        <div className="p-4">
            <div className="flex items-center gap-2">
                <p className="text-sm text-bold text-gray-900 text-xl">{comment.pseudo}</p>
                <p className="text-sm text-gray-500">{comment.created_at}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500">{comment.content}</p>
            </div>
        </div>
    )
}