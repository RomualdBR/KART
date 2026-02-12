import PostForm from "./form";
import PostList from "./list";
import { useAuth } from "../../utils/context";
import { useState } from "react";
import type { Post } from "./types";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [postToAdd, setPostToAdd] = useState<Post | null>(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-800">KART 🥝</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="px-5 py-2 text-sm font-medium text-white bg-red hover:bg-red-600 rounded-lg"
            >
              Profile
            </button>
            <button
              onClick={logout}
              className="px-5 py-2 text-sm font-medium text-white bg-red hover:bg-red-600 rounded-lg"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <PostForm setPostToAdd={setPostToAdd} />
        <PostList postToAdd={postToAdd} />
      </main>
    </div>
  );
}
