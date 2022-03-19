import "bootstrap/dist/css/bootstrap.css";
import "../src/style.scss";
import { BasicLayout } from "@/layouts";

function App({ Component, pageProps }) {
  return (
    <BasicLayout>
      <Component {...pageProps} />
    </BasicLayout>
  );
}

export default App;
