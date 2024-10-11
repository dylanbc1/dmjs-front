'use client'
import { createTheme } from "@mui/material/styles";
import { Exo_2 } from "next/font/google";

const exo_2 = Exo_2({ subsets: ["latin"], weight: ["400", "700"] });

const theme = createTheme({
  typography: {
    fontFamily: exo_2.style.fontFamily,
  },
});

export default theme;
