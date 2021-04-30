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

const Product = ({ name, description, price, image }) => {
    return (
        <Card className="product">
            <CardMedia className="product__media" image={image} title={name} />

            <CardContent>
                <div className="product__info">
                    <Typography variant="h5" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="h5">{price}</Typography>
                </div>
                <Typography variant="body2" color="textSecondary">
                    {description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing className="product__actions">
                <IconButton aria-label="Add to cart">
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
