import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { NextPage } from "next";
import absoluteUrl from "next-absolute-url";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Draft: NextPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pass, setPass] = useState("");
  const [disable, setDisable] = useState(false);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (pass === process.env.NEXT_PUBLIC_PASS) {
      setDisable(true);
      try {
        const body = { title, content };
        await fetch(`${origin}/api/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        await Router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Note</h1>
          <div className="mb-5">
            <input
              autoFocus
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              type="text"
              value={pass}
              className="w-full outline-none bg-transparent"
            />
            <a>
              <button disabled={disable} type="submit">
                Publish
              </button>
            </a>
          </div>
          <div>
            <input
              autoFocus
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
              className="w-full outline-none bg-transparent text-3xl font-bold"
            />
            <textarea
              required
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content (MarkDown supported)"
              rows={8}
              value={content}
              className="w-full outline-none h-auto resize-none bg-transparent"
            />
          </div>
        </form>
        <div>
          <h2>Preview</h2>
          <h3>{title}</h3>
          <p>{<ReactMarkdown>{content}</ReactMarkdown>}</p>
        </div>
      </div>
    </Layout>
  );
};

Draft.getInitialProps = async (context) => {
  const { req } = context;
  // Hostname is needed on both front and back so we should
  // post it to the frontend by returning it from getInitialProps
  const origin = absoluteUrl(req).origin;
  return {
    origin,
  };
};

export default Draft;
