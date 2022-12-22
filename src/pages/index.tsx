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
        <div className="flex flex-row justify-center space-x-5">
          <div className="flex w-1/3 max-w-md grow-0 flex-col">
            <AddMedia />
          </div>
          {data && (
            <div className="w-2/3">
              <div className="grid grid-cols-5 items-center p-1 text-lg font-bold">
                <span>Name</span>
                <span>Genre</span>
                <span>Watched</span>
                <span>People Watched</span>
                <span>Media Type</span>
              </div>
              <div className="space-y-3">
                {data.map((media, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-5 p-2 odd:bg-slate-900"
                    >
                      <span>{media.name}</span>
                      <span>{media.genre}</span>
                      <span>{media.watched ? "Yes" : "No"}</span>
                      <span>{null}</span>
                      <span>{media.type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
