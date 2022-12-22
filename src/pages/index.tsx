import { type NextPage } from "next";
import Head from "next/head";
import AddMedia from "../components/AddMedia";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.media.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Social Delinquents Media Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col space-y-5 p-4 dark:bg-slate-800 dark:text-white">
        <h1 className="text-center text-2xl font-bold">
          Social Delinquents Media Club
        </h1>
        <AddMedia />
        {data &&
          data.map((media, index) => {
            return <div key={index}>{media.name}</div>;
          })}
      </main>
    </>
  );
};

export default Home;
