import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
} from "@material-ui/core";
import "./Product.scss";

const Product = ({ id, name, description, price, image, addToCartHandler }) => {
    return (
        <Card className="product">
            <CardMedia className="product__media" image={image} title={name} />

            <CardContent>
                <div className="product__info">
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="h6" gutterBottom color="secondary">
                        {price}
                    </Typography>
                </div>
                <Typography
                    dangerouslySetInnerHTML={{ __html: description }}
                    variant="body2"
                    color="textSecondary"
                ></Typography>
            </CardContent>

            <CardActions disableSpacing className="product__actions">
                <IconButton
                    aria-label="Add to cart"
                    onClick={() => addToCartHandler(id, 1)}
                >
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
