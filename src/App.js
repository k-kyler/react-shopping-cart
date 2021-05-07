import { Navbar, Products, Cart, Checkout } from "./components";
import { commerce } from "./commerce";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    // Get products
    const getProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);

        // Set loading if products are not loaded
        data ? setIsLoading(false) : setIsLoading(true);
    };

    // Get carts
    const getCart = async () => {
        const cart = await commerce.cart.retrieve();

        setCart(cart);

        // Set loading if cart is not loaded
        cart ? setIsLoading(false) : setIsLoading(true);
    };

    // Add item to cart handler
    const addToCartHandler = async (productId, amount) => {
        const { cart } = await commerce.cart.add(productId, amount);

        setCart(cart);
    };

    // Update cart's item quantity handler
    const updateCartItemHandler = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, {
            quantity,
        });

        setCart(cart);
    };

    // Remove item from cart handler
    const removeFromCartHandler = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    };

    // Empty all items in cart
    const emptyCart = async () => {
        const { cart } = await commerce.cart.empty();

        setCart(cart);
    };

    // Checkout capture handler
    const checkoutCaptureHandler = async (checkoutTokenId, newOrder) => {
        try {
            refreshCart();

            const incomingOrder = await commerce.checkout.capture(
                checkoutTokenId,
                newOrder
            );

            setOrder(incomingOrder);
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    };

    // Refresh cart
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    };

    // Get products and cart after render
    useEffect(() => {
        getProducts();
        getCart();
    }, []);

    return (
        <Router>
            {/* Header */}
            <Navbar isLoading={isLoading} totalItems={cart.total_items} />

            <Switch>
                <Route exact path="/cart">
                    {/* Set loading if cart are not loaded else display cart list */}
                    {isLoading === false && (
                        <Cart
                            cart={cart}
                            isLoading={isLoading}
                            updateCartItemHandler={updateCartItemHandler}
                            removeFromCartHandler={removeFromCartHandler}
                            emptyCart={emptyCart}
                        />
                    )}
                </Route>

                <Route exact path="/checkout">
                    <Checkout
                        cart={cart}
                        checkoutCaptureHandler={checkoutCaptureHandler}
                        errorMessage={errorMessage}
                        order={order}
                    />
                </Route>

                <Route exact path="/">
                    {/* Set loading if products are not loaded else display products list */}
                    {isLoading === false && (
                        <Products
                            products={products}
                            addToCartHandler={addToCartHandler}
                        />
                    )}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
