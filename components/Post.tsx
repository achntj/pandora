import React from "react";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export type PostProps = {
  id: number;
  title: string;
  content: string;
  date: Date;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div>
      <Link href={`/p/${post.id}`}>
        <a className="text-2xl text-cyan-500">{post.title}</a>
      </Link>
      <div className="entry">
        <ReactMarkdown children={post.content} />
      </div>
    </div>
  );
};

export default Post;
