// "use client";

// import { useState } from "react";

// const samplePosts = [
//   {
//     id: 1,
//     author: "Aman Kumar",
//     branch: "Mechanical Engineering",
//     year: "2nd Year",
//     category: "Question",
//     time: "10 min ago",
//     content:
//       "Anyone interested in playing badminton this weekend? Looking for a few people to join us!",
//     likes: 12,
//     comments: 4,
//   },
//   {
//     id: 2,
//     author: "Priya Singh",
//     branch: "Electrical Engineering",
//     year: "3rd Year",
//     category: "Discussion",
//     time: "35 min ago",
//     content:
//       "What are some good ways to meet people from other branches at BIT Sindri? Let's share ideas!",
//     likes: 8,
//     comments: 6,
//   },
//   {
//     id: 3,
//     author: "Rahul Verma",
//     branch: "Computer Science",
//     year: "1st Year",
//     category: "Announcement",
//     time: "1 hr ago",
//     content:
//       "Thinking of starting a weekend chess group. Beginners are welcome too!",
//     likes: 15,
//     comments: 3,
//   },
// ];

// const filters = ["All Posts", "Discussion", "Question", "Announcement"];

// export default function CommunityPage() {
//   const [posts, setPosts] = useState(samplePosts);
//   const [activeFilter, setActiveFilter] = useState("All Posts");
//   const [newPost, setNewPost] = useState("");
//   const [category, setCategory] = useState("Discussion");
//   const [notice, setNotice] = useState("");

//   const visiblePosts =
//     activeFilter === "All Posts"
//       ? posts
//       : posts.filter((post) => post.category === activeFilter);

//   function handlePostSubmit(event) {
//     event.preventDefault();

//     if (!newPost.trim()) {
//       setNotice("Write something before publishing your post.");
//       return;
//     }

//     const post = {
//       id: Date.now(),
//       author: "You",
//       branch: "BIT Sindri Student",
//       year: "",
//       category,
//       time: "Just now",
//       content: newPost.trim(),
//       likes: 0,
//       comments: 0,
//     };

//     setPosts((currentPosts) => [post, ...currentPosts]);
//     setNewPost("");
//     setActiveFilter("All Posts");
//     setNotice("Your post has been added!");
//   }

//   function handleLike(postId) {
//     setPosts((currentPosts) =>
//       currentPosts.map((post) =>
//         post.id === postId
//           ? { ...post, likes: post.likes + 1 }
//           : post
//       )
//     );
//   }

//   function handleReport(postId) {
//     setNotice(
//       `Post #${postId} selected for reporting. Reporting will be connected to the backend later.`
//     );
//   }

//   return (
//     <main className="min-h-screen bg-slate-50 text-slate-900">
//       <header className="border-b border-slate-200 bg-white">
//         <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
//           <a href="/community" className="text-xl font-bold tracking-tight text-violet-700">
//             BIT Connect
//           </a>

//           <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
//             <a href="/sports" className="text-slate-600 hover:text-violet-700">
//               Sports
//             </a>
//             <a href="/entertainment" className="text-slate-600 hover:text-violet-700">
//               Entertainment
//             </a>
//             <a href="/community" className="text-violet-700">
//               Community
//             </a>
//           </nav>

//           <a
//             href="/settings"
//             className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
//           >
//             Profile
//           </a>
//         </div>
//       </header>

//       <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)_240px]">
//         <aside className="hidden lg:block">
//           <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-4">
//             <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
//               Your campus
//             </p>

//             <nav className="space-y-2">
//               <a
//                 href="#feed"
//                 className="block rounded-xl bg-violet-50 px-3 py-2.5 text-sm font-semibold text-violet-700"
//               >
//                 Campus Feed
//               </a>
//               <a
//                 href="#create-post"
//                 className="block rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
//               >
//                 Create a post
//               </a>
//               <a
//                 href="#chat"
//                 className="block rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
//               >
//                 Chat
//               </a>
//             </nav>

