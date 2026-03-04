import React, { useEffect, useState, useRef } from "react";

interface Post {
  id: number;
  userId: number;
  userName: string;
  title: string;
  body: string;
  likes: number;
  timestamp: number;
}

export function InfiniteScrollPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const postsPerPage = 10;

  // Fetch authors once
  const [usersMap, setUsersMap] = useState<Map<number, string>>(new Map());

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await res.json();
      const map = new Map(users.map((u: any) => [u.id, u.name]));
      setUsersMap(map);
    };
    fetchUsers();
  }, []);

  // Fetch posts page by page
  const fetchPosts = async (pageNumber: number) => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${postsPerPage}`
    );
    const data = await res.json();

    const postsWithExtras: Post[] = data.map((p: any) => ({
      id: p.id,
      userId: p.userId,
      userName: usersMap.get(p.userId) || "Unknown",
      title: p.title,
      body: p.body,
      likes: Math.floor(Math.random() * 100), // random likes for demo
      timestamp: Date.now() + p.id // unique timestamp
    }));

    setPosts((prev) => [...prev, ...postsWithExtras]);
    setLoading(false);
  };

  // Load initial posts
  useEffect(() => {
    if (usersMap.size > 0) {
      fetchPosts(page);
    }
  }, [usersMap, page]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        if (!loading) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div ref={containerRef} style={{ padding: "20px" }}>
      <h2>Infinite Scroll Posts</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px"
            }}
          >
            <h4>{post.userName}</h4>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
            <div>Likes: {post.likes}</div>
          </div>
        ))}
      </div>
      {loading && <p>Loading more posts...</p>}
    </div>
  );
}