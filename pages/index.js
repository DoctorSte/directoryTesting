import Head from "next/head";
import "tailwindcss/tailwind.css";
import Airtable from "airtable";
import { useEffect, useState } from "react";
import Founder from "../components/Founder";
import Link from "next/link";

const base = new Airtable({ apiKey: "keynbSweRZKkwmlQX" }).base(
  "appvWRAi4zf0BYTR3"
);

export default function Home() {
  const [founders, setFounders] = useState([]);

  useEffect(() => {
    base("Looking for Cofounders")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setFounders(records);
        console.log(records);
        fetchNextPage();
      });
  }, []);

  return (
    <>
      <Head>
        <title>Startup Mercenaries</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className=" min-h-screen bg-black flex flex-col gap-4 px-40 items-start justify-center text-white">
        <h3>Cofounders:</h3>

        <div className="grid grid-cols-5 gap-4">
          {founders.map((founder) => (
            <Founder key={founder.id} founder={founder} />
          ))}
        </div>

        <Link href="/newCofounder">
          <button className="p-4 rounded-md bg-indigo-500 hover:bg-indigo-800 w-40 flex justify-center">
            Add your info
          </button>
        </Link>
      </div>
    </>
  );
}
