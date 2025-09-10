"use client";

// Add this declaration to let TypeScript know about window.cloudinary
declare global {
  interface Window {
    cloudinary: any;
  }
}

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  InputLabel,
  FormControl,
  Link,
  Grid,
  styled,
} from "@mui/material";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-input, & .MuiInputLabel-root": {
    color: "var(--color-text-primary)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "var(--color-text-primary)",
    },
    "&:hover fieldset": {
      borderColor: "var(--color-text-primary)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--color-text-primary)",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "var(--color-text-primary)",
    opacity: 1,
  },
});

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    profilePicture: null as File | null,
  });
  const [error, setError] = useState<string>("");

  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    if (cloudinaryRef.current) {
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "YOUR_CLOUD_NAME", // Replace with your Cloudinary cloud name
          uploadPreset: "YOUR_UPLOAD_PRESET", // Replace with your unsigned upload preset name
        },
        function (error: unknown, result: any) {
          if (!error && result && result.event === "success") {
            // You can now use result.info.secure_url to display or store the image
            setForm((prev) => ({
              ...prev,
              profilePicture: result.info.secure_url,
            }));
          }
        }
      );
    }
  }, []);

  const openWidget = (e: React.MouseEvent) => {
    e.preventDefault();
    widgetRef.current.open();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files) {
      setForm((prev) => ({
        ...prev,
        profilePicture: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.age
    ) {
      setError("Please fill all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Registration logic here (API call, etc.)
    alert("Registered successfully!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--color-background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          background: "#fff",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          minWidth: 350,
            maxWidth: 500,
        }}
      >
        <Typography
          sx={{
            color: "var(--color-text-primary)",
            mb: 2,
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          Register
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <StyledTextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <StyledTextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <StyledTextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <StyledTextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <StyledTextField
              label="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel
                shrink
                htmlFor="profilePicture"
                sx={{ color: "var(--color-text-primary)" }}
              >
                Profile Picture
              </InputLabel>
              <Button
                variant="outlined"
                onClick={openWidget}
                sx={{
                  mt: 1,
                  color: "var(--color-text-primary)",
                  borderColor: "var(--color-text-primary)",
                  fontFamily: "var(--font-family-primary)",
                  "&:hover": {
                    borderColor: "var(--color-text-primary)",
                    background: "rgba(0,0,0,0.03)",
                  },
                }}
              >
                Upload Image
              </Button>
              {form.profilePicture &&
                typeof form.profilePicture === "string" && (
                  <Avatar
                    src={form.profilePicture}
                    sx={{ width: 56, height: 56, mt: 2 }}
                  />
                )}
            </FormControl>
          </Grid>
        </Grid>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            background: "var(--color-text-primary)",
            mt: 2,
            fontFamily: "var(--font-family-primary)",
          }}
        >
          Register
        </Button>
        <Typography
          sx={{
            mt: 2,
            color: "var(--color-text-primary)",
            textAlign: "center",
          }}
        >
          Already registered?{" "}
          <Link
            href="/page/login"
            sx={{
              color: "var(--color-text-primary)",
              textDecoration: "underline",
              fontFamily: "var(--font-family-primary)",
            }}
          >
            Go back to Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
