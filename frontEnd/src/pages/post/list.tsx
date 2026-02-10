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

	if (isLoading || !posts) return "Loading...";

	return (
		<div className="flex flex-col gap-2">
			{posts.map(post => (
				<div key={post.id}>{post.content}</div>
			))}

<<<<<<< HEAD
    async function fetchPosts() {
      const response: Post[] = await fetch(
        `http://localhost:3000/post/?offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res.json());
      
      console.log("Fetched posts:", response);

      setIsLoading(false);
      setPosts((prev) => [...prev, ...response]);
    }

    fetchPosts();
  }, [offset]);

  if (isLoading) return "Loading...";

  console.log(posts);

  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}

      <button type="button" onClick={() => setOffset((prev) => prev + limit)}>
        Load more...
      </button>
    </div>
  );
=======
			<button
				type="button"
				onClick={() => setLimit(prev => prev + initialLimit)}
			>
				Load more...
			</button>
		</div>
	);
>>>>>>> 9c59f581707fdea0c6e51038805e9c3f2b45ec35
}
