import React from "react";
import "./Navbar.scss";
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
    InputBase,
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
                <Typography className="navbar__brand" variant="h6">
                    <Link to="/">
                        <img
                            src={weblogo}
                            alt="E-Commerce Shop"
                            className="navbar__image"
                        />
                        <span>Shoppiness</span>
                    </Link>
                </Typography>

                {location.pathname === "/" && (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="Search..."
                            component={Link}
                            to="/search"
                        >
                            <SearchIcon />
                        </IconButton>

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
                    </>
                )}
            </Toolbar>

            {/* Display loading if products are not loaded */}
            {isLoading && <LinearProgress color="secondary" />}
        </AppBar>
    );
};

export default Navbar;
