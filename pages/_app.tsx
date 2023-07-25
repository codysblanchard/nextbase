import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Nav from "../components/Nav";
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "styles/globals.css";

import { useState, useEffect } from "react";
import { blue, yellow, grey, red, green } from "@mui/material/colors";

export default function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    palette: {
      secondary: {
        main: grey[400], //"#f44336",
      },
      primary: {
        main: "#000", //"#1565c0",
        light: blue[50],
      },
      success: {
        main: green[500],
        light: green[100],
      },
      error: {
        main: red[500],
        light: red[300],
      },
      warning: {
        main: yellow[500],
        light: yellow[100],
      },
    },
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(1000);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    status?: "success" | "warning" | "error";
    message?: string;
  }>({
    open: false,
    status: null,
    message: null,
  });
  function openSnackBar(cfg) {
    setSnackbar({ ...cfg, open: true });
  }
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  let mobile = width <= 600;
  return (
    <CssBaseline>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <Nav mobile={mobile} />
          <Modal open={loading} onClose={() => setLoading(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </Box>
          </Modal>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity={snackbar.status}
              sx={{ width: "100%" }}
            >
              <AlertTitle sx={{ textTransform: "capitalize" }}>
                {snackbar.status}
              </AlertTitle>
              {snackbar.message}
            </Alert>
          </Snackbar>
          <Container maxWidth="lg">
            <div className="main">
              {Component.auth ? (
                <Auth role={Component.auth}>
                  <Component
                    alert={openSnackBar}
                    mobile={mobile}
                    {...pageProps}
                    loading={setLoading}
                  />
                </Auth>
              ) : (
                <Component
                  alert={openSnackBar}
                  mobile={mobile}
                  {...pageProps}
                  loading={setLoading}
                />
              )}
            </div>
          </Container>
        </ThemeProvider>
      </SessionProvider>
    </CssBaseline>
  );
}

import ErrorPage from "next/error";
function Auth({ children, role }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data, status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (role !== true) {
    //@ts-ignore
    if (data.user.role !== role && data.user.role !== "admin") {
      return <ErrorPage statusCode={401} title="Not authorized" />;
    }
  }
  return children;
}
