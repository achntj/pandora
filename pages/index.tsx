import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
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
        <hr />
        <main>
          {props.feed.length == 0 ? (
            <p>(Nothing to see here) ʕ•ᴥ•ʔ</p>
          ) : (
            props.feed.map((post, index) => (
              <div
                key={post.id}
                className="my-2 border-b-2 dark:border-slate-500"
              >
                <p className="m-0">
                  #{index + 1} | {new Date(post.date).toLocaleDateString()}
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
