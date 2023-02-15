import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "../Redux/Store";
import "react-toastify/dist/ReactToastify.css";
import ToastifyContainer from "../Components/Toast/ToastifyContainer/ToastifyContainer";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Layout from "../Components/Layouts/Layout";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <ProtectedRoutes>
            <Component {...pageProps} />
            <ToastifyContainer />
          </ProtectedRoutes>
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
