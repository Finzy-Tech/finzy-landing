"use client";

import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Link,
  styled,
  debounce,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

type Props = {};

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

const Login = (props: Props) => {
  const [form, setForm] = React.useState({ email: "", password: "" });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    debouncedSetFormData(name, value);
  };

  const debouncedSetFormData = React.useRef(
    debounce((name: string, value: string) => {
      setForm((prev) => ({ ...prev, [name]: value }));
    }, 300)
  ).current;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Stack spacing={3}>
          <Typography
            sx={{
              color: "var(--color-text-primary)",
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            Login
          </Typography>
          <StyledTextField
            name="email"
            onChange={handleChange}
            label="Email"
            variant="outlined"
            fullWidth
          />
          <StyledTextField
            name="password"
            onChange={handleChange}
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <Button
            style={{
              backgroundColor: "var(--color-text-primary)",
              color: "var(--color-background)",
              fontFamily: "var(--font-family-primary)",
            }}
            onClick={() =>
              signIn("credentials", {
                ...form,
                redirect: false,
              }).then((callback) => {
                if (callback?.error) {
                  console.log("checking error", callback);
                  toast.error("Invalid credentials");
                  return;
                }

                if (callback?.ok) {
                  console.log("login successful", callback);
                  toast.success("Login successful");
                  router.push("/");
                }
              })
            }
          >
            Login
          </Button>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            sx={{
              color: "var(--color-text-primary)",
              borderColor: "var(--color-text-primary)",
              fontFamily: "var(--font-family-primary)",
            }}
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            Login with Google
          </Button>
          <Typography
            sx={{ color: "var(--color-text-primary)", textAlign: "center" }}
          >
            Don't have an account?{" "}
            <Link
              href="/page/register"
              style={{
                color: "var(--color-text-primary)",
                textDecoration: "underline",
                fontFamily: "var(--font-family-primary)",
              }}
            >
              Register
            </Link>
          </Typography>
        </Stack>
      </Paper>
      <Toaster position="top-right" />
    </Box>
  );
};

export default Login;
