import { useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
    Card,
    CardMedia,
    CardContent,
    IconButton,
    Typography,
    Tooltip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    Button,
} from "@material-ui/core";
import "./Product.scss";

const Product = ({ id, name, price, image, description, addToCartHandler }) => {
    const [openDialog, setOpenDialog] = useState(false);

    const openDialogHandler = () => {
        setOpenDialog(true);
    };

    const closeDialogHandler = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <Card className="product">
                <CardMedia
                    className="product__media"
                    image={image}
                    title={name}
                    onClick={openDialogHandler}
                />

                <CardContent>
                    <div className="product__info">
                        <Tooltip placement="top" title={name}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                className="product__name"
                                onClick={openDialogHandler}
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
                </CardContent>
            </Card>

            <Dialog open={openDialog} onClose={closeDialogHandler}>
                <DialogTitle>{name}</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        dangerouslySetInnerHTML={{ __html: description }}
                        color="textSecondary"
                    ></DialogContentText>

                    <div className="product__dialogPrice">
                        <DialogContentText>Price:</DialogContentText>
                        <DialogContentText color="secondary">
                            {price}
                        </DialogContentText>
                    </div>

                    <div className="product__dialogImage">
                        <img src={image} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        autoFocus
                        onClick={() => addToCartHandler(id, 1)}
                    >
                        Add to cart
                    </Button>

                    <Button color="primary" onClick={closeDialogHandler}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Product;
