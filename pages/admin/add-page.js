import AdminNavBar from "@/components/AdminNavBar";
import AdminPageEditor from "@/components/AdminPageEditor";
import Head from "next/head";

export default function AddPage() {
  return (
    <div>
      <Head>
        <title>Add Page</title>
      </Head>
      <AdminNavBar currentPage="addpage" />
      <AdminPageEditor modeTitle="Add Page" mode="new" />
    </div>
  );
}
