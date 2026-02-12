import { useCallback, useEffect, useRef, useState } from "react";
import type { Post } from "./types";
import PostCard from "../../components/post_card";
import { useAuth } from "../../utils/context";
import { Link } from "react-router-dom";

const limit = 5 as const;

export default function PostList({
  postToAdd,
}: {
  postToAdd: Post | null;
}) {
  const { token } = useAuth();
  const [cursor, setCursor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const isMountedRef = useRef(false);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError("");

    await fetch(`http://localhost:3000/post/?cursor=${cursor}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ posts, nextCursor }: { posts: Post[]; nextCursor: string }) => {
        setPosts((prev) => [...prev, ...posts]);
        if (nextCursor) setCursor(nextCursor);
      })
      .catch((e) =>
        setError(
          e instanceof Error
            ? e.message
            : typeof e === "string"
              ? e
              : "Unknown",
        ),
      )
      .finally(() => setIsLoading(false));
  }, [cursor, token]);

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

    setPosts((prev) => [postToAdd, ...prev]);
  }, [postToAdd]);

  if (error)
    return (
      <div className="text-xl text-red-500">An error occured: {error} 🥝</div>
    );

  if (posts.length === 0)
    return (
      <div className="text-xl text-neutral-500">
        Aucun post n'a encore été publié. Soyez le premier ! 🥝
      </div>
    );

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 lg:gap-6">
        {posts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            state={{ post: post  }}
          >
            <PostCard key={post.id} post={post} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button type="button" onClick={fetchPosts} disabled={isLoading}>
          {isLoading ? "Loading... 🥝" : "Load more..."}
        </button>
      </div>
    </div>
  );
}
