import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

const Hero = (props: Props) => {
  return (
    <Box sx={{ height: "100vh", width: "100vw", boxSizing: "border-box", margin: 0 }}>
      <Image
        fill
        src="/hero.avif"
        sizes="100vw"
        alt="Hero Image"
        style={{ position: "absolute" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          gap: 4
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "48px",
            fontWeight: "bold",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            lineHeight: 1.2,
            marginTop: '20vmin'
          }}
        >
          Your Financial Prosperity Starts <br /> with the Right Vision
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontSize: "24px",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          Transform your relationship with money
        </Typography>

        <Button variant="outlined" sx={{ color: "white", borderColor: "white", py:1.5, px: 1.7, ":hover": {
          backgroundColor: 'white', color: 'var(--color-text-primary)', borderColor: 'var(--color-text-primary)'
        }}}>Explore</Button>
      </Box>
    </Box>
  );
};

export default Hero;
