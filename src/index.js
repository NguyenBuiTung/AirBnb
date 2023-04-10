import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { store } from "./redux/configStores";
import HomeTemPlate from "./templates/HomeTemPlate";
import { PrivateRouter } from "./components/PrivateRouter";
import ReponsiveItem from "./Hoc/ReponsiveItem";
import DetailMobile from "./pages/DetailMobile";
import Loading from "./components/Loading";



const Home = React.lazy(() => import("./pages/Home"));
const Detail = React.lazy(() => import("./pages/Detail"));
const Login = React.lazy(() => import("./pages/Login"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Payment = React.lazy(() => import("./pages/Payment"));
export const history = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <React.Suspense fallback={<div><Loading/></div>}>
        <Routes>
          <Route path="/" element={<HomeTemPlate />}>
            <Route index element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/room">
              <Route path=":id" element={<ReponsiveItem component={Detail} mobileComponent={DetailMobile} />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path='/' element={<PrivateRouter />}>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/payment" element={<Payment />}></Route>
            </Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
            <Route path="*" element={<Navigate to={""} />}></Route>
          </Route>
        </Routes>
        <ToastContainer />
      </React.Suspense>
    </HistoryRouter>
  </Provider>
);
