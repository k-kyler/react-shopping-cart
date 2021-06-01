import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Typography,
    Tooltip,
} from "@material-ui/core";
import "./Product.scss";

const Product = ({ id, name, price, image, addToCartHandler }) => {
    return (
        <Card className="product">
            <CardMedia className="product__media" image={image} title={name} />

            <CardContent>
                <div className="product__info">
                    <Tooltip placement="top" title={name}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            className="product__name"
                        >
                            {name}
                        </Typography>
                    </Tooltip>

                    <div className="product__priceAndAdd">
                        <Typography variant="h6" color="secondary">
                            {price}
                        </Typography>

                        <IconButton
                            aria-label="Add to cart"
                            onClick={() => addToCartHandler(id, 1)}
                        >
                            <AddShoppingCartIcon />
                        </IconButton>
                    </div>
                </div>
                {/* <Typography
                    dangerouslySetInnerHTML={{ __html: description }}
                    variant="body2"
                    color="textSecondary"
                ></Typography> */}
            </CardContent>
        </Card>
    );
};

export default Product;
