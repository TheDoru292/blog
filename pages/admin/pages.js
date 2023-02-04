import AdminNavBar from "@/components/AdminNavBar";
import Head from "next/head";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import { filterByDraft, filterByPublished } from "@/lib/posts";

export async function getServerSideProps(context) {
  if (context.req.cookies["jwt"] == undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
      props: {},
    };
  }

  const posts = await fetch("http://localhost:3000/api/post", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${context.req.cookies["jwt"]}`,
    },
  }).then((data) => {
    return data.json();
  });

  return {
    props: {
      posts: posts.posts,
    },
  };
}

export default function Pages({ posts }) {
  const [post, setPost] = useState(posts);

  console.log(post);

  return (
    <div>
      <Head>
        <title>Pages</title>
      </Head>
      <AdminNavBar currentPage="pages" />
      <div className="mx-10 mt-5 max-w-7x1 px-2 sm:px-6 lg:px-8 flex flex-col min-h-max">
        <div className="flex gap-5">
          <h2 className="font-semibold text-xl">Pages</h2>
          <Link
            href="/admin/add-page"
            className="border p-1 px-2 rounded-md hover:bg-gray-700 bg-gray-700 text-white"
          >
            Add Page
          </Link>
        </div>
        <div>
          <p>
            Sort by:{" "}
            <span
              className="cursor-pointer"
              onClick={() => {
                const filteredPosts = filterByDraft(posts);
                setPost(filteredPosts);
              }}
            >
              Draft
            </span>{" "}
            <span
              onClick={() => {
                const filteredPosts = filterByPublished(posts);
                setPost(filteredPosts);
              }}
              className="cursor-pointer"
            >
              Published
            </span>
          </p>
        </div>
        <div className="flex mt-3">
          <table className="min-w-full border">
            <thead className="border">
              <tr className="h-10">
                <th className="border">Post Title</th>
                <th className="border">Author</th>
                <th className="border">Status</th>
                <th className="border">Posted on</th>
              </tr>
            </thead>
            <tbody>
              {post.map((post) => {
                return (
                  <tr key={post._id} className="h-10">
                    <td className="border pl-3">
                      <Link href={`/admin/post/${post._id}`}>{post.title}</Link>
                    </td>
                    <td className="border text-center">
                      <Link href={`/author/${post.author.username}`}>
                        {post.author.username}
                      </Link>
                    </td>
                    <td className="border text-center">
                      <p>{post.posted ? "Posted" : "Draft"}</p>
                    </td>
                    <td className="border text-center">
                      <p>
                        {post.date
                          ? format(new Date(post.date), "MM/dd/yyyy")
                          : "Unknown"}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
