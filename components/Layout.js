import Link from "next/link";

import { useState } from "react";

import { Drawer, Fab } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import SvgIcon from "@material-ui/core/SvgIcon";
import SettingsIcon from "@material-ui/icons/Settings";

import MicButton from "@/components/MicButton";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import CarSelector from "@/components/CarSelector";

import config from "@/config";
import theme from "@/libs/theme";

const initialDrawerState = {
  carSelector: false,
  menu: false,
};

const Layout = ({ children }) => {
  const [drawer, setDrawer] = useState(initialDrawerState);

  return (
    <>
      <div>{children}</div>

      <div className="top-3 left-3 fixed flex flex-col gap-3">
        <Fab
          color="secondary"
          aria-label="Open car menu"
          onClick={() =>
            setDrawer({ ...drawer, carSelector: !drawer.carSelector })
          }
        >
          <DirectionsCarIcon />
        </Fab>
        <MicButton />
      </div>
      <div className="top-3 fixed right-3">
        <Fab
          aria-label="Open menu"
          variant="round"
          style={{
            background: "transparent",
            boxShadow: "unset",
          }}
          onClick={() => setDrawer({ ...drawer, menu: !drawer.menu })}
        >
          <MenuIcon />
        </Fab>
      </div>

      <Drawer
        open={drawer.menu}
        anchor="right"
        onClick={() => setDrawer(initialDrawerState)}
      >
        <div className="menu-container lg:w-72 mb-10">
          <h1 className="hidden">{config.siteTitle}</h1>
          <div className="relative text-center">
            <figure
              className="mx-auto p-3 h-30 flex items-center justify-center"
              style={{ background: theme.palette.secondary.main }}
            >
              <DirectionsCarIcon style={{color:'#fff'}} fontSize="large" />
            </figure>
          </div>

          <List>
            <Link href="/about">
              <ListItem component="a" button key="About">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>

      <Drawer
        open={drawer.carSelector}
        anchor="left"
        onClick={() => setDrawer(initialDrawerState)}
      >
        <div className="menu-container mt-10 mb-20">
          <CarSelector />
        </div>
      </Drawer>

      <style jsx>
        {`
          .menu-container {
            max-width: 90vw;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
