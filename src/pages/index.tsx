import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Social Delinquents Media Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col p-2 dark:bg-slate-800 dark:text-white">
        <h1 className="text-center text-2xl font-bold">
          Social Delinquents Media Club
        </h1>
      </main>
    </>
  );
};

export default Home;
