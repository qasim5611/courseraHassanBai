import { Box } from "@mui/system";
import React from "react";

const LoadingSvg = () => {
  return (
    <div>
      <Box
        width="100%"
        height="100%"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#10192447",
          position: "absolute !important",
          zIndex: "9999",
          left: "16px",
          top: "199px",
        }}
        
      >
        <section className="sec-loading">
          <div className="one"></div>
        </section>
      </Box>
    </div>
  );
};

export default LoadingSvg;
