import React from "react";
import "./Navbar.scss";
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Badge,
    Typography,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import weblogo from "../../assets/web-logo.svg";
import LinearProgress from "@material-ui/core/LinearProgress";

const Navbar = ({ isLoading, totalItems }) => {
    return (
        <AppBar position="fixed" className="navbar" color="inherit">
            <Toolbar className="navbar__toolbar">
                <Typography
                    className="navbar__brand"
                    variant="h6"
                    color="inherit"
                >
                    <img
                        src={weblogo}
                        alt="E-Commerce Shop"
                        className="navbar__image"
                    />
                    E-Commerce Shop
                </Typography>

                <IconButton
                    className="navbar__showCart"
                    color="inherit"
                    aria-label="Show cart"
                >
                    <Badge badgeContent={totalItems} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
            </Toolbar>

            {/* Display loading if products are not loaded */}
            {isLoading === true && <LinearProgress color="secondary" />}
        </AppBar>
    );
};

export default Navbar;
