import { Link } from "react-router-dom";
import type { Post } from "../pages/post/types";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/context";

export default function PostCard({
  post,
  onDelete,
  currentUserId,
}: {
  post: Post;
  onDelete?: (id: number) => void;
  currentUserId?: number;
}) {
  const { token } = useAuth();
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [likeCount, setLikeCount] = useState(0);

  const fetchLike = async () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => prev + (isLiked ? -1 : 1));

    await fetch(`http://localhost:3000/like/${post.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ like: !isLiked }),
    }).then((res) => res.json());
  };

  const fetchLikeNumber = async () => {
    const response = await fetch(`http://localhost:3000/post/${post.id}/like`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    setLikeCount(Number(response.likeCount) || 0);
  };

  useEffect(() => {
    fetchLikeNumber();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.user_id}`}>
            <div
              className={`w-12 h-12 rounded-full  bg-green-600 flex items-center justify-center text-white font-bold text-lg`}
            >
              K
            </div>
          </Link>
          <div>
            <Link to={`/profile/${post.user_id}`}>
              <h3 className="font-semibold text-gray-900">{post.pseudo}</h3>
            </Link>
            <p className="text-sm text-gray-500">{post.created_at}</p>
          </div>
        </div>
        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
          {post.user_id == currentUserId && onDelete ? (
            <button
              onClick={() => onDelete(post.id)}
              className="text-white text-xs font-bold hover:text-red-300"
            >
              ✖
            </button>
          ) : (
            <span className="text-white font-bold text-xs">🥝</span>
          )}
        </div>
      </div>

      <div className="px-4 pb-3">
        <p className="text-gray-700 leading-relaxed">{post.content}</p>
      </div>

      <div className={`w-full relative h-20 bg-linear-to-br bg-green-200`}>
        <div className="w-full h-full flex items-center justify-center text-white text-6xl opacity-20">
          🥝
        </div>
          <span
            onClick={fetchLike}
            className="absolute top-2 right-2 text-2xl cursor-pointer"
          >
            {likeCount} {isLiked ? "💚" : "🤍"}
          </span>
      </div>
    </div>
  );
}
