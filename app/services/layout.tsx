import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Box sx={{ paddingTop: '64px' }}>
          {children}
        </Box>
        <Footer />
      </body>
    </html>
  )
}