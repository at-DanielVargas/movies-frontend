import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { colorsTuple, createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { StrictMode } from "react";

const theme = createTheme({
  primaryColor: "red",
  colors: {
    purple: colorsTuple("#7a3cff"),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>
);
