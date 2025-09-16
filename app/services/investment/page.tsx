"use client"

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
  InputLabel,
} from "@mui/material";
import { Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useRouter } from "next/navigation";

// Dummy data
const isPortfolioEmpty = false;
const riskProfileExists = true;
const recommendations = [
  { name: "Finzy Growth Fund", category: "Equity", risk: "Moderate", nav: 120, id: 12340 },
  { name: "Finzy Secure Fund", category: "Debt", risk: "Low", nav: 105, id: 12341 },
  { name: "Finzy Balanced Fund", category: "Hybrid", risk: "Moderate", nav: 110, id: 12342 },
];
const holdings = [
  { fundName: "Finzy Growth Fund", category: "Equity", invested: 10000, nav: 120, units: 83.33, id: 12340 },
  { fundName: "Finzy Secure Fund", category: "Debt", invested: 5000, nav: 105, units: 47.62, id: 12341 },
];
const portfolioValue = holdings.reduce((acc, h) => acc + h.units * h.nav, 0);
const investedAmount = holdings.reduce((acc, h) => acc + h.invested, 0);
const simpleReturn = (((portfolioValue - investedAmount) / investedAmount) * 100).toFixed(2);

// Dummy line chart data for portfolio performance
const lineData = [
  { date: "Aug", value: 13000 },
  { date: "Sep", value: 15500 },
  { date: "Oct", value: 16500 },
  { date: "Nov", value: 16000 },
  { date: "Dec", value: portfolioValue },
];

export default function InvestmentPage() {
  const [fundFilter, setFundFilter] = useState("All");

  const router = useRouter();

  // Filtered recommended funds
  const filteredFunds =
    fundFilter === "All" ? recommendations : recommendations.filter((f) => f.category === fundFilter);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Investments
      </Typography>

      {/* Recommended Funds */}
      {riskProfileExists && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recommended Funds
            </Typography>
              <InputLabel>Filter by Category</InputLabel>
              <Select sx={{minWidth: 150}} value={fundFilter} onChange={(e) => setFundFilter(e.target.value)}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Equity">Equity</MenuItem>
                <MenuItem value="Debt">Debt</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            <List>
              {filteredFunds.map((rec, idx) => (
                <ListItem key={idx} divider>
                  <ListItemText
                    primary={rec.name}
                    secondary={`Category: ${rec.category} | Risk: ${rec.risk} | NAV: ₹${rec.nav}`}
                  />
                  <Button variant="contained" onClick={() => router.push(`/services/investment/${rec.id}`)}>Start SIP</Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {isPortfolioEmpty ? (
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Your portfolio is empty
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
              Get started by exploring recommended funds based on your risk profile.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box>
          {/* Portfolio Overview */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Portfolio Overview
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid size={12}>
                  <Typography>
                    Invested Amount: <b>₹{investedAmount.toLocaleString()}</b>
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography>
                    Current Value: <b>₹{portfolioValue.toLocaleString()}</b>
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Chip
                    label={`Simple Return: ${simpleReturn}%`}
                    color={Number(simpleReturn) >= 0 ? "success" : "error"}
                  />
                </Grid>
              </Grid>

              {/* Line Chart for Performance */}
              <Typography variant="subtitle1" gutterBottom>
                Portfolio Performance
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Holdings Table */}
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fund Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Invested Amount</TableCell>
                  <TableCell>Current NAV</TableCell>
                  <TableCell>Units</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdings.map((h, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{cursor: "pointer"}} onClick={() => router.push(`/services/investment/${h.id}`)}>{h.fundName}</TableCell>
                    <TableCell>{h.category}</TableCell>
                    <TableCell>₹{h.invested.toLocaleString()}</TableCell>
                    <TableCell>{h.nav}</TableCell>
                    <TableCell>{h.units.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


        </Box>
      )}
    </Box>
  );
}
