import React from "react";
import GenImage from "../../../components/GenImage/GenImage";
import ReduxProvider from "../../../redux/ReduxProvider";

const GenImg = () => {
  return (
    <div>
      <ReduxProvider>
        <GenImage />
      </ReduxProvider>
    </div>
  );
};

export default GenImg;
