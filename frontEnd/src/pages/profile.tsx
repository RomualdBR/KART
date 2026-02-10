import { useEffect, useState, useRef } from "react";
import type { Post } from "./post/types";

const limit = 5 as const;

export default function Profile() {
  const [user, setUser] = useState<{
    id: number;
    pseudo: string;
    mail: string;
  } | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

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

    setIsLoading(false);
    setPosts((prev) => [...prev, ...response]);
  };

  const fetchUser = async () => {
    console.log("Fetching user data...");
    if (!jwt) {
      return console.error("No token found, user is not authenticated");
    }

    try {
      const response = await fetch("http://localhost:3000/user/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        fetchUserPosts(userData);
        console.log("User data fetched successfully:", userData);
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

  return (
    <>
      <div>
        <h1>Profile Page</h1>
        {user ? (
          <div>
            <h2>Profile Information</h2>
            <p>ID: {user.id}</p>
            <p>Pseudo: {user.pseudo}</p>
            <p>Email: {user.mail}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <div key={post.id}>{post.content}</div>
        ))}

        <button type="button" onClick={() => setOffset((prev) => prev + limit)}>
          Load more...
        </button>
      </div>
    </>
  );
}
