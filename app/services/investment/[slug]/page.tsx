"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { use } from "react";
import Image from "next/image";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [sipAmount, setSipAmount] = useState(1000);
  const [sipDuration, setSipDuration] = useState(12);
  const [sipReturnRate, setSipReturnRate] = useState(12);

  // SIP Calculator
  const monthlyRate = sipReturnRate / 12 / 100;
  const futureValue =
    sipAmount *
    ((Math.pow(1 + monthlyRate, sipDuration) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const sips = [
    {
      fund: "Finzy Growth Fund",
      frequency: "Monthly",
      nextDue: "2025-09-15",
      status: "Active",
    },
    {
      fund: "Finzy Secure Fund",
      frequency: "Weekly",
      nextDue: "2025-09-12",
      status: "Paused",
    },
  ];

  return (
    <Box sx={{ width: "100%", bgcolor: "var(--color-background)" }}>
      <Paper
        sx={{
          width: "100%",
          display: "flex",
          py: 4,
          px: 8,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Image src="/mf.jpg" alt="Fund Image" width={100} height={100} />
          <Box>
            <Typography variant="h4" gutterBottom>
              Finzy Growth Fund
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Chip label="Equity" variant="outlined" size="small" sx={{p: 1, color: "grey"}} />
              <Chip label="Moderate Risk" variant="outlined" size="small" sx={{p: 1, color: "grey"}} />
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            style={{
              marginTop: "8px",
              backgroundColor: "var(--color-text-primary)",
              color: "var(--color-background)",
              padding: "10px 20px",
              width: "15rem",
              borderRadius: "4rem",
            }}
          >
            Invest Now
          </Button>
        </Box>
      </Paper>
      <Box sx={{ p: 4 }}>
        {/* SIP Calculator */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              SIP Calculator
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={12}>
                <TextField
                  label="Monthly SIP Amount"
                  type="number"
                  fullWidth
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Number(e.target.value))}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Duration (months)"
                  type="number"
                  fullWidth
                  value={sipDuration}
                  onChange={(e) => setSipDuration(Number(e.target.value))}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  label="Expected Annual Return (%)"
                  type="number"
                  fullWidth
                  value={sipReturnRate}
                  onChange={(e) => setSipReturnRate(Number(e.target.value))}
                />
              </Grid>
            </Grid>
            <Typography>
              Future Value: <b>₹{futureValue.toFixed(2)}</b>
            </Typography>
          </CardContent>
        </Card>

        {/* SIP Status */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              SIP Status
            </Typography>
            <List>
              {sips.map((sip, idx) => (
                <React.Fragment key={idx}>
                  <ListItem>
                    <ListItemText
                      primary={sip.fund}
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Frequency: {sip.frequency} | Next Due: {sip.nextDue}
                          </Typography>
                          <br />
                          <Chip
                            label={sip.status}
                            color={
                              sip.status === "Active"
                                ? "success"
                                : sip.status === "Paused"
                                ? "warning"
                                : "default"
                            }
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        </>
                      }
                    />
                  </ListItem>
                  {idx < sips.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
