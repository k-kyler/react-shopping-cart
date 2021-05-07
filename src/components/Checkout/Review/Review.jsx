import React from "react";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import "./Review.scss";

const Review = ({ checkoutTokenId }) => {
    return (
        <div className="review">
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <List disablePadding className="review__list">
                {checkoutTokenId.live.line_items.map((product) => (
                    <ListItem key={product.name}>
                        <ListItemText
                            primary={product.name}
                            secondary={`Quantity: ${product.quantity}`}
                        />
                        <Typography variant="body2">
                            {product.line_total.formatted_with_symbol}
                        </Typography>
                    </ListItem>
                ))}

                <ListItem className="review__total">
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1">
                        {checkoutTokenId.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </div>
    );
};

export default Review;
