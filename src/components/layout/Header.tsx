import React from "react";

import { header, title } from "#styles/layout/header.module.scss";

const Header = () => {
  return (
    <header className={header}>
      <h1 className={title}>Wordle</h1>
    </header>
  );
};

export default Header;
