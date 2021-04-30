import React from "react";
import "./Products.scss";
import Grid from "@material-ui/core/Grid";
import Product from "../Product/Product";

const products = [
    {
        id: 1,
        name: "Macbook Pro",
        price: "$1200",
        description: "Apple macbook",
        image:
            "https://macbook.haloshop.vn/image/cache/catalog/products/apple/macbook/macbook-air-2020-chip-m1-gray-00-700x700.jpg",
    },
    {
        id: 2,
        name: "Inspiron 5000",
        price: "$900",
        description: "Dell laptop",
        image:
            "https://cdn.nguyenkimmall.com/images/thumbnails/600/336/detailed/616/10044092-dell-inspiron-5593-i5-1035g1-15-6-inch-n5I5513w-1_v9ip-ds_4nr4-09.jpg",
    },
];

const Products = () => {
    return (
        <div className="products">
            <Grid container justify="center" spacing={3}>
                {products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                        <Product
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Products;
