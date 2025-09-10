import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "red",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Upper Section */}
      <Box
        sx={{
          display: "flex",
          px: 10,
          py: 24,
          width: "100%",
          justifyContent: "center",
          gap: 20,
          backgroundColor: "var(--color-background)",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "3.4rem",
              color: "var(--color-text-primary)",
              textAlign: "left",
              mb: 2,
              lineHeight: 1.2,
              fontFamily: "PlayfairDisplayBold, serif",
            }}
          >
            Why Use Our <br />
            Services
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "flex-start",
            justifyContent: "center",
            width: "40%",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              color: "var(--color-text-primary)",
              textAlign: "left",
              maxWidth: "800px",
              fontFamily: "var(--font-family-bold)",
            }}
          >
            Our services are designed to provide you with the best experience
            possible. We prioritize customer satisfaction and strive to exceed
            your expectations. With a team of dedicated professionals, we ensure
            that every aspect of our service is tailored to meet your needs.
            Choose us for reliable, efficient, and high-quality solutions that
            you can trust.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: "var(--color-text-primary)",
              borderColor: "var(--color-text-primary)",
              fontFamily: "PlayfairDisplay, serif",
              py: 1.5,
              px: 1.7,
              ":hover": {
                backgroundColor: "var(--color-text-primary)",
                color: "white",
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>

      {/* Lower Section */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "var(--color-text-primary)",
          display: "flex",
          px: 10,
          gap: 10,
          py: 5,
        }}
      >
        <Box sx={{ width: "45%" }}>
          <Box>
            <Image
              src={"/About.jpg"}
              alt="About Image"
              width={600}
              height={200}
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", width: "45%", margin: 'auto 0' }}>
          <Typography
            sx={{
              fontSize: "3.2rem",
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              mb: 2,
              fontFamily: "PlayfairDisplaySemiBold, serif",
            }}
          >
            About Us
          </Typography>

          <Typography
            sx={{
              fontSize: "1.3rem",
              fontWeight: 400,
              color: "var(--color-text-secondary)",
              fontFamily: "PlayfairDisplay, serif",
            }}
          >
            Our services are designed to provide you with the best experience
            possible. We prioritize customer satisfaction and strive to exceed
            your expectations at every step. By understanding your unique
            requirements, we tailor our solutions to ensure you receive
            personalized support and outstanding results. Our commitment to
            excellence drives us to continuously improve and innovate, so you
            always benefit from the latest advancements in our field.
            <br />
            <br />
            With a team of dedicated professionals, we guarantee reliability,
            efficiency, and high-quality service you can trust. We believe in
            building long-term relationships with our clients, focusing on
            transparency and integrity in all our interactions. Choose us for
            solutions that not only meet your needs but also empower you to
            achieve your goals with confidence and peace of mind.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
