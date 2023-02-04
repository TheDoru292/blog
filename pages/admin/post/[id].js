import AdminNavBar from "@/components/AdminNavBar";
import AdminPageEditor from "@/components/AdminPageEditor";
import { getAllPostsIds, getPostData } from "@/lib/posts";
import Head from "next/head";

export default function Post({ postData }) {
  return (
    <div>
      <Head>
        <title>{postData.post.title}</title>
      </Head>
      <AdminNavBar currentPage="pages" />
      <AdminPageEditor
        mode="existing"
        modeTitle="Edit Page"
        postContent={postData.post}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostsIds();

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id, false);
  return {
    props: {
      postData,
    },
  };
}
