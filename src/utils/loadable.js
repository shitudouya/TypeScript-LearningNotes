//React路由懒加载
import React from "react";
import Loadable from "react-loadable";

const loadingComponent = () => {
  return <p>loading...</p>;
};

export default (loader, loading = loadingComponent) => {
  return Loadable({
    loader,
    loading,
  });
};
