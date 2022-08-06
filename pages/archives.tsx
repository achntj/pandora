import Layout from "../components/Layout";
import { GetServerSideProps } from "next";
import { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Feed from "../components/Feed";

export const getServerSideProps: GetServerSideProps = async () => {
  let feed = await prisma.post.findMany({ where: { complete: true } });
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

const Archives: React.FC<Props> = (props) => {
  return (
    <div>
      <Layout>
        <h1>Archives</h1>
        <p>Completed / read posts and notes.</p>
        <Feed props={props} unread={false} />
      </Layout>
    </div>
  );
};

export default Archives;
