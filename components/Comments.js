import { useState } from "react";
import Router from "next/router";
import { postComment } from "@/lib/posts";
import { format } from "date-fns";

export default function Comments({ comments, id }) {
  const [text, setText] = useState();

  return (
    <div className="mx-32 mt-5 rounded-lg border-2 p-2">
      <h1 className="text-center font-bold">{comments.length} comments</h1>
      <div className="flex items-center h-32 gap-3">
        <img className="w-20 h-20" src="/user.png" alt="" />
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const result = await postComment(text, id);

            if (result.success == true) {
              Router.reload(window.location.pathname);
            }
          }}
          className="mt-3 flex flex-grow gap-3 w-20 h-20"
        >
          <div className="flex-grow">
            <textarea
              rows="3"
              className="p-2 border rounded-mg w-full resize-none"
              onChange={(e) => {
                setText(e.target.value);
                console.log(text);
              }}
              value={text}
              required
            ></textarea>
          </div>
          <button className="self-center border p-2 h-12 rounded-mg">
            Comment
          </button>
        </form>
      </div>
      <div>
        {comments.map((item) => {
          return (
            <div className="mt-2 flex gap-2" key={item._id}>
              <img className="w-12" src="/user.png"></img>
              <div className="flex flex-col">
                <p className="text-sm">
                  <span className="font-bold">{item.user} </span>
                  at {format(new Date(item.date), "yyyy/MM/dd HH:mm a")}
                </p>
                <p>{item.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
