"use client";

import {
  Box,
  Button,
  debounce,
  Grid,
  Input,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { WEBSITE_TEXT } from "../constants/constants";

type Props = {};

const Contact = (props: Props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const debouncedSetFormData = useMemo(
    () =>
      debounce((name: string, value: string) => {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }, 300),
    []
  );

  const onValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    debouncedSetFormData(e.target.name, e.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 4,
        backgroundColor: "var(--color-background-secondary)",
        p: 6,
        boxSizing: "border-box",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          margin: "auto 0",
        }}
      >
        <Typography
          sx={{
            color: "var(--color-text-primary)",
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "var(--font-family-bold)",
            lineHeight: 1.2,
          }}
        >
          Contact us to find <br /> your way to a happier <br /> financial
          future
        </Typography>
        <Typography
          sx={{
            color: "var(--color-text-primary)",
            fontSize: "1.1rem",
            fontFamily: "var(--font-family-primary)",
          }}
        >
          {WEBSITE_TEXT.address}
        </Typography>
        <Typography
          sx={{
            color: "var(--color-text-primary)",
            fontSize: "1.1rem",
            fontFamily: "var(--font-family-primary)",
          }}
        >
          {WEBSITE_TEXT.number}
        </Typography>
      </Box>
      <Box
        sx={{ width: "40%", display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <InputLabel
              sx={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "1.1rem",
                fontWeight: "500",
                mb: 0.5,
              }}
            >
              First Name
            </InputLabel>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-text-primary)",
                    boxShadow: "none",
                    border: "1px solid var(--color-text-primary)",
                  },
                },
              }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <InputLabel
              sx={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "1.1rem",
                fontWeight: "500",
                mb: 0.5,
              }}
            >
              Last Name
            </InputLabel>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-text-primary)",
                    boxShadow: "none",
                    border: "1px solid var(--color-text-primary)",
                  },
                },
              }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InputLabel
              sx={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "1.1rem",
                fontWeight: "500",
                mb: 0.5,
              }}
            >
              Address
            </InputLabel>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-text-primary)",
                    boxShadow: "none",
                    border: "1px solid var(--color-text-primary)",
                  },
                },
              }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <InputLabel
              sx={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "1.1rem",
                fontWeight: "500",
                mb: 0.5,
              }}
            >
              Email
            </InputLabel>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-text-primary)",
                    boxShadow: "none",
                    border: "1px solid var(--color-text-primary)",
                  },
                },
              }}
              fullWidth
            />
          </Grid>
          <Grid
            size={{ xs: 6 }}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <InputLabel
              sx={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "1.1rem",
                fontWeight: "500",
                mb: 0.5,
              }}
            >
              Phone Number
            </InputLabel>
            <Box
              sx={{
                width: "100%",
                border: "1px solid var(--color-text-primary)",
                borderRadius: "4px",
                padding: "15px 8px",
              }}
            >
              <PhoneInput
                international
                defaultCountry="IN"
                className="phoneInput"
                value={formData.phoneNumber}
                onChange={(value) =>
                  onValueChange({
                    target: { name: "phoneNumber", value: value || "" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InputLabel
              sx={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "1.1rem",
                fontWeight: "500",
                mb: 0.5,
              }}
            >
              Subject
            </InputLabel>
            <TextField
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-text-primary)",
                    boxShadow: "none",
                    border: "1px solid var(--color-text-primary)",
                  },
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InputLabel
              sx={{
                color: "var(--color-text-primary)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "1.1rem",
                fontWeight: "500",
                mb: 0.5,
              }}
            >
              Type your message here...
            </InputLabel>
            <TextField
              multiline
              rows={4}
              variant="outlined"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-text-primary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-text-primary)",
                    boxShadow: "none",
                    border: "1px solid var(--color-text-primary)",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Button
          style={{
            marginTop: "8px",
            backgroundColor: "var(--color-text-primary)",
            color: "var(--color-background)",
            width: "40%",
            alignSelf: "flex-end",
            fontWeight: "600",
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;
