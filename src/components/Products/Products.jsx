import { useState } from "react";
import "./Products.scss";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import ProductSkeleton from "./ProductSkeleton/ProductSkeleton";
import { Container, Button, CircularProgress } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import axios from "axios";

const Products = ({
    products,
    setProducts,
    pagination,
    setPagination,
    addToCartHandler,
    isLoading,
}) => {
    const [pageNumber, setPageNumber] = useState(2);
    const [progress, setProgress] = useState(false);

    const skeletonItems = [...Array(20).keys()];

    const loadingMoreProductsHandler = async () => {
        setProgress(true);

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

        if (data) setProgress(false);
        setPageNumber((pageNumber) => pageNumber + 1);
        setProducts([...products, ...data]);
        setPagination(pagination);
    };

    const ProductsList = () => (
        <>
            {products.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                    <Product
                        id={product.id}
                        name={product.name}
                        price={product.price.formatted_with_symbol}
                        image={product.media.source}
                        description={product.description}
                        addToCartHandler={addToCartHandler}
                    />
                </Grid>
            ))}

            {pagination && pagination.current_page < pagination.total_pages && (
                <Grid item xs={12} className="products__pagination">
                    <Button
                        onClick={loadingMoreProductsHandler}
                        startIcon={
                            progress ? (
                                <CircularProgress
                                    className="products__buttonProgress"
                                    thickness={5}
                                    size={18}
                                />
                            ) : (
                                <KeyboardArrowDownIcon />
                            )
                        }
                        variant="contained"
                        color="secondary"
                    >
                        See More
                    </Button>
                </Grid>
            )}
        </>
    );

    const ProductsSkeletonList = () => (
        <>
            {skeletonItems.map((temp, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <ProductSkeleton />
                </Grid>
            ))}
        </>
    );

    return (
        <Container className="products">
            <Grid container justify="center" spacing={4}>
                {isLoading ? <ProductsSkeletonList /> : <ProductsList />}
            </Grid>
        </Container>
    );
};

export default Products;
