import "../styles/globals.css";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const Noop = ({ children }: Props) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Noop;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
