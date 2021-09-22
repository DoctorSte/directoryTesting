import Head from "next/head";
import "tailwindcss/tailwind.css";
import Airtable from "airtable";
import { useEffect, useState } from "react";
import Founder from "../components/Founder";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "red" : "black",
    }),
  };

  return (
    <>
      <Head>
        <title>Cofounder List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className=" min-h-screen w-full bg-black flex flex-col gap-4 px-40 items-start justify-center text-white">
        <div className="flex justify-between gap-4 w-full">
          <h3>Cofounders:</h3>
          <div className="flex gap-4">
            <span className="py-1 px-2 bg-indigo-500 rounded-md flex items-center">
              Sort by
              <ChevronRightIcon className="h-5 w-5" />
            </span>
            <span className="flex items-center gap-4">
              I&apos;m a:
              <Select
                isMulti
                className="min-w-max w-40"
                styles={customStyles}
                options={options}
              />
            </span>
            <span className="flex items-center gap-4">
              Looking for
              <Select
                isMulti
                className="min-w-max w-40"
                styles={customStyles}
                options={options}
              />
            </span>
          </div>
        </div>

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
