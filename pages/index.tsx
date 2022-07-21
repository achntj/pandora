import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  let feed = await prisma.post.findMany();
  feed = JSON.parse(JSON.stringify(feed));
  feed = feed.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Home: React.FC<Props> = (props) => {
  const [showUnread, setShowUnread] = useState(false);
  return (
    <Layout>
      <div>
        <h1>Pandora's Box</h1>
        <p>
          A place where{" "}
          <a target="_blank" rel="noreferrer" href="https://achintyajha.com/">
            Achintya
          </a>{" "}
          drops stuff from his phone to get back to later.
        </p>
        <p className="text-sm">
          Built on top of{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/achintyajha/dynote"
          >
            Dynote
          </a>
          .
        </p>
        <div className="space-x-4 flex items-center">
          <label>Unread Only</label>
          <input
            type="checkbox"
            onClick={() => setShowUnread(!showUnread)}
            checked={showUnread}
          ></input>
        </div>
        <hr />
        <main>
          {props.feed.length == 0 ? (
            <p>(Nothing to see here) ʕ•ᴥ•ʔ</p>
          ) : (
            props.feed.map((post, index) => (
              <div
                key={post.id}
                className={`${
                  showUnread && post.complete && "hidden"
                } my-2 border-b-2 border-zinc-900`}
              >
                <p className="m-0">
                  #{props.feed.length - index} |{" "}
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <Post post={post} />
              </div>
            ))
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Home;
