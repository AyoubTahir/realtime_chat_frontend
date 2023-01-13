import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Auth from "../components/Auth";
import Chat from "../components/Chat";

export default function Home() {
  const { data: session } = useSession();

  //console.log("---->", session);

  const reloadSession = () => {};

  return (
    <>
      <Head>
        <title>Chaty</title>
        <meta name="description" content="Real Time Chat App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        {session?.user.username ? (
          <Chat />
        ) : (
          <Auth session={session} reloadSession={reloadSession} />
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
