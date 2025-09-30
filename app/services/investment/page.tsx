"use client";

import React, { useEffect, useState } from "react";
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
  FormControl,
  Dialog,
  TextField,
  styled,
  Stack,
  Divider,
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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Toaster, toast } from "react-hot-toast";
import { Holdings } from "@/types/types";
import { useMfStore } from "@/app/store/mfStore";

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

export default function InvestmentPage() {
  const [fundFilter, setFundFilter] = useState("All");
  const [isPortfolioPresent, setIsPortfolioPresent] = useState(false);
  const [form, setForm] = useState<{
    casFile: File | null;
    password: string;
    user_id: string;
  }>({ casFile: null, password: "", user_id: "testing" });
  const [uploadDialog, setUploadDialog] = useState(false);
  const { holdings, setHoldings, setSelectedMf } = useMfStore();

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
      totalInvested > 0
        ? ((totalValue - totalInvested) / totalInvested) * 100
        : 0;

    investedAmount = totalInvested;
    currentValue = totalValue;
    returns = simpleReturn.toFixed(2);
  }

  const router = useRouter();

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
        toast.error("Please upload a CAS file.");
        return;
      }
      formData.append("casFile", form.casFile);
      formData.append("password", form.password);
      formData.append("user_id", form.user_id);
      const mf_data = await generateCAS(formData);
      setHoldings(mf_data);
      setIsPortfolioPresent(false);
      setUploadDialog(false);
      toast.success("CAS file processed successfully!");
    } catch (error) {
      console.error("Error processing CAS file:", error);
      toast.error("Failed to process CAS file. Please try again.");
    }
  };

  useEffect(() => {
    if (holdings && holdings.mutual_funds && holdings.mutual_funds.length > 0) {
      setIsPortfolioPresent(true);
    }
  }, [holdings]);

  return (
    <Box sx={{ maxWidth: "100%", px: { xs: 2, md: 4, lg: 6 }, py: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "text.primary" }}>
          Investment Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your portfolio and explore investment opportunities
        </Typography>
      </Box>

      {/* Recommended Funds */}
      {riskProfileExists && (
        <Card sx={{ mb: 4, boxShadow: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recommended Funds
              </Typography>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel size="small">Filter by Category</InputLabel>
                <Select
                  size="small"
                  value={fundFilter}
                  label="Filter by Category"
                  onChange={(e) => setFundFilter(e.target.value)}
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  <MenuItem value="Equity">Equity</MenuItem>
                  <MenuItem value="Debt">Debt</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Stack spacing={2}>
              {filteredFunds.map((rec, idx) => (
                <Paper key={idx} variant="outlined" sx={{ p: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                        {rec.name}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip label={rec.category} size="small" color="primary" variant="outlined" />
                        <Chip 
                          label={`Risk: ${rec.risk}`} 
                          size="small" 
                          color={rec.risk === "Low" ? "success" : rec.risk === "High" ? "error" : "warning"}
                          variant="outlined"
                        />
                      </Stack>
                      <Grid container spacing={3} sx={{ mt: 1 }}>
                        <Grid>
                          <Typography variant="body2" color="text.secondary">
                            5Y Return
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500, color: "success.main" }}>
                            {rec.fiveYearReturn}%
                          </Typography>
                        </Grid>
                        <Grid>
                          <Typography variant="body2" color="text.secondary">
                            NAV
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            ₹{rec.nav}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ ml: 2, minWidth: 120 }}
                      onClick={() => router.push(`/services/investment/${rec.id}`)}
                    >
                      Start SIP
                    </Button>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </CardContent>
        </Card>
      )}

      {!isPortfolioPresent ? (
        <Card sx={{ boxShadow: 2, textAlign: "center" }}>
          <CardContent sx={{ p: 4 }}>
            <AccountBalanceWalletIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Upload Your Portfolio
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
              Get started by uploading your CAS (Consolidated Account Statement) file to view your current investments and get personalized recommendations.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<CloudUploadIcon />}
              onClick={() => setUploadDialog(true)}
              sx={{ minWidth: 200 }}
            >
              Upload CAS File
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={4}>
          {/* Portfolio Overview */}
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Portfolio Overview
              </Typography>
              
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 4 }} >
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Invested Amount
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
                      ₹{investedAmount.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Current Value
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "text.primary" }}>
                      ₹{currentValue.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Total Returns
                    </Typography>
                    <Chip
                      icon={<TrendingUpIcon />}
                      label={`${returns}%`}
                      color={Number(returns) >= 0 ? "success" : "error"}
                      sx={{ fontSize: "1.1rem", fontWeight: 600, height: 40 }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Portfolio Performance
              </Typography>
              <Box sx={{ height: 250, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1976d2" 
                      strokeWidth={2}
                      dot={{ fill: "#1976d2", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>

          {/* Holdings Table */}
          <Card sx={{ boxShadow: 2 }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Your Holdings
                </Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "grey.50" }}>
                      <TableCell sx={{ fontWeight: 600 }}>Fund Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Invested Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Current Value</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Returns</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Current NAV</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Units</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {holdings?.mutual_funds.map((h, idx) => (
                      <TableRow 
                        key={idx}
                        hover
                        sx={{ cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}
                        onClick={() => {
                          setSelectedMf(h);
                          router.push(`/services/investment/${h.scheme_id}`);
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: "primary.main" }}>
                            {h.name}
                          </Typography>
                        </TableCell>
                        <TableCell>₹{parseFloat(h.total_cost).toLocaleString()}</TableCell>
                        <TableCell>₹{parseFloat(h.value).toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip
                            label={`${h.return}%`}
                            color={parseFloat(h.return) >= 0 ? "success" : "error"}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>₹{h.nav}</TableCell>
                        <TableCell>
                          {parseFloat(h.nav) > 0 &&
                          !isNaN(parseFloat(h.nav)) &&
                          !isNaN(parseFloat(h.total_cost))
                            ? (parseFloat(h.total_cost) / parseFloat(h.nav)).toFixed(2)
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Upload Dialog */}
      <Dialog 
        open={uploadDialog} 
        onClose={() => setUploadDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Upload CAS File
          </Typography>
          
          {form.casFile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Chip
                label={form.casFile.name}
                color="primary"
                variant="outlined"
                sx={{ maxWidth: 250 }}
              />
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => setForm({ ...form, casFile: null })}
              >
                Remove
              </Button>
            </Box>
          ) : (
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 3, width: "100%" }}
              size="large"
            >
              Select CAS File
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
            sx={{ mb: 3 }}
          />
          
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => setUploadDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleCasUpload}
              disabled={!form.casFile}
            >
              Upload & Process
            </Button>
          </Stack>
        </Box>
      </Dialog>

      <Toaster position="top-right" />
    </Box>
  );
}