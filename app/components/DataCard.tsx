import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface DataCardProps {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  icon: React.ReactNode;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  description,
  features,
  buttonText,
  buttonLink,
  icon
}) => {
  return (
    <Card style={{ display: "flex", flexDirection: "column", padding: 8, border: "1px solid rgba(12, 65, 57, 0.08)", boxShadow: "0 1px 2px rgba(12, 65, 57, 0.04), 0 4px 12px rgba(12, 65, 57, 0.06)", borderRadius: "12px" }}>
      <CardContent>
        {icon}
        <Typography
          sx={{ mt: 2, fontWeight: "bold", fontSize: "1.6rem", lineHeight: "1.4", color: "var(--color-text-primary)" }}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: "1.2rem", color: "#374151" }}>{description}</Typography>
        <List>
          {features.map((feature, index) => (
            <ListItem key={index} style={{ paddingLeft: "0" }}>
              <ListItemIcon sx={{ minWidth: "16px" }}>
                <FiberManualRecordIcon sx={{ color: "var(--color-text-primary)", fontSize: "12px" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#374151" }} primary={feature} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          href={buttonLink}
          sx={{ marginTop: "16px", width: "100%", padding: 1.5, borderRadius: 2.5, fontSize: "1rem", backgroundColor: "var(--color-text-primary)", transition: "background-color 0.2s ease, transform 0.1s ease", "&:hover": { backgroundColor: "#105A4A", transform: "translateY(-1px)" } }}
          endIcon={<ArrowForwardIcon />}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataCard;
