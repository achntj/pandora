import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import { NextPage } from "next";
import absoluteUrl from "next-absolute-url";

const Draft: NextPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pass, setPass] = useState("");
  console.log(origin);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (pass === process.env.NEXT_PUBLIC_PASS) {
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
              <input
                disabled={!content || !title}
                type="submit"
                value="Publish"
              />
            </a>
          </div>
          <div>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
              className="w-full outline-none bg-transparent text-3xl font-bold"
            />
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content (MD supported)"
              rows={8}
              value={content}
              className="w-full outline-none h-auto resize-none bg-transparent"
            />
          </div>
        </form>
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