//             <div className="mt-6 rounded-xl bg-violet-50 p-3">
//               <p className="text-sm font-semibold text-violet-900">
//                 Campus connections start here.
//               </p>
//               <p className="mt-1 text-xs leading-5 text-violet-700">
//                 Ask questions, find people with shared interests, and join in.
//               </p>
//             </div>
//           </div>
//         </aside>

//         <section id="feed" className="min-w-0">
//           <div className="mb-6">
//             <p className="text-sm font-semibold text-violet-700">
//               YOUR CAMPUS, YOUR COMMUNITY
//             </p>
//             <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
//               Community
//             </h1>
//             <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
//               Meet people, exchange ideas, and make campus life more engaging.
//             </p>
//           </div>

//           <form
//             id="create-post"
//             onSubmit={handlePostSubmit}
//             className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
//           >
//             <label htmlFor="post-content" className="text-sm font-semibold">
//               Start a conversation
//             </label>

//             <textarea
//               id="post-content"
//               value={newPost}
//               onChange={(event) => setNewPost(event.target.value)}
//               placeholder="What's happening on campus?"
//               rows={3}
//               maxLength={1000}
//               className="mt-3 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
//             />

//             <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//               <select
//                 value={category}
//                 onChange={(event) => setCategory(event.target.value)}
//                 className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-400"
//                 aria-label="Post category"
//               >
//                 <option>Discussion</option>
//                 <option>Question</option>
//                 <option>Announcement</option>
//               </select>

//               <button
//                 type="submit"
//                 className="rounded-xl bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800"
//               >
//                 Publish post
//               </button>
//             </div>

//             {notice && (
//               <p role="status" aria-live="polite" className="mt-3 text-sm text-violet-700">
//                 {notice}
//               </p>
//             )}
//           </form>

//           <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
//             {filters.map((filter) => (
//               <button
//                 key={filter}
//                 type="button"
//                 onClick={() => setActiveFilter(filter)}
//                 className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
//                   activeFilter === filter
//                     ? "bg-violet-700 text-white"
//                     : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
//                 }`}
//               >
//                 {filter === "Announcement" ? "Announcements" : filter === "Question" ? "Questions" : filter === "Discussion" ? "Discussions" : filter}
//               </button>
//             ))}
//           </div>

//           <div className="space-y-4">
//             {visiblePosts.length === 0 && (
//               <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
//                 <p className="font-semibold">No posts in this category yet.</p>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Start the conversation by creating a post.
//                 </p>
//               </div>
//             )}

//             {visiblePosts.map((post) => (
//               <article
//                 key={post.id}
//                 className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex min-w-0 items-center gap-3">
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
//                       {post.author.charAt(0)}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-sm font-semibold">{post.author}</p>
//                       <p className="text-xs text-slate-500">
//                         {[post.branch, post.year].filter(Boolean).join(" · ")} · {post.time}
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={() => handleReport(post.id)}
//                     className="shrink-0 rounded-lg px-2 py-1 text-xs text-slate-500 hover:bg-red-50 hover:text-red-600"
//                     aria-label={`Report post by ${post.author}`}
//                   >
//                     Report
//                   </button>
//                 </div>

//                 <div className="mt-4">
//                   <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
//                     {post.category}
//                   </span>
//                   <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
//                     {post.content}
//                   </p>
//                 </div>

//                 <div className="mt-5 flex items-center gap-5 border-t border-slate-100 pt-3">
//                   <button
//                     type="button"
//                     onClick={() => handleLike(post.id)}
//                     className="text-sm font-medium text-slate-500 hover:text-violet-700"
//                   >
//                     ♡ {post.likes} Likes
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setNotice("Comments will be available when we build the backend.")
//                     }
//                     className="text-sm font-medium text-slate-500 hover:text-violet-700"
//                   >
//                     ○ {post.comments} Comments
//                   </button>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>

