import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Authentication Error
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Sorry, something went wrong during authentication.<br />
          Please try again or contact support if the problem persists.
        </Typography>
        <Box mt={4}>
          <Link href="/" passHref>
            <Button variant="contained" color="primary">
              Go to Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}