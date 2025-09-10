import React from "react";
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
} from "@mui/material";

// Dummy data for demonstration
const isPortfolioEmpty = false; // Change to false to show portfolio
const recommendations = [
  { name: "Finzy Growth Fund", risk: "Moderate" },
  { name: "Finzy Secure Fund", risk: "Low" },
];
const holdings = [
  {
    fundName: "Finzy Growth Fund",
    category: "Equity",
    invested: 10000,
    nav: 120,
    units: 83.33,
  },
  {
    fundName: "Finzy Secure Fund",
    category: "Debt",
    invested: 5000,
    nav: 105,
    units: 47.62,
  },
];
const portfolioValue = 83.33 * 120 + 47.62 * 105;
const investedAmount = 10000 + 5000;
const simpleReturn = (((portfolioValue - investedAmount) / investedAmount) * 100).toFixed(2);

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

export default function InvestmentPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Investments
      </Typography>

      {isPortfolioEmpty ? (
        <Card sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Your portfolio is empty
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" gutterBottom>
              Get started by exploring recommended funds based on your risk profile.
            </Typography>
            <List>
              {recommendations.map((rec, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={rec.name}
                    secondary={`Risk: ${rec.risk}`}
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
              <Button variant="contained" color="primary">
                Start a SIP
              </Button>
              <Button variant="outlined" color="primary">
                Add Investment
              </Button>
            </Box>
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
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography>
                    Invested Amount: <b>₹{investedAmount.toLocaleString()}</b>
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography>
                    Current Value: <b>₹{portfolioValue.toLocaleString()}</b>
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Chip
                    label={`Simple Return: ${simpleReturn}%`}
                    color={Number(simpleReturn) >= 0 ? "success" : "error"}
                  />
                </Grid>
              </Grid>
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
                    <TableCell>{h.fundName}</TableCell>
                    <TableCell>{h.category}</TableCell>
                    <TableCell>₹{h.invested.toLocaleString()}</TableCell>
                    <TableCell>{h.nav}</TableCell>
                    <TableCell>{h.units.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* SIP Status */}
          <Card>
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
      )}
    </Box>
  );
}