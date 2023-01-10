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
      <main className="flex min-h-screen flex-col space-y-10 p-4 dark:bg-slate-800 dark:text-white">
        <h1 className="text-center text-4xl font-bold underline underline-offset-8">
          Social Delinquents Media Club
        </h1>
        <div className="flex flex-row justify-center space-x-4">
          <div className="flex w-1/3 max-w-md grow-0 flex-col">
            <AddMedia />
          </div>
          {data && (
            <div className="w-2/3">
              <h3 className="mb-5 text-center text-2xl font-extrabold">
                The List
              </h3>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="rounded-l bg-slate-900 p-4 pl-8 text-left font-medium">
                      Name
                    </th>
                    <th className="bg-slate-900 p-4 text-left font-medium">
                      Genre
                    </th>
                    <th className="bg-slate-900 p-4 text-left font-medium">
                      Watched
                    </th>
                    <th className="bg-slate-900 p-4 text-left font-medium">
                      Who Watched
                    </th>
                    <th className="rounded-r bg-slate-900 p-4 text-left font-medium">
                      Media Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((media, index) => {
                    return (
                      <tr key={index} className="even:bg-slate-700">
                        <td className="py-2 px-4">{media.name}</td>
                        <td className="py-2 px-4">{media.genre}</td>
                        <td className="py-2 px-4">
                          {media.watched ? "Yes" : "No"}
                        </td>
                        <td className="py-2 px-4">-</td>
                        <td className="py-2 px-4">{media.type}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
