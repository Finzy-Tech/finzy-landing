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
  );
}
