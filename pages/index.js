import NavBar from "@/components/NavBar";
import Head from "next/head";
import Link from "next/link";

export async function getServerSideProps() {
  const posts = await fetch("http://localhost:3000/api/post", {
    method: "GET",
  }).then((data) => {
    return data.json();
  });

  return {
    props: {
      posts: posts.posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Homepage - Blog</title>
      </Head>
      <NavBar currentPage="home" />
      <div className="mx-32 mt-5 rounded-lg border-2 p-2">
        <h2 className="text-center text-xl font-semibold">
          Welcome to my Blog!
        </h2>
        <div>
          <h3 className="mb-2">Come check out my posts!</h3>

          <div className="flex flex-col gap-1">
            {posts.map((item) => {
              return (
                <Link
                  className="text-blue-500"
                  key={item.url}
                  href={`/post/${item.url}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
