import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "./post/types";
import PostCard from "../components/post_card";
import Header from "../components/header";

const limit = 5 as const;

export default function Profile() {
  const [user, setUser] = useState<{
    id: number;
    pseudo: string;
    mail: string;
  } | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [cursor, setCursor] = useState("");
  const hasFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const userinfoString = localStorage.getItem("userInfo");
  const userinfo = userinfoString ? JSON.parse(userinfoString) : null;

  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");

  const fetchUserPosts = async (id: number) => {
    await fetch(
      `http://localhost:3000/post?cursor=${cursor}&limit=${limit}&user_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      },
    )
      .then((res) => res.json())
      .then((data: { posts: Post[]; nextCursor: string }) => {
        setPosts((prev) => [...prev, ...data.posts]);
        setCursor(data.nextCursor);
      });
  };

  const fetchUser = async () => {
    if (!jwt) {
      return console.error("No token found, user is not authenticated");
    }

    try {
      setIsLoading(true);

      const response = await fetch(`http://localhost:3000/user/${id ?? ""}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);

        await fetchUserPosts(userData.id);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (postId: number) => {
    if (!jwt) {
      return console.error("No token found, user is not authenticated");
    }

    const confirmDelete = window.confirm(
      "Es-tu sûr(e) de vouloir supprimer ce post ?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <Header />
      {user ? (
        <div>
          <div className="p-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Profile Information
            </h2>
            <p className="text-gray-600">ID: {user.id}</p>
            <p className="text-gray-600">Pseudo: {user.pseudo}</p>
            <p className="text-gray-600">Email: {user.mail}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 lg:gap-6 p-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                currentUserId={userinfo.id}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button type="button" onClick={() => fetchUserPosts(user.id)}>
              Load more...
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Loading user information...</p>
      )}
    </div>
  );
}
