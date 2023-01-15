import { SessionProvider } from "next-auth/react";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/apollo-client";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <Toaster />
      </SessionProvider>
    </ApolloProvider>
  );
}
