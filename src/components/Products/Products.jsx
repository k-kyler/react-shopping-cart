import React from "react";
import "./Products.scss";
import Grid from "@material-ui/core/Grid";
import Product from "../Product/Product";
import { Container } from "@material-ui/core";

const Products = ({ products, addToCartHandler }) => {
    return (
        <Container className="products">
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                        <Product
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            price={product.price.formatted_with_symbol}
                            image={product.media.source}
                            addToCartHandler={addToCartHandler}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products;
