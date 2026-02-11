import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "./post/types";
import { useAuth } from "../utils/context";

const limit = 5 as const;

export default function Profile() {
  const [user, setUser] = useState<{
    id: number;
    pseudo: string;
    mail: string;
  } | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [offset, setOffset] = useState(0);
  const hasFetched = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useAuth();
  
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");

  const fetchUserPosts = async (userData: any) => {
    const response: Post[] = await fetch(
      `http://localhost:3000/post/?offset=${offset}&limit=${limit}&user_id=${userData?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    ).then((res) => res.json());

    setPosts((prev) => [...prev, ...response]);
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

        await fetchUserPosts(userData);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetchUser();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">
              Profile Page
              <span>🥝</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="px-5 py-2 text-sm font-medium text-white bg-red hover:bg-red-600 rounded-lg"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      {user ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
          <p className="text-gray-600">ID: {user.id}</p>
          <p className="text-gray-600">Pseudo: {user.pseudo}</p>
          <p className="text-gray-600">Email: {user.mail}</p>
          <div className="flex flex-col gap-2">
            {posts.map((post) => (
              <div key={post.id}>{post.content}</div>
            ))}

            <button type="button" onClick={() => setOffset((prev) => prev + limit)}>
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
