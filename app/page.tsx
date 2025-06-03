import React from "react";
import { Login, LoginPage } from "./components";

const Home = () => {
  return (
    <div className="w-screen h-screen flex">
      <LoginPage />
      <Login />
    </div>
  );
};

export default Home;
