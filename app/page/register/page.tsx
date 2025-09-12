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
  Select,
  MenuItem,
} from "@mui/material";
import axiosInstance from "@/app/utils/axios";

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
    gender: "",
    profilePicture: "",
  });
  const [error, setError] = useState<string>("");

  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!(window as any).cloudinary) {
      console.log("Cloudinary script not loaded!");
      return;
    }

    cloudinaryRef.current = (window as any).cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      },
      (error: unknown, result: any) => {
        if (error) console.log("Cloudinary widget error:", error);
        if (result?.event === "success") {
          setForm((prev) => ({
            ...prev,
            profilePicture: result.info.secure_url,
          }));
        }
      }
    );
  }, []);

  const openWidget = (e: React.MouseEvent) => {
    e.preventDefault();
    widgetRef.current.open();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword ||
      !form.gender ||
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
    axiosInstance.post("/people/register", form)
      .then(response => {
        console.log("Registration successful:", response.data);
      })
      .catch(error => {
        setError("Registration failed.");
        console.error("Registration error:", error);
      });
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
          <Grid size={{ xs: 6 }}>
            <StyledTextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
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
          <Grid size={{ xs: 6 }}>
            <StyledTextField
              label="Age"
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <Select
              labelId="gender"
              id="gender"
              value={form.gender}
              label="Gender"
              name="gender"
              onChange={(e) => handleChange(e as any)}
              sx={{width: "100%"}}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InputLabel
              htmlFor="profilePicture"
              sx={{ color: "var(--color-text-primary)" }}
            >
              Profile Picture
            </InputLabel>

            {form.profilePicture && typeof form.profilePicture === "string" ? (
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  src={form.profilePicture}
                  sx={{ width: 56, height: 56, mt: 2 }}
                />
                <Button
                  variant="outlined"
                  onClick={openWidget}
                  sx={{
                    mt: 1,
                    color: "var(--color-text-primary)",
                    borderColor: "var(--color-text-primary)",
                    fontFamily: "var(--font-family-primary)",
                    height: "fit-content",
                    "&:hover": {
                      borderColor: "var(--color-text-primary)",
                      background: "rgba(0,0,0,0.03)",
                    },
                  }}
                >
                  Upload Image
                </Button>
              </Box>
            ) : (
              <Button
                variant="outlined"
                onClick={openWidget}
                sx={{
                  mt: 1,
                  width: "100%",
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
            )}
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
