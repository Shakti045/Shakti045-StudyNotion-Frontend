import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/Store";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
     <BrowserRouter>
       <Provider store={store}>
       <GoogleOAuthProvider clientId="321817081179-ku388jlb6fsa7u6gh0mh5vsa983qjebf.apps.googleusercontent.com">
         <App />
       </GoogleOAuthProvider>
         <ToastContainer/>
         <Toaster/>
       </Provider>
   </BrowserRouter>

);
