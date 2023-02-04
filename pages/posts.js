import NavBar from "@/components/NavBar";
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

export default function Posts({ posts }) {
  return (
    <div>
      <NavBar currentPage="posts"></NavBar>
      <h1 className="lg:mx-32 md:mx-3 lg:p-0 px-2 mt-3 font-bold text-xl">
        Posts
      </h1>
      <div className="lg:mx-32 md:mx-3 lg:p-0 px-2 mt-3 flex">
        {posts.map((item) => {
          let text = item.content.replace(/<[^>]+>/g, "");

          if (text.length > 200) {
            text = text.slice(0, 200) + " Read more";
          }

          return (
            <Link
              href={`/post/${item.url}`}
              key={item._id}
              className="border p-4"
            >
              <p className="text-center">{item.title}</p>
              <h3>
                by <span className="font-bold">TheDoru</span>
              </h3>
              <p>{text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
