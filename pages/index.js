import Head from "next/head";
import { Roboto } from "next/font/google";
import "@fontsource/public-sans";
import HomePage from "../components/Homepage";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function index({ user }) {

  return (
    <>
      <Head>
        <title>FridayFinder</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomePage></HomePage>
      </main>
    </>
  );
}
