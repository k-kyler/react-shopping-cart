import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import "./Cart.scss";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

const Cart = ({
    cart,
    isLoading,
    updateCartItemHandler,
    removeFromCartHandler,
    emptyCart,
}) => {
    const isEmpty = cart.line_items.length === 0 && isLoading === false;
    const EmptyCart = () => (
        <Typography variant="subtitle1" className="cart__empty">
            No items here, <Link to="/">add some</Link>
        </Typography>
    );
    const FilledCart = () => (
        <>
            <Grid container spacing={3} className="cart__container">
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem
                            item={item}
                            updateCartItemHandler={updateCartItemHandler}
                            removeFromCartHandler={removeFromCartHandler}
                        />
                    </Grid>
                ))}
            </Grid>

            <Grid container>
                <Grid item xs={12} sm={4} className="cart__total">
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" color="secondary">
                        {cart.subtotal.formatted_with_symbol}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8} className="cart__buttons">
                    <Button
                        onClick={() => emptyCart()}
                        variant="contained"
                        size="large"
                        className="cart__emptyButton"
                        type="button"
                        color="secondary"
                    >
                        Empty cart
                    </Button>
                    <Button
                        component={Link}
                        to="/checkout"
                        variant="contained"
                        size="large"
                        className="cart__checkoutButton"
                        type="button"
                        color="primary"
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    );

    return (
        <Container className="cart">
            <Typography className="cart__title" variant="h4">
                Your shopping cart
            </Typography>

            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;