//         <aside className="space-y-5">
//           <div className="rounded-2xl border border-slate-200 bg-white p-5">
//             <h2 className="font-semibold">Community guidelines</h2>
//             <ul className="mt-3 space-y-3 text-sm leading-5 text-slate-600">
//               <li>• Be respectful to every student.</li>
//               <li>• Keep posts relevant and welcoming.</li>
//               <li>• Never share another person's private information.</li>
//               <li>• Report harmful or inappropriate content.</li>
//             </ul>
//           </div>

//           <div id="chat" className="rounded-2xl border border-violet-100 bg-violet-50 p-5">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl">
//               💬
//             </div>
//             <h2 className="mt-3 font-semibold text-violet-950">Campus Chat</h2>
//             <p className="mt-2 text-sm leading-6 text-violet-800">
//               Connect with fellow students. Chat messages will automatically expire after 48 hours.
//             </p>
//             <button
//               type="button"
//               onClick={() => setNotice("The chat interface is our next step to build.")}
//               className="mt-4 w-full rounded-xl bg-violet-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-800"
//             >
//               Explore chat
//             </button>
//           </div>
//         </aside>
//       </div>

//       <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-500">
//         BIT Connect · Built for the BIT Sindri community
//       </footer>
//     </main>
//   );
// }

"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Settings } from "lucide-react";

const samplePosts = [
  {
    id: 1,
    author: "Aman Kumar",
    ownerId: "aman-demo",
    branch: "Mechanical Engineering",
    year: "2nd Year",
    time: "10 min ago",
    content:
      "Anyone interested in playing badminton this weekend? Looking for a few people to join us!",
    likes: 12,
    comments: [
      { id: 101, author: "Rohit", content: "I'm interested!" },
      { id: 102, author: "Neha", content: "Which court?" },
    ],
  },
  {
    id: 2,
    author: "Priya Singh",
    ownerId: "priya-demo",
    branch: "Electrical Engineering",
    year: "3rd Year",
    time: "35 min ago",
    content:
      "What are some good ways to meet people from other branches at BIT Sindri? Let's share ideas!",
    likes: 8,
    comments: [
      {
        id: 201,
        author: "Ankit",
        content: "Join college clubs and events!",
      },
    ],
  },
  {
    id: 3,
    author: "Rahul Verma",
    ownerId: "rahul-demo",
    branch: "Computer Science",
    year: "1st Year",
    time: "1 hr ago",
    content:
      "Thinking of starting a weekend chess group. Beginners are welcome too!",
    likes: 15,
    comments: [],
  },
];

export default function CommunityPage() {
  // Demo identity. Replace this with the authenticated student's ID later.
  const currentUserId = null;

  const [posts, setPosts] = useState(samplePosts);
  const [chatUser, setChatUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(true);
  const [chatSending, setChatSending] = useState(false);
  const [chatError, setChatError] = useState("");
  

const loadChatMessages = useCallback(async () => {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, user_id, message, created_at, expires_at")
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) {
    setChatError(error.message);
    return;
  }

  setChatMessages(data ?? []);
  setChatError("");
}, []);

useEffect(() => {
  let active = true;

  async function checkLogin() {
    const { data, error } = await supabase.auth.getUser();

    if (!active) return;

    if (error || !data.user) {
      setChatUser(null);
      setChatError("Please sign in to use campus chat.");
    } else {
      setChatUser(data.user);
      setChatError("");
    }

    setChatLoading(false);
  }

  checkLogin();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    if (!active) return;
    setChatUser(session?.user ?? null);
  });

  return () => {
    active = false;
    subscription.unsubscribe();
  };
}, []);


