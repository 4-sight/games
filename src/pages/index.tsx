import React from "react";
import Page from "#components/layout/Page";
import { Link } from "gatsby";

import { title, links, pageLink } from "#styles/pages/home.module.scss";

// markup
const IndexPage = () => {
  return (
    <Page>
      <>
        <h1 className={title}>Games</h1>
        <ul className={links}>
          <li>
            <Link to="/games/wordle" className={pageLink}>
              Wordle
            </Link>{" "}
          </li>
        </ul>
      </>
    </Page>
  );
};

export default IndexPage;
