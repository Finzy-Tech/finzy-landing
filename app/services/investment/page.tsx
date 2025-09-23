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
  Dialog,
  TextField,
  styled,
} from "@mui/material";
import {
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useRouter } from "next/navigation";
import axiosPipelineInstance from "@/app/utils/axiosPipeline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type Fund = {
  "id": number,
  "avg_cost": string,
  "balance": string,
  "folio": string,
  "isin": string,
  "name": string,
  "nav": string,
  "pnl": string,
  "return": string,
  "total_cost": string,
  "ucc": string,
  "value": string
}

type Holdings={
  balance: number,
  folios: number,
  mutual_funds: Array<Fund>
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Dummy data
const riskProfileExists = true;
const recommendations = [
  {
    name: "Motilal Oswal Midcap Fund",
    category: "Equity",
    risk: "Moderate",
    fiveYearReturn: 12,
    nav: 120,
    id: 12340,
  },
  {
    name: "Finzy Secure Fund",
    category: "Debt",
    risk: "Low",
    fiveYearReturn: 8,
    nav: 105,
    id: 12341,
  },
  {
    name: "Finzy Balanced Fund",
    category: "Hybrid",
    risk: "Moderate",
    fiveYearReturn: 10,
    nav: 110,
    id: 12342,
  },
];

const portfolioValue = 271316.86;

const lineData = [
  { date: "Aug", value: 13000 },
  { date: "Sep", value: 15500 },
  { date: "Oct", value: 16500 },
  { date: "Nov", value: 16000 },
  { date: "Dec", value: portfolioValue },
];

// const holdings = [
//   { fundName: "Motilal Oswal Midcap Fund", category: "Equity", fiveYearReturn: 12, invested: 10000, nav: 120, units: 83.33, id: 12340 },
//   { fundName: "Finzy Secure Fund", category: "Debt", fiveYearReturn: 8, invested: 5000, nav: 105, units: 47.62, id: 12341 },
// ];

export default function InvestmentPage() {
  const [fundFilter, setFundFilter] = useState("All");
  const [isPortfolioPresent, setIsPortfolioPresent] = useState(true);
  const [form, setForm] = useState<{
    casFile: File | null;
    password: string;
    user_id: string;
  }>({ casFile: null, password: "", user_id: "testing" });
  const [uploadDialog, setUploadDialog] = useState(false);
  const [holdings, setHoldings] = useState<Holdings | null>(null);

  let returns = null;

  let investedAmount = 0;
  let currentValue = 0;

if (holdings && holdings.mutual_funds && holdings.mutual_funds.length > 0) {
  const totalInvested = holdings.mutual_funds.reduce(
    (sum, rec) => sum + parseFloat(rec.total_cost),
    0
  );
  const totalValue = holdings.mutual_funds.reduce(
    (sum, rec) => sum + parseFloat(rec.value),
    0
  );
  const simpleReturn =
    totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0;

  investedAmount = totalInvested;
  currentValue = totalValue;
  returns = simpleReturn.toFixed(2);
}

  const router = useRouter();

  // Filtered recommended funds
  const filteredFunds =
    fundFilter === "All"
      ? recommendations
      : recommendations.filter((f) => f.category === fundFilter);

  const generateCAS = async (formData: FormData) => {
    try {
      const response = await axiosPipelineInstance.post(
        "/api/parse-cas",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error uploading CAS file:", error);
      throw error;
    }
  };

  const handleCasUpload = async () => {
    try {
      const formData = new FormData();
      if (!form.casFile) {
        alert("Please upload a CAS file.");
        return;
      }
      formData.append("casFile", form.casFile);
      formData.append("password", form.password);
      formData.append("user_id", form.user_id);
      const mf_data = await generateCAS(formData);
      setHoldings(mf_data);
      setIsPortfolioPresent(false);
      setUploadDialog(false);
      alert("CAS file processed successfully!");
    } catch (error) {
      console.error("Error processing CAS file:", error);
      alert("Failed to process CAS file. Please try again.");
    }
  };

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
            <Select
              sx={{ minWidth: 150 }}
              value={fundFilter}
              onChange={(e) => setFundFilter(e.target.value)}
            >
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
                    secondary={`Category: ${rec.category} | Risk: ${rec.risk} | 5Y Return: ${rec.fiveYearReturn}% | NAV: ₹${rec.nav}`}
                  />
                  <Button
                    variant="contained"
                    onClick={() =>
                      router.push(`/services/investment/${rec.id}`)
                    }
                  >
                    Start SIP
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {isPortfolioPresent ? (
        <Card sx={{ mx: "auto", mt: 4 }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Your portfolio is not uploaded yet. Please upload your CAS file to
              get started.
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Get started by exploring recommended funds based on your risk
              profile or uploading your portfolio.
            </Typography>
            <Button
              variant="contained"
              component="label"
              onClick={() => setUploadDialog(true)}
              sx={{ mt: 6, display: "flex", justifyContent: "center", mx: "auto", width: '200px' }}
            >
              Upload CAS File
            </Button>
          </CardContent>

          <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)}>
            <Box sx={{ p: 4, minWidth: 300 }}>
              <Typography variant="h6" gutterBottom>
                Upload CAS File
              </Typography>
              {/* File Upload Section */}
              {form.casFile ? (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Chip
                    label={form.casFile.name}
                    color="primary"
                    variant="outlined"
                    sx={{ maxWidth: 200 }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setForm({ ...form, casFile: null })}
                  >
                    Remove
                  </Button>
                </Box>
              ) : (
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  sx={{ mb: 2 }}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) =>
                      setForm({
                        ...form,
                        casFile:
                          event.target.files && event.target.files.length > 0
                            ? event.target.files[0]
                            : null,
                      })
                    }
                    accept=".pdf,.zip"
                  />
                </Button>
              )}
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleCasUpload}
              >
                Submit
              </Button>
            </Box>
          </Dialog>
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
                    Invested Amount:{" "}
                    <b>₹{investedAmount}</b>
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Typography>
                    Current Value:{" "}
                    <b>₹{currentValue}</b>
                  </Typography>
                </Grid>
                <Grid size={12}>
                  <Chip
                    label={`Simple Return: ${returns}%`}
                    color={
                      Number(returns) >= 0 ? "success" : "error"
                    }
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
                  <TableCell>Invested Amount</TableCell>
                  <TableCell>Current Value</TableCell>
                  <TableCell>Total Return</TableCell>
                  <TableCell>Current NAV</TableCell>
                  <TableCell>Units</TableCell>
                </TableRow>
              </TableHead>
             
              <TableBody>
                {holdings?.mutual_funds.map((h, idx) => (
                  <TableRow key={idx}>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push(`/services/investment/${h.id}`)
                      }
                    >
                      {h.name}
                    </TableCell>
                    <TableCell>{h.total_cost}</TableCell>
                    <TableCell>₹{h.value}</TableCell>
                    <TableCell>{h.return}%</TableCell>
                    <TableCell>{h.nav}</TableCell>
                    <TableCell>{(parseFloat(h.total_cost) / parseFloat(h.nav)).toFixed(2)}</TableCell>
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