useEffect(() => {
  if (!chatUser) return;

  loadChatMessages();

  const channel = supabase
    .channel("campus-chat-messages-community")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chat_messages",
      },
      () => {
        loadChatMessages();
      }
    )
    .subscribe((status) => {
      console.log("Campus chat realtime status:", status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}, [chatUser, loadChatMessages]);


async function sendChatMessage(event) {
  event.preventDefault();

  const message = chatInput.trim();

  if (!message || !chatUser || chatSending) return;

  setChatSending(true);
  setChatError("");

  const { error } = await supabase.from("chat_messages").insert({
    user_id: chatUser.id,
    message,
  });

  if (error) {
    setChatError(error.message);
  } else {
    setChatInput("");
    await loadChatMessages();
  }

  setChatSending(false);
}



  const [newPost, setNewPost] = useState("");
  const [notice, setNotice] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [openComments, setOpenComments] = useState([]);
  const [menuPostId, setMenuPostId] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [reportPost, setReportPost] = useState(null);
  const [reportReason, setReportReason] = useState("Inappropriate content");
  const [reportDetails, setReportDetails] = useState("");

  
async function handlePostSubmit(event) {
  event.preventDefault();

  const content = newPost.trim();

  if (!content) {
    setNotice("Write something before publishing your post.");
    return;
  }

  const { data: { user }, error: userError } =
    await supabase.auth.getUser();

  if (userError || !user) {
    setNotice("Please sign in before publishing.");
    return;
  }

  const { error } = await supabase
    .from("community_posts")
    .insert({
      user_id: user.id,
      content,
    });

  if (error) {
    setNotice("Post failed: " + error.message);
    return;
  }

  setNewPost("");
  setNotice("Post published successfully!");
}

async function loadCommunityPosts() {
  const { data, error } = await supabase
    .from("community_posts")
    .select("id, user_id, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    setNotice("Could not load posts: " + error.message);
    return;
  }

  setPosts(
    (data ?? []).map((post) => ({
      id: post.id,
      author: post.user_id === chatUser?.id ? "You" : "BIT Student",
      ownerId: post.user_id,
      branch: "BIT Sindri Student",
      year: "",
      time: new Date(post.created_at).toLocaleString(),
      content: post.content,
      likes: 0,
      comments: [],
    }))
  );
}

useEffect(() => {
  if (!chatUser) return;

  loadCommunityPosts();
}, [chatUser]);



  function handleLike(postId) {
    const alreadyLiked = likedPosts.includes(postId);

    setLikedPosts((current) =>
      alreadyLiked
        ? current.filter((id) => id !== postId)
        : [...current, postId]
    );

    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: Math.max(
                0,
                post.likes + (alreadyLiked ? -1 : 1)
              ),
            }
          : post
      )
    );
  }

  function handleCommentSubmit(event, postId) {
    event.preventDefault();

    const content = (commentInputs[postId] || "").trim();

    if (!content) return;

    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  author: "You",
                  content,
                },
              ],
            }
          : post
      )
    );

    setCommentInputs((current) => ({
      ...current,
      [postId]: "",
    }));

    setNotice("Comment added.");
  }


