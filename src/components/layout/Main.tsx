import React from "react";
import { main } from "#styles/layout/main.module.scss";

interface Props {
  children: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
  return <div className={main}>{children}</div>;
};

export default Main;
