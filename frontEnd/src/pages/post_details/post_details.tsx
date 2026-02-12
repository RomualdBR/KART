import { useParams } from "react-router-dom";
import Header from "../../components/header";
import PostCard from "../../components/post_card";
import { useAuth } from "../../utils/context";
import { useState, useEffect, useCallback } from "react";
import CommentCard from "../../components/comment_card";
import type { Comment } from "../../types/comment";
import type { Post } from "../post/types";

export default function PostDetails() {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { id } = useParams();

  const fetchPost = useCallback(async () => {
    setIsLoading(true);

    const post = await fetch(`http://localhost:3000/post/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .finally(() => setIsLoading(false));

    setPost(post);
  }, [id, token]);

  async function createComment(formData: FormData) {
    "use server";
    const content = formData.get("comment_content");
    const post_id = id;

    await fetch(`http://localhost:3000/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, post_id }),
    });

    const updateComments = await getComments();
    setComments(updateComments);
  }

  async function getComments() {
    "use server";
    const comments: Comment[] = await fetch(
      `http://localhost:3000/comment?post_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    ).then((res) => res.json());
    return comments;
  }

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments();
      setComments(comments);
    };
    fetchComments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return <div className="text-xl text-neutral-500">Loading... 🥝</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {post && <PostCard key={post.id} post={post} />}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800 p-4">Commentaires</h2>

          {comments.map((comment) => (
            <div key={comment.id}>
              <CommentCard comment={comment} />
            </div>
          ))}

          <div className="p-4">
            <form action={createComment} className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="comment_content"
                  className="w-full border-2 border-gray-200 rounded-lg p-4 text-gray-800 resize-none transition-colors"
                  placeholder="Ajouter un commentaire"
                />
                <button
                  type="submit"
                  className="bg-blue text-white font-medium rounded-lg"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
