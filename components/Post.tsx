import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export type PostProps = {
  id: number;
  title: string;
  content: string;
  date: Date;
  complete: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div>
      <p>{post.complete}</p>
      <p className="m-0 text-2xl text-pink-500 font-medium">{post.title}</p>
      <div className="entry">
        <ReactMarkdown children={post.content} />
      </div>
    </div>
  );
};

export default Post;
