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
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoading, totalItems }) => {
    const location = useLocation();

    return (
        <AppBar position="fixed" className="navbar" color="inherit">
            <Toolbar className="navbar__toolbar">
                <Typography
                    className="navbar__brand"
                    variant="h6"
                    color="inherit"
                    component={Link}
                    to="/"
                >
                    <img
                        src={weblogo}
                        alt="E-Commerce Shop"
                        className="navbar__image"
                    />
                    E-Commerce Shop
                </Typography>

                {location.pathname === "/" && (
                    <IconButton
                        className="navbar__showCart"
                        color="inherit"
                        aria-label="Show cart"
                        component={Link}
                        to="/cart"
                    >
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                )}
            </Toolbar>

            {/* Display loading if products are not loaded */}
            {isLoading === true && <LinearProgress color="secondary" />}
        </AppBar>
    );
};

export default Navbar;