async function handleDeletePost() {
  if (deletePostId === null || !chatUser) return;

  const post = posts.find((item) => item.id === deletePostId);

  if (!post || post.ownerId !== chatUser.id) {
    setNotice("You can only delete your own posts.");
    setDeletePostId(null);
    return;
  }

  const { error } = await supabase
    .from("community_posts")
    .delete()
    .eq("id", deletePostId)
    .eq("user_id", chatUser.id);

  if (error) {
    setNotice("Could not delete post: " + error.message);
    return;
  }

  setPosts((current) =>
    current.filter((item) => item.id !== deletePostId)
  );

  setLikedPosts((current) =>
    current.filter((id) => id !== deletePostId)
  );

  setOpenComments((current) =>
    current.filter((id) => id !== deletePostId)
  );

  setDeletePostId(null);
  setMenuPostId(null);
  setNotice("Your post has been deleted.");
}


  function handleReportSubmit(event) {
    event.preventDefault();

    if (!reportPost) return;

    // Demo only: no report is sent to a backend yet.
    setNotice("Report recorded in this demo. Backend submission is not connected.");
    setReportPost(null);
    setReportDetails("");
    setReportReason("Inappropriate content");
  }

  return (
    <main className="min-h-screen bg-[#0d0e12] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a
            href="/home"
            className="text-xl font-bold tracking-tight text-white"
          >
            BIT <span className="text-violet-400">Connect</span>
          </a>

          <nav className="flex items-center gap-4 text-sm sm:gap-7">
            <a
              href="/home"
              className="text-gray-400 transition hover:text-white"
            >
              Sports
            </a>
            <a
              href="/entertainment"
              className="hidden text-gray-400 transition hover:text-white sm:block"
            >
              Entertainment
            </a>
            <a
              href="/community"
              className="font-semibold text-violet-400"
            >
              Community
            </a>
          </nav>

<a
  href="/settings"
  aria-label="Settings"
  title="Settings"
  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition hover:bg-white/5 hover:text-white"
>
  <Settings size={23} strokeWidth={1.8} />
</a>
        </div>
      
</header>

<div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
            BIT Sindri · Student space
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Community
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-400">
            Share what's happening, ask for help, and connect with fellow students.
          </p>
        </section>

        <form
          id="create-post"
          onSubmit={handlePostSubmit}
          className="mb-7 rounded-xl border border-white/10 bg-[#14151b] p-4 sm:p-5"
        >
          <label
            htmlFor="post-content"
            className="text-sm font-semibold text-gray-100"
          >
            What's on your mind?
          </label>

          <textarea
            id="post-content"
            value={newPost}
            onChange={(event) => setNewPost(event.target.value)}
            placeholder="Write something for your campus community..."
            rows={3}
            maxLength={1000}
            className="mt-3 w-full resize-y rounded-lg border border-white/10 bg-[#0d0e12] p-3 text-sm leading-6 text-white outline-none placeholder:text-gray-600 focus:border-violet-500"
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-xs text-gray-600">
              {newPost.length}/1000
            </span>
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Publish post
            </button>
          </div>

          {notice && (
            <p role="status" aria-live="polite" className="mt-3 text-sm text-violet-300">
              {notice}
            </p>
          )}
        </form>

        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-semibold">Campus feed</h2>
          <span className="text-xs text-gray-500">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>

        <section className="space-y-4" aria-label="Community posts">
          {posts.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/15 p-8 text-center">
              <p className="font-medium text-gray-200">
                No posts yet.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Be the first to share something with your campus.
              </p>
            </div>
          )}

          {posts.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            const commentsAreOpen = openComments.includes(post.id);
            const isOwner = Boolean(
  chatUser && post.ownerId === chatUser.id
);
            return (
              <article
                key={post.id}
                className="rounded-xl border border-white/10 bg-[#14151b] p-4 sm:p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-sm font-bold text-violet-300">
                      {post.author.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-100">
                        {post.author}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {[post.branch, post.year].filter(Boolean).join(" · ")}
                        {" · "}
                        {post.time}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setReportPost(post);
                        setNotice("");
                      }}
                      className="rounded-md px-2 py-1 text-xs text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`Report post by ${post.author}`}
                    >
                      Report
                    </button>

                    {isOwner && (
                      <button
                        type="button"
                        onClick={() =>
                          setMenuPostId((current) =>
                            current === post.id ? null : post.id
                          )
                        }
                        aria-label="Post options"
                        aria-expanded={menuPostId === post.id}
                        className="rounded-lg px-2 py-1 text-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
                      >
                        ⋯
                      </button>
                    )}

                    {isOwner && menuPostId === post.id && (
                      <div className="absolute right-0 top-9 z-10 w-40 rounded-lg border border-white/10 bg-[#20212a] p-1 shadow-xl">
                        <button
                          type="button"
                          onClick={() => {
                            setDeletePostId(post.id);
                            setMenuPostId(null);
                          }}
                          className="w-full rounded-md px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                        >
                          Delete post
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-300">
                    {post.content}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-5 border-t border-white/10 pt-3">
                  <button
                    type="button"
                    onClick={() => handleLike(post.id)}
                    aria-pressed={isLiked}
                    className={`text-sm transition ${
                      isLiked
                        ? "font-semibold text-violet-300"
                        : "text-gray-500 hover:text-violet-300"
                    }`}
                  >
                    {isLiked ? "♥" : "♡"} {post.likes} Likes
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setOpenComments((current) =>
                        commentsAreOpen
                          ? current.filter((id) => id !== post.id)
                          : [...current, post.id]
                      )
                    }
                    aria-expanded={commentsAreOpen}
                    className="text-sm text-gray-500 transition hover:text-violet-300"
                  >
                    ○ {post.comments.length} Comments
                  </button>
                </div>

                {commentsAreOpen && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="space-y-3">
                      {post.comments.length === 0 && (
                        <p className="text-sm text-gray-500">
                          No comments yet. Be the first to reply.
                        </p>
                      )}

                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="rounded-lg bg-white/[0.03] p-3"
                        >
                          <p className="text-xs font-semibold text-gray-300">
                            {comment.author}
                          </p>
                          <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-5 text-gray-400">
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={(event) =>
                        handleCommentSubmit(event, post.id)
                      }
                      className="mt-3 flex flex-col gap-2 sm:flex-row"
                    >
                      <input
                        value={commentInputs[post.id] || ""}
                        onChange={(event) =>
                          setCommentInputs((current) => ({
                            ...current,
                            [post.id]: event.target.value,
                          }))
                        }
                        maxLength={500}
                        placeholder="Write a comment..."
                        aria-label={`Comment on post by ${post.author}`}
                        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#0d0e12] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500"
                      />
                      <button
                        type="submit"
                        className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-white/5"
                      >
                        Reply
                      </button>
                    </form>
                  </div>
                )}
              </article>
            );
          })}
        </section>

        <section className="mt-8 rounded-xl border border-white/10 p-4">
          <h2 className="text-sm font-semibold text-gray-200">
            Community guidelines
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Be respectful, protect personal information, and report harmful content.
          </p>
        </section>

        <footer className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-gray-600">
          BIT Connect · Built for the BIT Sindri community
        </footer>
      </div>

      {deletePostId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-sm rounded-xl border border-white/10 bg-[#17181f] p-5 shadow-2xl"
          >
            <h2 id="delete-title" className="text-lg font-semibold">
              Delete this post?
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
              This will delete your post and its comments from this demo. This action cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletePostId(null)}
                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeletePost}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Delete post
              </button>
            </div>
          </section>
        </div>
      )}

      {reportPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setReportPost(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-title"
            className="w-full max-w-md rounded-xl border border-white/10 bg-[#17181f] p-5 shadow-2xl"
          >
            <h2 id="report-title" className="text-lg font-semibold">
              Report post
            </h2>
            <p className="mt-2 text-sm leading-5 text-gray-400">
              Tell us why this post needs review.
            </p>

            <form onSubmit={handleReportSubmit} className="mt-4">
              <label
                htmlFor="report-reason"
                className="text-sm font-medium text-gray-300"
              >
                Reason
              </label>
              <select
                id="report-reason"
                value={reportReason}
                onChange={(event) => setReportReason(event.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e12] p-3 text-sm text-white outline-none focus:border-violet-500"
              >
                <option>Inappropriate content</option>
                <option>Harassment or bullying</option>
                <option>Spam or misleading content</option>
                <option>Sharing private information</option>
                <option>Other</option>
              </select>

              <label
                htmlFor="report-details"
                className="mt-4 block text-sm font-medium text-gray-300"
              >
                Additional details (optional)
              </label>
              <textarea
                id="report-details"
                value={reportDetails}
                onChange={(event) => setReportDetails(event.target.value)}
                maxLength={500}
                rows={3}
                placeholder="Add any useful context..."
                className="mt-2 w-full rounded-lg border border-white/10 bg-[#0d0e12] p-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-violet-500"
              />

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReportPost(null)}
                  className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Submit report
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

