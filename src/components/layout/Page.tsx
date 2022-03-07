import React from "react";
import "#styles/base/index.scss";
import { page } from "#styles/layout/page.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Page: React.FC<Props> = ({ children, className }) => {
  return (
    <main className={`${page} ${className ? className : ""}`}>{children}</main>
  );
};

export default Page;
