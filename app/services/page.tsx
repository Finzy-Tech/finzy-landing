import { Box, Button, Stack, Typography } from "@mui/material";
import { SERVICES } from "../constants/constants";

const ServiceStack = ({
  title,
  description,
  price,
  priceText,
}: {
  title: string;
  description: string;
  price: string;
  priceText: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        p: 2,
        borderTop: "1px solid var(--color-text-primary)",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 0.4,
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{ fontSize: "2rem", color: "var(--color-text-primary)" }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ fontSize: "1.1rem", color: "var(--color-text-primary)" }}
        >
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 0.4,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "var(--color-text-primary)" }}>
          {price}
        </Typography>
        <Typography sx={{ color: "var(--color-text-primary)" }}>
          {priceText}
        </Typography>
      </Box>
      <Button
        style={{
          backgroundColor: "var(--color-text-primary)",
          color: "var(--color-background)",
          flex: 0.2,
        }}
      >
        Book Now
      </Button>
    </Box>
  );
};

export default function Services() {
  return (
    <Box
      sx={{
        backgroundColor: "var(--color-background)",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "90%",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "90%",
            margin: "0 auto",
            pt: 5,
          }}
        >
          <Typography
            sx={{ fontSize: "3rem", color: "var(--color-text-primary)" }}
          >
            Financial Programs
          </Typography>
          <Typography
            sx={{
              color: "var(--color-text-primary)",
              fontSize: "2rem",
              width: "60%",
              margin: "0 auto",
            }}
          >
            We offer a variety of financial programs to help you achieve your
            goals.
          </Typography>
        </Box>

        <Stack sx={{ width: "70%", mt: 5 }}>
          {SERVICES.map((service) => (
            <ServiceStack
              key={service.title}
              title={service.title}
              description={service.description}
              price={service.price}
              priceText={service.priceText}
            />
          ))}
          <hr />
        </Stack>
      </Box>
    </Box>
  );
}
