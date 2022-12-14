import "src/styles/mantineBase.css";
import "src/styles/tailwind.css";
import { NotificationsProvider } from "@mantine/notifications";
import type { CustomAppPage } from "next/app";
import { AppMantineProvider, GlobalStyleProvider } from "src/lib/mantine";
import Head from "next/head";

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <>
      <Head>
        <title>Web-Exprenses</title>
      </Head>
      <GlobalStyleProvider>
        <AppMantineProvider>
          <NotificationsProvider position="bottom-right">
            <main role="main">{getLayout(<Component {...pageProps} />)}</main>
          </NotificationsProvider>
        </AppMantineProvider>
      </GlobalStyleProvider>
    </>
  );
};

export default App;
