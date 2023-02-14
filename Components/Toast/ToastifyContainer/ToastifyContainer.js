import React from "react";
import { ToastContainer } from "react-toastify";
import { TOSTIFY_TIMEOUT } from "../../../Utilis/Utilis";

const ToastifyContainer = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={TOSTIFY_TIMEOUT}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        pauseOnVisibilityChange
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default ToastifyContainer;
