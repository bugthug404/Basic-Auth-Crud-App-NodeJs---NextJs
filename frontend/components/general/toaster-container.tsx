import React from "react";
import {
  ToastContainer as PackagedToastContainer,
  ToastContainerProps,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToasterContainer(props: ToastContainerProps) {
  return <PackagedToastContainer {...props} position="top-right" />;
}

export default ToasterContainer;
