import { Box, Typography } from "@mui/material";
import React from "react";
import { NAVBAR_LINKS, WEBSITE_TEXT } from "../constants/constants";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getServerSession(authOptions);
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "auto",
        backgroundColor: "var(--color-background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxSizing: "border-box",
        zIndex: 1000,
        p: 2,
        pb: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "90%",
          margin: "0 auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
          <Typography
            sx={{
              color: "var(--color-text-primary)",
              fontSize: "32px",
              fontWeight: "bold",
              fontFamily: "var(--font-family-bold)",
            }}
          >
            {WEBSITE_TEXT.name}
          </Typography>
          <Typography
            sx={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-family-primary)",
            }}
          >
            {WEBSITE_TEXT.description}
          </Typography>
        </Box>

        <hr />

        <Box sx={{ display: "flex", gap: "20px" }}>
          <Box sx={{ display: "flex", gap: "20px" }}>
            {NAVBAR_LINKS.map((link) => (
              <Box sx={{ cursor: "pointer" }} key={link.label}>
                <Link
                  href={link.path}
                  style={{
                    textDecoration: "none",
                    fontFamily: "var(--font-family-primary)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "20px",
              marginLeft: "auto",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "var(--color-text-primary)", width: "fit-content" }}
            >
              {WEBSITE_TEXT.number}
            </Typography>
            <FacebookIcon sx={{ color: "var(--color-text-primary)" }} />
            <InstagramIcon sx={{ color: "var(--color-text-primary)" }} />
            <LinkedInIcon sx={{ color: "var(--color-text-primary)" }} />
            {session ? (
              <Typography
                sx={{
                  color: "var(--color-text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <AccountCircleIcon />
              </Typography>
            ) : (
              <Link href="/page/login" style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: "var(--color-text-primary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                >
                  <AccountCircleIcon />
                  Log In
                </Typography>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
