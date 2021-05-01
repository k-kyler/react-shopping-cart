import React from "react";
import { Container, Grid, Button, Typography } from "@material-ui/core";
import "./Cart.scss";

const Cart = ({ cart, isLoading }) => {
    const isEmpty = cart.line_items.length === 0 && isLoading === false;
    const EmptyCart = () => (
        <Typography variant="subtitle1">No items here...</Typography>
    );
    const FilledCart = () => (
        <>
            <Grid container spacing={3} className="cart__container">
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <div>{item.name}</div>
                    </Grid>
                ))}
            </Grid>

            <div className="cart__details">
                <Typography variant="h6">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button
                        variant="contained"
                        size="large"
                        className="cart__emptyButton"
                        type="button"
                        color="secondary"
                    >
                        Empty cart
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        className="cart__checkoutButton"
                        type="button"
                        color="primary"
                    >
                        Checkout
                    </Button>
                </div>
            </div>
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
