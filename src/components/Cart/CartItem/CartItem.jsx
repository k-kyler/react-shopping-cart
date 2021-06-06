import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
    IconButton,
    Tooltip,
} from "@material-ui/core";
import "./CartItem.scss";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const CartItem = ({ item, updateCartItemHandler, removeFromCartHandler }) => {
    return (
        <Card className="cartItem">
            <CardMedia
                className="cartItem__media"
                image={item.media.source}
                alt={item.name}
            />

            <CardContent className="cartItem__content">
                <Tooltip placement="top" title={item.name}>
                    <Typography variant="h6" className="cartItem__name">
                        {item.name}
                    </Typography>
                </Tooltip>

                <Typography variant="h6" color="secondary">
                    {item.line_total.formatted_with_symbol}
                </Typography>
            </CardContent>

            <CardActions className="cartItem__actions">
                <div className="cartItem__buttons">
                    <IconButton
                        type="button"
                        size="small"
                        onClick={() =>
                            updateCartItemHandler(item.id, item.quantity - 1)
                        }
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{item.quantity}</Typography>
                    <IconButton
                        onClick={() =>
                            updateCartItemHandler(item.id, item.quantity + 1)
                        }
                        type="button"
                        size="small"
                    >
                        <AddIcon />
                    </IconButton>
                </div>

                <Button
                    onClick={() => removeFromCartHandler(item.id)}
                    type="button"
                    color="secondary"
                    variant="contained"
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;
