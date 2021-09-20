import Head from "next/head";
import Image from "next/image";
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <div className=" min-h-screen bg-black flex items-center justify-center text-white">
      <Head>
        <title>Latitude</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <p>Test</p>
    </div>
  );
}
