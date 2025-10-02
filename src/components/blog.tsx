import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  createdAt: string;
  author?: string;
  tags?: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (categoryFilter !== "All") {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setCurrentPage(1); // Reset to first page on filter change
    setFilteredPosts(filtered);
  }, [search, categoryFilter, posts]);

  const categories = ["All", "Technology", "Design", "Business", "Lifestyle"];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="container-max mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-800 dark:text-slate-100">
      {/* Main content */}
      <main className="md:col-span-3 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Our Blog</h1>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-100 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 rounded-lg px-4 py-2 w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Posts */}
        {loading ? (
          <p className="text-center text-slate-500 dark:text-slate-400">Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-44 sm:h-48 w-full object-cover rounded-lg mb-4"
                />

                <span className="text-xs uppercase text-indigo-500 font-semibold tracking-wide mb-2">
                  {post.category}
                </span>

                <h2 className="text-xl font-semibold mb-1 line-clamp-2">{post.title}</h2>

                {/* Date & Author */}
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  {post.author && <span>By {post.author}</span>}{" "}
                  {post.author && "• "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  to={`/blog/${post.id}`}
                  className="mt-auto inline-block text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-medium transition"
                >
                  Read more
                </Link>

                <div className="flex mt-4 space-x-3">
                  <a
                    href={`https://twitter.com/share?url=/blog/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter className="text-sky-500 hover:text-sky-700 transition" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=/blog/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebook className="text-blue-600 hover:text-blue-800 transition" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?url=/blog/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedin className="text-indigo-600 hover:text-indigo-800 transition" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > postsPerPage && (
          <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 transition"
              aria-label="Previous page"
            >
              Prev
            </button>
            <span className="text-slate-700 dark:text-slate-200 whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 transition"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Sidebar */}
      <aside className="md:col-span-1 sticky top-6 space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setCategoryFilter(cat)}
                  className={`${
                    categoryFilter === cat
                      ? "text-amber-600 dark:text-amber-400 font-semibold"
                      : "text-slate-700 dark:text-slate-300"
                  } hover:text-amber-500 dark:hover:text-amber-300 transition`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
          <ul className="space-y-2">
            {posts.slice(0, 5).map((post) => (
              <li key={post.id}>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
