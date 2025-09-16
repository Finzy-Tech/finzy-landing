"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Grid,
  Paper,
  Tooltip,
  Slider,
  Tabs,
  Tab,
} from "@mui/material";
import { use } from "react";
import Image from "next/image";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SpeedIcon from "@mui/icons-material/Speed";

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

  // Dummy bar chart data
  const chartData = [
    { label: "Bank Account", value: 17.2, color: "#bdbdbd" },
    { label: "Gold", value: 29.69, color: "#64b5f6" },
    { label: "Category Avg", value: 32.22, color: "#64b5f6" },
    { label: "This fund", value: 42.21, color: "#43a047" },
  ];

  function formatLakh(val: number) {
    return `₹${val.toLocaleString("en-IN", { maximumFractionDigits: 2 })} L`;
  }

  const [tab, setTab] = useState(0);
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);

  // Calculation logic (dummy for now)
  const totalInvestment = monthly * 12 * years;
  const corpus = 4221000; // ₹42.21 L
  const profit = corpus - totalInvestment;
  const absReturn = ((corpus / totalInvestment - 1) * 100).toFixed(2);

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
              <Chip
                label="Equity"
                variant="outlined"
                size="small"
                sx={{ p: 1, color: "grey" }}
              />
              <Chip
                label="Moderate Risk"
                variant="outlined"
                size="small"
                sx={{ p: 1, color: "grey" }}
              />
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
      <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Top summary */}
        <Paper sx={{ p: 2, display: "flex", gap: 4 }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              NAV as of Sep 15, 2025
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              ₹120.26{" "}
              <Typography
                component="span"
                variant="body2"
                color="success.main"
                sx={{ fontWeight: 500, ml: 1 }}
              >
                +0.03%
              </Typography>
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                1 day change
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Returns since inception
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "success.main" }}
            >
              23.98%{" "}
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 400 }}
              >
                p.a.
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              ET Money Rank
            </Typography>
            <Tooltip title="Genius benefit">
              <Chip
                icon={<EmojiEventsIcon sx={{ color: "#fbc02d" }} />}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Genius
                    </Typography>
                    <StarIcon sx={{ color: "#fbc02d", fontSize: 16 }} />
                  </Box>
                }
                size="small"
                sx={{
                  bgcolor: "#fffde7",
                  border: "1px solid #ffe082",
                  ml: 1,
                  fontWeight: 600,
                }}
              />
            </Tooltip>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              AUM (Fund size)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              ₹34,780 Cr
            </Typography>
          </Box>
        </Paper>

        {/* Historical NAV & returns */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Historical NAV & returns
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            NAV: <b>₹120.26</b> as on Mon Sep 15 2025
          </Typography>
          {/* Chart Tabs */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {["1M", "3M", "6M", "1Y", "3Y", "5Y", "Max"].map((label, idx) => (
              <Chip
                key={label}
                label={label}
                color={label === "5Y" ? "primary" : "default"}
                variant={label === "5Y" ? "filled" : "outlined"}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            ))}
          </Box>
          {/* Chart Placeholder */}
          <Box
            sx={{
              height: 260,
              width: "100%",
              bgcolor: "#f5f7fa",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
              position: "relative",
            }}
          >
            {/* Replace this with a real chart */}
            <Typography color="text.secondary" sx={{ opacity: 0.5 }}>
              [Chart goes here]
            </Typography>
            {/* Legend */}
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                right: 24,
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 4,
                    bgcolor: "#1976d2",
                    borderRadius: 1,
                    mr: 0.5,
                  }}
                />
                <Typography variant="caption">This fund</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 4,
                    bgcolor: "#ffb300",
                    borderRadius: 1,
                    mr: 0.5,
                  }}
                />
                <Typography variant="caption">Category average</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 2, mx: "auto" }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Motilal Oswal Midcap Fund overview
          </Typography>
          <Grid container spacing={1}>
            {/* Expense ratio */}
            <Grid size={{ xs: 6 }}>
              <Typography>Expense ratio</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>
                0.69%
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  as on Aug 31, 2025
                </Typography>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* Exit load */}
            <Grid size={{ xs: 6 }}>
              <Typography>
                Exit load
                <Tooltip title="Fee charged if you redeem before a certain period">
                  <InfoOutlinedIcon
                    fontSize="small"
                    sx={{ ml: 0.5, verticalAlign: "middle", color: "grey.500" }}
                  />
                </Tooltip>
              </Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>
                1.0%
                <Tooltip title="Fee charged if you redeem before a certain period">
                  <InfoOutlinedIcon
                    fontSize="small"
                    sx={{ ml: 0.5, verticalAlign: "middle", color: "grey.500" }}
                  />
                </Tooltip>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* AUM */}
            <Grid size={{ xs: 6 }}>
              <Typography>AUM (Fund size)</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>₹34,780 Cr</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* Lock-in Period */}
            <Grid size={{ xs: 6 }}>
              <Typography>Lock-in Period</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>Nil</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* Age */}
            <Grid size={{ xs: 6 }}>
              <Typography>Age</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>
                11 yrs 7 m
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  since Feb 03, 2014
                </Typography>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* Benchmark */}
            <Grid size={{ xs: 6 }}>
              <Typography>Benchmark</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>NIFTY Midcap 150 TRI</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* Min. investment */}
            <Grid size={{ xs: 6 }}>
              <Typography>Min. investment</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>SIP: ₹500 & Lumpsum: ₹1000</Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* Risk */}
            <Grid size={{ xs: 6 }}>
              <Typography>Risk</Typography>
            </Grid>
            <Grid
              size={{ xs: 6 }}
              sx={{ py: 1, display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ mr: 1 }}>Very High</Typography>
              <SpeedIcon sx={{ color: "#e53935", mr: 0.5 }} />
              <EmojiEmotionsIcon sx={{ color: "#43a047" }} />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* STCG */}
            <Grid size={{ xs: 6 }}>
              <Typography>Short term capital gains (STCG)</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>
                Returns taxed at 20% if you redeem before 1 year
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Divider />
            </Grid>

            {/* LTCG */}
            <Grid size={{ xs: 6 }}>
              <Typography>Long term capital gains (LTCG)</Typography>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Typography>
                After 1 year, returns above ₹1.25 lakh in a financial year are
                taxed at 12.5%
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* SIP Calculator */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Motilal Oswal Midcap Fund Returns calculator
          </Typography>
          <Grid container spacing={3}>
            {/* Left: Controls */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Investment type
              </Typography>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{ minHeight: 32, mb: 2 }}
              >
                <Tab
                  label="Monthly SIP"
                  sx={{
                    minHeight: 32,
                    fontWeight: tab === 0 ? 600 : 400,
                    color: tab === 0 ? "primary.main" : "text.primary",
                  }}
                />
                <Tab
                  label="Lumpsum"
                  sx={{
                    minHeight: 32,
                    fontWeight: tab === 1 ? 600 : 400,
                    color: tab === 1 ? "primary.main" : "text.primary",
                  }}
                />
              </Tabs>
              <Typography sx={{ mb: 1, mt: 2 }}>
                Monthly investment
                <span style={{ float: "right", fontWeight: 600, fontSize: 20 }}>
                  ₹{monthly.toLocaleString("en-IN")}
                </span>
              </Typography>
              <Slider
                value={monthly}
                min={1000}
                max={100000}
                step={1000}
                onChange={(_, v) => setMonthly(Number(v))}
                sx={{
                  color: "success.main",
                  mb: 3,
                  mt: 1,
                }}
              />
              <Typography sx={{ mb: 1 }}>
                Investment period
                <span style={{ float: "right", fontWeight: 600, fontSize: 20 }}>
                  {years} Yr
                </span>
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setYears((y) => Math.max(1, y - 1))}
                  sx={{ minWidth: 36, fontWeight: 700 }}
                >
                  –
                </Button>
                <Typography>{years} Yr</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setYears((y) => Math.min(30, y + 1))}
                  sx={{ minWidth: 36, fontWeight: 700 }}
                >
                  +
                </Button>
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 3 }}
              >
                Disclaimer: Products compared like fixed deposits may provide
                fixed guaranteed returns. Mutual Funds investments are...
                <span style={{ color: "#43a047", cursor: "pointer" }}>
                  read more
                </span>
              </Typography>
            </Grid>

            {/* Right: Chart & Results */}
            <Grid size={{ xs: 12 }}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f8fbfd",
                  height: "100%",
                  minHeight: 340,
                }}
              >
                {/* Bar Chart */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    height: 140,
                    mb: 2,
                    gap: 2,
                  }}
                >
                  {chartData.map((d, i) => (
                    <Box
                      key={d.label}
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: `${d.value * 3}px`,
                          bgcolor: d.color,
                          borderRadius: 1,
                          mb: 0.5,
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            position: "absolute",
                            top: -22,
                            left: "50%",
                            transform: "translateX(-50%)",
                            fontWeight: 600,
                            color: d.color === "#43a047" ? "#43a047" : "#222",
                          }}
                        >
                          {formatLakh(d.value)}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {d.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                {/* Legend */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 8,
                      bgcolor: "#bdbdbd",
                      mr: 0.5,
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Total investment
                  </Typography>
                  <Box
                    sx={{
                      width: 16,
                      height: 8,
                      bgcolor: "#43a047",
                      mr: 0.5,
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Profit
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                {/* Corpus & returns */}
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total investment
                    <span style={{ float: "right", fontWeight: 600 }}>
                      ₹{(totalInvestment / 100000).toFixed(2)} Lacs
                    </span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Profit
                    <span style={{ float: "right", fontWeight: 600 }}>
                      ₹{(profit / 100000).toFixed(2)} Lacs
                    </span>
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Total corpus
                  <span style={{ float: "right", fontWeight: 700 }}>
                    ₹{(corpus / 100000).toFixed(2)} Lacs
                  </span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#43a047", fontWeight: 600, mt: 1 }}
                >
                  Absolute return{" "}
                  <span style={{ float: "right" }}>{absReturn}%</span>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* SIP Status */}
        <Paper sx={{ p: 3 }}>
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
        </Paper>
      </Box>
    </Box>
  );
}
