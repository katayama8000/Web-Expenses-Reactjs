import "src/styles/tailwind.css";
import { NotificationsProvider } from "@mantine/notifications";
import type { CustomAppPage } from "next/app";
import { AppMantineProvider, GlobalStyleProvider } from "src/lib/mantine";

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <GlobalStyleProvider>
      <AppMantineProvider>
        <NotificationsProvider position="bottom-left">
          <main role="main">
            {getLayout(<Component {...pageProps} />)}
          </main>
        </NotificationsProvider>
      </AppMantineProvider>
    </GlobalStyleProvider>
  );
};

export default App;
