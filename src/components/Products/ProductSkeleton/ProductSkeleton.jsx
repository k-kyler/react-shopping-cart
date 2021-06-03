import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import "./ProductSkeleton.scss";
import { Card } from "@material-ui/core";

const ProductSkeleton = () => {
    return (
        <Card className="productSkeleton">
            <Skeleton variant="rect" className="productSkeleton__rect" />

            <Skeleton variant="text" className="productSkeleton__textTitle" />

            <div className="productSkeleton__actions">
                <Skeleton
                    variant="text"
                    className="productSkeleton__textPrice"
                />
                <Skeleton variant="circle" width={35} height={35} />
            </div>
        </Card>
    );
};

export default ProductSkeleton;
