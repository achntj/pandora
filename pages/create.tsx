import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Draft: React.FC = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pass, setPass] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (pass === props.pass) {
      try {
        const body = { title, content };
        await fetch(`http://localhost:3000/api/post`, {
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

export async function getStaticProps() {
  return { props: { pass: process.env.PASS } };
}

export default Draft;
