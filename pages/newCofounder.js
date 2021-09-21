import Head from "next/head";
import "tailwindcss/tailwind.css";
import Link from "next/link";

function newCofounder() {
  return (
    <>
      <Head>
        <title>Submit new Cofounder</title>
      </Head>
      <div className="flex flex-col justify-center items-center ">
        <button>
          <Link href="/">Back</Link>
        </button>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shrLb79cCszcBQvsa?backgroundColor=purple"
          frameBorder="0"
          width="100%"
          height="1700"
        ></iframe>
      </div>
    </>
  );
}

export default newCofounder;
