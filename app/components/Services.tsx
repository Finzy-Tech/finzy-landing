import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { SERVICE_CARDS } from "../constants/constants";

type Props = {};

const ServiceCard = ({
  title,
  description,
  icon,
  heading
}: {
  title: string;
  description: string;
  icon: string;
  heading: string;
}) => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: 3, maxWidth: 300, alignItems: "center", textAlign: "center"}}>
        <Box>
            <Typography
              sx={{
                fontSize: "1.5rem",
                color: "var(--color-text-primary)",
                mb: 2,
              }}
            >
                {heading}
            </Typography>
        </Box>
      {/* Icon */}
      <Box>
        <Image src={icon} alt="Service Icon" width={300} height={60} />
      </Box>

      {/* Text */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography
          sx={{
            fontWeight: 400,
            color: "var(--color-text-primary)",
            fontSize: "1.3rem",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            color: "var(--color-text-primary)",
            fontSize: "1.3rem",
          }}
        >
          {description}
        </Typography>
      </Box>

      {/* Button */}
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
  );
};

const Services = (props: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "var(--color-background)",
        display: "flex",
        flexDirection: "column",
        padding: "5rem 10rem",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 5,
          textAlign: "center",
        }}
      >
        {/* Section Header */}
        <Typography
          sx={{
            fontSize: "3rem",
            color: "var(--color-text-primary)",
            fontWeight: 700,
          }}
        >
          Financial Programs
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            color: "var(--color-text-primary)",
            maxWidth: 800,
            fontSize: "1.2rem",
          }}
        >
          Our expert team provides a comprehensive suite of financial services
          designed to help you achieve your goals, secure your future, and
          optimize your wealth. Explore our tailored solutions for investment
          planning, retirement strategies, and tax optimization.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 12 }}>
        {/* Service Cards */}
        {SERVICE_CARDS.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            icon={service.icon}
            heading={service.heading}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Services;
