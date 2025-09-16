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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  IconButton,
} from "@mui/material";
import { use } from "react";
import Image from "next/image";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SpeedIcon from "@mui/icons-material/Speed";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import AddIcon from "@mui/icons-material/Add";

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

  // Trailing returns data
  const trailingReturns = [
    { period: "1 Month", fund: "2.18%", avg: "1.5%" },
    { period: "3 Months", fund: "4.11%", avg: "2.05%" },
    { period: "6 Months", fund: "18.32%", avg: "20.13%" },
    { period: "1 Year", fund: "-0.26%", avg: "-1.01%" },
    { period: "2 Years", fund: "29.65%", avg: "22.15%" },
    { period: "3 Years", fund: "28.02%", avg: "22.08%" },
    { period: "4 Years", fund: "27.07%", avg: "17.68%" },
    { period: "5 Years", fund: "34.13%", avg: "26.53%" },
    { period: "7 Years", fund: "23.28%", avg: "19.36%" },
    { period: "10 Years", fund: "19.55%", avg: "17.69%" },
  ];

  // Dummy data for 5Y (monthly points)
  const navData = [
    { date: "May '21", fund: 40, avg: 40 },
    { date: "Aug '21", fund: 44, avg: 43 },
    { date: "Nov '21", fund: 48, avg: 46 },
    { date: "Feb '22", fund: 51, avg: 48 },
    { date: "May '22", fund: 53, avg: 50 },
    { date: "Aug '22", fund: 54, avg: 51 },
    { date: "Nov '22", fund: 56, avg: 52 },
    { date: "Feb '23", fund: 60, avg: 54 },
    { date: "May '23", fund: 68, avg: 58 },
    { date: "Aug '23", fund: 80, avg: 65 },
    { date: "Nov '23", fund: 95, avg: 75 },
    { date: "Feb '24", fund: 110, avg: 85 },
    { date: "May '24", fund: 105, avg: 82 },
    { date: "Aug '24", fund: 115, avg: 90 },
    { date: "Nov '24", fund: 120, avg: 95 },
    { date: "Feb '25", fund: 112, avg: 92 },
    { date: "May '25", fund: 118, avg: 97 },
    { date: "Sep '25", fund: 120.26, avg: 100 },
  ];

  const assetAllocation = [
    { name: "Large Cap", value: 21.37, color: "#6fdbe8" },
    { name: "Mid Cap", value: 76.02, color: "#ff9c92" },
    { name: "Small Cap", value: 0, color: "#ffd580" },
    { name: "Other Cap", value: 0, color: "#bdbdbd" },
  ];

  const topHoldings = [
    { name: "Dixon Technologies (India) Ltd.", value: 10.08, color: "#a084e8" },
    { name: "Coforge Ltd.", value: 9.79, color: "#ff6b6b" },
    { name: "Trent Ltd.", value: 9.14, color: "#6fdbe8" },
    { name: "Eternal Ltd.", value: 9.03, color: "#6fdbe8" },
  ];

  const topSectors = [
    { name: "Services", value: 26.86, color: "#a084e8" },
    { name: "Capital Goods", value: 24.97, color: "#ff6b6b" },
    { name: "Technology", value: 19.21, color: "#6fdbe8" },
    { name: "Consumer Discretionary", value: 8.7, color: "#6fdbe8" },
  ];

  const peerFunds = [
    "Motilal Oswal Midcap Fund",
    "Nippon India Growth Mid Cap Fund",
    "HDFC Mid Cap Fund",
    "Kotak Midcap Fund",
    "Edelweiss Mid Cap Fund",
  ];

  const riskRatios = [
    {
      label: "Alpha",
      value: "7.88 vs. 5.57",
      desc: "Higher outperformance against benchmark",
      color: "success.main",
    },
    {
      label: "Sharpe",
      value: "1.18 vs. 5.89",
      desc: "Poor risk-adjusted returns",
      color: "error.main",
    },
    {
      label: "Beta",
      value: "0.89 vs. 0.88",
      desc: "More sensitive to market's ups & downs",
      color: "error.main",
    },
    {
      label: "Standard deviation",
      value: "17.42 vs. 12.97",
      desc: "More volatile performance",
      color: "error.main",
    },
  ];

  const [tabPeer, setTabPeer] = useState(0);

  const fundManagers = [
    { name: "Niket Shah" },
    { name: "Rakesh Shetty" },
    { name: "Ajay Khandelwal" },
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
            Invested
          </Button>
        </Box>
      </Paper>
      <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Top summary */}
        <Paper sx={{ p: 2, display: "flex", justifyContent: "space-around" }}>
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
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Fund Rating
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
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Risk level
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Very High <SpeedIcon sx={{ color: "#e53935", ml: 0.5 }} />
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              SIP Status
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Active | ₹5,000/month
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
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={navData}
                margin={{ left: 10, right: 30, top: 20, bottom: 20 }}
              >
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  domain={["auto", "auto"]}
                  tickFormatter={(v) => `₹${v}`}
                  tick={{ fontSize: 12 }}
                />
                <RechartsTooltip
                  formatter={(value: number) => `₹${value.toFixed(2)}`}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="fund"
                  stroke="#1976d2"
                  strokeWidth={2.5}
                  dot={false}
                  name="This fund"
                />
                <Line
                  type="monotone"
                  dataKey="avg"
                  stroke="#ffb300"
                  strokeWidth={2.5}
                  dot={false}
                  name="Category average"
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{ top: 0, right: 20 }}
                />
              </LineChart>
            </ResponsiveContainer>
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

        {/* Fund Details */}
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

        {/* Trailing Returns */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Trailing returns{" "}
            <span style={{ fontWeight: 400, color: "#888", fontSize: 14 }}>
              as on Sep 16, 2025
            </span>
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Period</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>This fund</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Category average
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trailingReturns.map((row) => (
                  <TableRow key={row.period}>
                    <TableCell>{row.period}</TableCell>
                    <TableCell>{row.fund}</TableCell>
                    <TableCell>{row.avg}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Asset Allocation */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Asset allocation{" "}
            <span style={{ fontWeight: 400, color: "#888", fontSize: 14 }}>
              as on Aug 31, 2025
            </span>
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {/* Donut Chart and Legend */}
            <Grid
              size={{ xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: 180, height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={2}
                    >
                      {assetAllocation.map((entry, idx) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    {/* Center label */}
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="18"
                      fontWeight="600"
                      fill="#888"
                    >
                      Market Cap
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Typography color="success.main" sx={{ fontWeight: 600 }}>
                  Equity 97.39%
                </Typography>
                <Typography color="text.secondary">Debt 0%</Typography>
                <Typography color="text.secondary">Other 2.61%</Typography>
              </Box>
            </Grid>
            {/* Legend */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}
              >
                {assetAllocation.map((item) => (
                  <Box
                    key={item.name}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: item.color,
                        borderRadius: "50%",
                      }}
                    />
                    <Typography variant="body2" sx={{ minWidth: 90 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          {/* Top holdings & sectors */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Top holdings
              </Typography>
              {topHoldings.map((h) => (
                <Box key={h.name} sx={{ mb: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">{h.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {h.value}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: 6,
                      bgcolor: "#f0f0f0",
                      borderRadius: 2,
                      mt: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: `${h.value}%`,
                        height: "100%",
                        bgcolor: h.color,
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Top sectors
              </Typography>
              {topSectors.map((s) => (
                <Box key={s.name} sx={{ mb: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">{s.name}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {s.value}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: 6,
                      bgcolor: "#f0f0f0",
                      borderRadius: 2,
                      mt: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: `${s.value}%`,
                        height: "100%",
                        bgcolor: s.color,
                        borderRadius: 2,
                      }}
                    />
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            sx={{
              color: "#00b050",
              textAlign: "center",
              mt: 2,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Detailed portfolio analysis
          </Typography>
        </Paper>

        {/* Peer Comparison */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Peer comparison
          </Typography>
          <Tabs
            value={tabPeer}
            onChange={(_, v) => setTabPeer(v)}
            sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
          >
            <Tab label="Returns" />
            <Tab label="Risk ratios" />
            <Tab label="Other Details" />
          </Tabs>
          {/* Returns Tab */}
          {tabPeer === 0 && (
            <Box>
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                {["6M", "1Y", "3Y", "5Y", "10Y"].map((label) => (
                  <Chip
                    key={label}
                    label={label}
                    size="small"
                    variant={label === "1Y" ? "filled" : "outlined"}
                    color={label === "1Y" ? "success" : "default"}
                  />
                ))}
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Fund name</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      6M
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      1Y
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      3Y
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      name: "Motilal Oswal Midcap Fund",
                      m6: "18.2%",
                      y1: "32.1%",
                      y3: "22.5%",
                    },
                    {
                      name: "Nippon India Growth Mid Cap Fund",
                      m6: "16.8%",
                      y1: "29.7%",
                      y3: "20.3%",
                    },
                    {
                      name: "HDFC Mid Cap Fund",
                      m6: "17.5%",
                      y1: "31.2%",
                      y3: "21.8%",
                    },
                    {
                      name: "Kotak Midcap Fund",
                      m6: "15.9%",
                      y1: "28.6%",
                      y3: "19.7%",
                    },
                    {
                      name: "Edelweiss Mid Cap Fund",
                      m6: "17.1%",
                      y1: "30.4%",
                      y3: "21.1%",
                    },
                  ].map((fund) => (
                    <TableRow key={fund.name} hover>
                      <TableCell>{fund.name}</TableCell>
                      <TableCell align="right">{fund.m6}</TableCell>
                      <TableCell align="right">{fund.y1}</TableCell>
                      <TableCell align="right">{fund.y3}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                sx={{
                  mt: 1,
                  textTransform: "none",
                  color: "success.main",
                  fontWeight: 600,
                  fontSize: 15,
                }}
                component={Link}
                href="#"
              >
                View all Mid Cap funds
              </Button>
            </Box>
          )}
          {/* Risk Ratios Tab */}
          {tabPeer === 1 && (
            <Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Fund name</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Beta
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Sharpe
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Sortino
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      name: "Motilal Oswal Midcap Fund",
                      beta: 0.89,
                      sharpe: 1.18,
                      sortino: 1.43,
                    },
                    {
                      name: "Nippon India Growth Mid Cap Fund",
                      beta: 0.96,
                      sharpe: 1.09,
                      sortino: 1.63,
                    },
                    {
                      name: "HDFC Mid Cap Fund",
                      beta: 0.85,
                      sharpe: 1.26,
                      sortino: 1.83,
                    },
                    {
                      name: "Kotak Midcap Fund",
                      beta: 0.89,
                      sharpe: 0.97,
                      sortino: 1.23,
                    },
                    {
                      name: "Edelweiss Mid Cap Fund",
                      beta: 0.94,
                      sharpe: 1.1,
                      sortino: 1.47,
                    },
                  ].map((fund) => (
                    <TableRow key={fund.name} hover>
                      <TableCell>{fund.name}</TableCell>
                      <TableCell align="right">{fund.beta}</TableCell>
                      <TableCell align="right">{fund.sharpe}</TableCell>
                      <TableCell align="right">{fund.sortino}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                sx={{
                  mt: 1,
                  textTransform: "none",
                  color: "success.main",
                  fontWeight: 600,
                  fontSize: 15,
                }}
                component={Link}
                href="#"
              >
                View all Mid Cap funds
              </Button>
            </Box>
          )}
          {/* Other Details Tab */}
          {tabPeer === 2 && (
            <Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>Fund name</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      AUM (₹ Cr)
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Expense Ratio
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>
                      Fund Age
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    {
                      name: "Motilal Oswal Midcap Fund",
                      aum: "34,780",
                      expense: "0.69%",
                      age: "11.7 yrs",
                    },
                    {
                      name: "Nippon India Growth Mid Cap Fund",
                      aum: "28,500",
                      expense: "0.72%",
                      age: "14.2 yrs",
                    },
                    {
                      name: "HDFC Mid Cap Fund",
                      aum: "31,200",
                      expense: "0.68%",
                      age: "13.5 yrs",
                    },
                    {
                      name: "Kotak Midcap Fund",
                      aum: "25,900",
                      expense: "0.75%",
                      age: "10.9 yrs",
                    },
                    {
                      name: "Edelweiss Mid Cap Fund",
                      aum: "22,100",
                      expense: "0.70%",
                      age: "9.8 yrs",
                    },
                  ].map((fund) => (
                    <TableRow key={fund.name} hover>
                      <TableCell>{fund.name}</TableCell>
                      <TableCell align="right">{fund.aum}</TableCell>
                      <TableCell align="right">{fund.expense}</TableCell>
                      <TableCell align="right">{fund.age}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                sx={{
                  mt: 1,
                  textTransform: "none",
                  color: "success.main",
                  fontWeight: 600,
                  fontSize: 15,
                }}
                component={Link}
                href="#"
              >
                View all Mid Cap funds
              </Button>
            </Box>
          )}
        </Paper>

        {/* Key risk & return ratios */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Key risk & return ratios{" "}
            <span style={{ color: "#888", fontWeight: 400, fontSize: 14 }}>
              Compared to other funds in the category
            </span>
          </Typography>
          {riskRatios.map((r) => (
            <Box key={r.label}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography>{r.label}</Typography>
                <Typography sx={{ fontWeight: 600 }}>{r.value}</Typography>
              </Box>
              <Typography
                variant="caption"
                sx={{ color: r.color, mb: 1, display: "block" }}
              >
                {r.desc}
              </Typography>
              <Divider />
            </Box>
          ))}
          <Typography
            variant="body2"
            sx={{ color: "primary.main", mt: 2, cursor: "pointer" }}
          >
            What do these terms mean?
          </Typography>
        </Paper>

        {/* About this fund */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            About this fund
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            About Motilal Oswal Midcap Fund
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            Motilal Oswal Midcap Fund Direct-Growth is a Mid Cap mutual fund
            scheme from{" "}
            <Link href="#" color="success.main" underline="hover">
              Motilal Oswal Mutual Fund
            </Link>
            . This fund has been in existence for 11 yrs 7 m, having been
            launched on 03/02/2014. Motilal Oswal Midcap Fund Direct-Growth has
            ₹34,780 Crores worth of assets under management (AUM) as on
            31/08/2025 and is medium-sized fund of its category. The latest Net
            Asset Value (NAV) of Motilal Oswal Midcap Fund Direct-Growth as of
            15/09/2025 is ₹120.26. The fund has an expense ratio of 0.69%, which
            is close to what most other{" "}
            <Link href="#" color="success.main" underline="hover">
              Mid Cap funds
            </Link>{" "}
            charge.{" "}
            <Link href="#" color="success.main" underline="hover">
              ...read more
            </Link>
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Fund AUM
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                34,780 Cr as on Aug 31, 2025
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Scheme document
              </Typography>
              <Link href="#" color="success.main" underline="hover">
                View Scheme Document
              </Link>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Product Presentation
              </Typography>
              <Link href="#" color="success.main" underline="hover">
                View Product Presentation
              </Link>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Fund managers
          </Typography>
          <List dense>
            {fundManagers.map((fm) => (
              <ListItem
                key={fm.name}
                secondaryAction={
                  <IconButton edge="end" size="small">
                    <AddIcon fontSize="small" />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemText primary={fm.name} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Investment objective
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            The scheme seeks to achieve long term capital appreciation by
            investing in quality mid-cap companies having long-term competitive
            advantages and potential for growth.
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Motilal Oswal Mutual Fund details
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                No. of schemes
              </Typography>
              <Typography variant="body2">
                47{" "}
                <Link href="#" color="success.main" underline="hover">
                  view all schemes
                </Link>
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Total AUM
              </Typography>
              <Typography variant="body2">
                1,09,736 Cr as on Jun 30, 2025
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body2">
                Motilal Oswal Towers - 10th Floor, Rahimtullah Sayani Road,
                Opposite Parel ST Depot, Prabhadevi, Mumbai, 400025
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body2">
                022-39804238 / 1800-200-6626
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
