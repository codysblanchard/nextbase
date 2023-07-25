import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Link,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import MenuIcon from "@mui/icons-material/Menu";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const NavLink = ({ children }: { children: any }) => (
  <Link variant="h6" component="div" underline="none" color="white">
    {children}
  </Link>
);

export default function Nav({ mobile }: { mobile: boolean }) {
  const { data: session, status } = useSession();
  const validSession: boolean = Boolean(status === "authenticated" && session);
  // @ts-ignore
  const sessionUser = session?.user;
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const NavLinks = (
    <>
      <NavLink>
        <NextLink href={`/profile/edit/`}>Edit Profile</NextLink>
      </NavLink>
    </>
  );
  const LogoLink = (
    <NextLink href={`/`}>
      <img
        style={{ filter: "grayscale(1) invert(1)" }}
        src="/images/OMA-Logo.png"
        alt="logo"
        height="50"
      />
    </NextLink>
  );
  return (
    <AppBar position="static">
      <Drawer
        anchor={"left"}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          onClick={() => setDrawerOpen(false)}
          sx={{ width: 250, height: "100%", pl: 2, pt: 2, background: "black" }}
          role="presentation"
          // onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          {LogoLink}
          {NavLinks}
        </Box>
      </Drawer>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "flex", sm: "none" } }}
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Link sx={{ mr: 4 }} component="div">
          {LogoLink}
        </Link>
        <Stack
          direction="row"
          spacing={4}
          sx={{
            display: { xs: "none", sm: "flex", flexGrow: 1 },
          }}
        >
          {NavLinks}
        </Stack>
        {mobile && <Box sx={{ flexGrow: 1 }} />}

        {!validSession && (
          <Button
            onClick={() => (validSession && signOut()) || signIn()}
            color="inherit"
          >
            {validSession ? "Sign Out" : "Sign In"}
          </Button>
        )}

        {validSession && (
          <Box sx={{ flexGrow: 0 }}>
            <Typography sx={{ display: "inline", mr: 2 }}>
              {sessionUser?.name}
            </Typography>

            <Tooltip title="Open settings">
              <IconButton
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                sx={{ p: 0 }}
              >
                <Avatar alt={session?.user?.name} src={session?.user?.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={userMenuOpen}
              onClose={() => setUserMenuOpen(false)}
            >
              <MenuItem onClick={() => {}}>
                <Button
                  onClick={() => (validSession && signOut()) || signIn()}
                  color="inherit"
                >
                  {validSession ? "Sign Out" : "Sign In"}
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
