import NavBar from "@/components/NavBar";
import PostLayout from "@/components/PostLayout";
import { getAllPostsUrl, getPostData } from "@/lib/postsPublic";
import Comments from "@/components/Comments";
import Head from "next/head";

export default function Post({ postData, comments }) {
  console.log(postData);

  return (
    <div>
      <Head>
        <title>{postData.post.title} - Blog</title>
      </Head>
      <NavBar currentPage="pages" />
      <PostLayout post={postData.post} />
      <Comments comments={postData.comments} id={postData.post._id} />
      <div className="mx-32 mt-5 rounded-lg border-2 p-2">
        <h1 className="text-center font-bold">Credits</h1>
        <a href="https://www.flaticon.com/free-icons/user" title="user icons">
          User icons created by kmg design - Flaticon
        </a>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostsUrl();

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, true);

  return {
    props: {
      postData,
    },
  };
}
