import Head from "next/head";
import "tailwindcss/tailwind.css";

function newCofounder() {
  return (
    <>
      <Head>
        <title>Submit new Cofounder</title>
      </Head>
      <div class="flex flex-col justify-center items-center ">
        <a href="/">Back</a>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shrLb79cCszcBQvsa?backgroundColor=purple"
          frameborder="0"
          onmousewheel=""
          width="100%"
          height="1700"
        ></iframe>
      </div>
    </>
  );
}

export default newCofounder;
