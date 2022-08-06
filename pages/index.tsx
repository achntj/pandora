import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Feed from "../components/Feed";

export const getServerSideProps: GetServerSideProps = async () => {
  let feed = await prisma.post.findMany({ where: { complete: false } });
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
    <div>
      <Layout>
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
        <p className="font-bold">Showing only unread notes.</p>
        <Feed props={props} unread={true} />
      </Layout>
    </div>
  );
};

export default Home;
