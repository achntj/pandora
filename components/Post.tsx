import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { MailIcon, MailOpenIcon } from "@heroicons/react/outline";

export type PostProps = {
  id: number;
  title: string;
  content: string;
  date: Date;
  complete: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const [complete, setComplete] = useState(post.complete);
  const updateComplete = async (id: number, body: boolean) => {
    const pass = prompt("Enter Password");
    if (pass !== null) {
      if (pass === process.env.NEXT_PUBLIC_PASS) {
        setComplete(!complete);
        try {
          await fetch(
            `${
              process.env.VERCEL_URL || "http://localhost:3000"
            }/api/complete/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );
        } catch (error) {
          alert(error);
        }
      } else {
        alert("Wrong Password hahahah");
      }
    }
  };
  return (
    <div>
      <p
        className={`m-0 text-2xl ${
          complete ? "text-emerald-600" : "text-pink-500"
        } font-medium flex items-center justify-between`}
      >
        {complete && "[COMPLETE]"} {post.title}
        <span onClick={() => updateComplete(post.id, complete)}>
          {complete ? (
            <MailOpenIcon className="h-6 w-6" />
          ) : (
            <MailIcon className="h-6 w-6" />
          )}
        </span>
      </p>
      <div className="entry">
        <ReactMarkdown children={post.content} />
      </div>
    </div>
  );
};

export default Post;
