import React from "react";
import "./Navbar.scss";
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
    InputBase,
    useMediaQuery,
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import weblogo from "../../assets/web-logo.svg";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

const Navbar = ({ isLoading, totalItems }) => {
    const location = useLocation();

    return (
        <AppBar position="fixed" className="navbar" color="inherit">
            <Toolbar className="navbar__toolbar">
                {location.pathname === "/" && (
                    <>
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

                        <div className="navbar__search">
                            <SearchIcon className="navbar__searchIcon" />
                            <InputBase
                                className="navbar__input"
                                placeholder="Search for products..."
                            />
                        </div>
                    </>
                )}

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
                    <span>Shoppiness</span>
                </Typography>
            </Toolbar>

            {/* Display loading if products are not loaded */}
            {isLoading && <LinearProgress color="secondary" />}
        </AppBar>
    );
};

export default Navbar;
