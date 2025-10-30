import { Box } from "@mui/material";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services/Services";

export default function Home() {
  return (
    <Box sx={{display: "flex", flexDirection: "column", width: "100%"}}>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
    </Box>
  );
}
