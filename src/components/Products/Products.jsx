import { useState } from "react";
import "./Products.scss";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import { Container, Button, Collapse } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import axios from "axios";

const Products = ({
    products,
    setProducts,
    pagination,
    setPagination,
    addToCartHandler,
}) => {
    const [pageNumber, setPageNumber] = useState(2);

    const loadingMoreProductsHandler = async () => {
        const {
            data: {
                data,
                meta: { pagination },
            },
        } = await axios.get(
            `https://api.chec.io/v1/products?page=${pageNumber}`,
            {
                headers: {
                    "X-Authorization":
                        process.env.REACT_APP_COMMERCEJS_PUBLIC_KEY,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        setPageNumber((pageNumber) => pageNumber + 1);
        setProducts([...products, ...data]);
        setPagination(pagination);
    };

    return (
        <Container className="products">
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                        <Product
                            id={product.id}
                            name={product.name}
                            // description={product.description}
                            price={product.price.formatted_with_symbol}
                            image={product.media.source}
                            addToCartHandler={addToCartHandler}
                        />
                    </Grid>
                ))}

                {pagination &&
                    pagination.current_page < pagination.total_pages && (
                        <Grid item xs={12} className="products__pagination">
                            <Button
                                onClick={loadingMoreProductsHandler}
                                startIcon={<KeyboardArrowDownIcon />}
                                variant="contained"
                                color="secondary"
                            >
                                More
                            </Button>
                        </Grid>
                    )}
            </Grid>
        </Container>
    );
};

export default Products;
