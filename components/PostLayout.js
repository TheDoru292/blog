import { format } from "date-fns";

export default function PostLayout({ post }) {
  return (
    <div className="lg:mx-32 md:border-2 sm:border-0 md:mx-3 mt-5 rounded-lg p-2">
      <h2 className="text-center text-xl font-semibold">{post.title}</h2>
      <p className="text-center">
        by {post.author.username} on {format(new Date(post.date), "yyyy/MM/dd")}
      </p>

      <div
        className="mt-5"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}
