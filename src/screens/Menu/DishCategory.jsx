import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";

const cardStyle = {
  backgroundColor: "#fff",
  borderRadius: "20px",
  padding: "10px 2%",
  width: "100%",
};

const activeStyle = {
  backgroundColor: "#D20249",
  color: "#fff",
  borderRadius: "20px",
  padding: "10px 2%",
  width: "100%",
};

const DishCategory = ({ children, title, isActive, onClick }) => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={isActive ? activeStyle : cardStyle}
        button
        onClick={onClick}
      >
        <Box width="100%">{children}</Box>
        <Box width="100%">
          <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
            {title}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DishCategory;
