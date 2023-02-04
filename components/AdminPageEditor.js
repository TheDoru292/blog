import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { parseCookies } from "nookies";
import { post, saveDraft, deletePost, editPost } from "@/lib/posts";
import { useRouter } from "next/router";

export default function AdminPageEditor({ mode, modeTitle, postContent }) {
  console.log(postContent);

  const router = useRouter();
  const editorRef = useRef();
  const [id, setId] = useState(() => {
    if (postContent !== undefined) {
      return postContent._id;
    }
  });
  const [title, setTitle] = useState(() => {
    if (mode == "existing") {
      return postContent.title;
    }
  });

  function Buttons() {
    if (mode === "new") {
      return (
        <>
          <button
            className={buttonStyling}
            onClick={async () => {
              const result = await post(
                title,
                editorRef.current.getContent(),
                parseCookies()
              );

              console.log(result);

              if (result.success == true) {
                router.push("/admin/pages");
              }
            }}
          >
            Post
          </button>
          <button
            className={buttonStyling}
            onClick={async () => {
              const result = await saveDraft(
                title,
                editorRef.current.getContent(),
                parseCookies()
              );

              console.log(result);

              if (result.success == true) {
                router.push("/admin/pages");
              }
            }}
          >
            Save as Draft
          </button>
        </>
      );
    } else if (postContent.posted == false) {
      return (
        <>
          <button
            className={buttonStyling}
            onClick={async () => {
              const result = await editPost(
                title,
                editorRef.current.getContent(),
                { _id: postContent._id, publish: false },
                parseCookies()
              );

              console.log(result);

              if (result.success == true) {
                router.push("/admin/pages");
              }
            }}
          >
            Save
          </button>
          <DeleteButton />
          <button
            className={buttonStyling}
            onClick={async () => {
              const result = await post(
                title,
                editorRef.current.getContent(),
                parseCookies(),
                id
              );

              console.log(result);

              if (result.success == true) {
                router.push("/admin/pages");
              }
            }}
          >
            Publish
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            className={buttonStyling}
            onClick={async () => {
              const result = await editPost(
                title,
                editorRef.current.getContent(),
                { _id: postContent._id, publish: true },
                parseCookies()
              );

              console.log(result);

              if (result.success == true) {
                router.push("/admin/pages");
              }
            }}
          >
            Save
          </button>
          <DeleteButton />
          <button
            className={buttonStyling}
            onClick={async () => {
              const result = await saveDraft(
                title,
                editorRef.current.getContent(),
                parseCookies(),
                id
              );

              console.log(result);

              if (result.success == true) {
                router.push("/admin/pages");
              }
            }}
          >
            Revert to Draft
          </button>
        </>
      );
    }
  }

  function DeleteButton() {
    if (mode === "existing") {
      return (
        <button
          className="border p-1 px-2 rounded-md hover:bg-red-500 bg-red-400"
          onClick={async () => {
            const result = await deletePost(id, parseCookies());

            console.log(result);

            if (result.success == true) {
              router.push("/admin/pages");
            }
          }}
        >
          Delete Post
        </button>
      );
    }
  }

  const buttonStyling =
    "border p-1 px-2 rounded-md hover:bg-gray-700 bg-gray-600 text-white";

  return (
    <div className="mx-10 mt-5 max-w-7x1 px-2 sm:px-6 gap-y-3 gap-x-3 lg:px-8 grid grid-rows-[.1fr,.1fr,.6fr] grid-cols[30px 1fr 1fr] min-h-max">
      <div className="h-6 self-start">
        <h2 className="font-semibold text-xl h-2">{modeTitle}</h2>
      </div>
      <form className="col-start-1 col-end-3">
        <div>
          <input
            type="text"
            className="w-full border border-2 h-8 p-2 rounded-md"
            placeholder="Title goes here..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
      </form>
      <div className="py-3 rounded-md border self-start row-start-1 row-end-3 col-start-3 col-end-4 flex flex-row justify-evenly">
        <Buttons />
      </div>
      <div className="col-start-1 col-end-3">
        <Editor
          id="23121hihsihsaiohsasinsl"
          onInit={(evt, editor) => (editorRef.current = editor)}
          tinymceScriptSrc="/scripts/tinymce/tinymce.min.js"
          initialValue={
            postContent === undefined
              ? "<p>Initial text</p>"
              : postContent.content
          }
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } ",
          }}
        />
      </div>
    </div>
  );
}
