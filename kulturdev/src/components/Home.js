import { Avatar, Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Eventos from "./Eventos";
import kulturLogo from "../media/kultur_logo.jpg";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      custom: {
        main: "#3A3A3A",
        contrastText: "white",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ width: "100%" }}>
      <Box sx={{color: "white"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="basic tabs example"
        >
          <Tab label="Inicio" {...a11yProps(0)} />
          <Tab label="Eventos" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          <Avatar
            alt="Kultur"
            src={kulturLogo}
            sx={{ width: 220, height: 220 }}
          />
          <label style={{ color: "white", fontSize: 40 }}>
            @Kulturmedieval
          </label>
          <p style={{ color: "white" }}>Agrupación Histórica Militar</p>
            <Button
              href="mailto:kulturmedieval@gmail.com"
              sx={{ width: "90vw", mb: 1 }}
              variant="contained"
              color="custom"
            >
              Correo
            </Button>
            <Button
              href="https://m.facebook.com/kulturmedieval"
              sx={{ width: "90vw", mb: 1 }}
              variant="contained"
              color="custom"
            >
              Facebook
            </Button>
            <Button
              href="https://instagram.com/kulturmedieval?igshid=YmMyMTA2M2Y="
              sx={{ width: "90vw", mb: 1 }}
              variant="contained"
              color="custom"
            >
              Instagram
            </Button>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Eventos />
      </TabPanel>

    </Box>
    </ThemeProvider>
  );
}
