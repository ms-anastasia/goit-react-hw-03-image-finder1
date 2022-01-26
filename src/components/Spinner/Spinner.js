import React from "react";
import { css } from "@emotion/react";

import BeatLoader from "react-spinners/BeatLoader";

const Spinner = () => {
    return (
        <BeatLoader color= "#D7366E"  size={50} css={override}/>
    );
};

export default Spinner;

const override = css`
  display: block;
  margin-left: 45%;
  margin-top: 20%;
  border-color: red;
`;