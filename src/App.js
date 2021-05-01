import { Navbar, Products, Cart } from "./components";
import { commerce } from "./commerce";
import { useState, useEffect } from "react";

function App() {
    // Create products state
    const [products, setProducts] = useState([]);

    // Create loading state
    const [isLoading, setIsLoading] = useState(true);

    // Create cart state
    const [cart, setCart] = useState({});

    // Get products
    const getProducts = async () => {
        const { data } = await commerce.products.list();

        // Set products state
        setProducts(data);

        // Set loading if products are not loaded
        data ? setIsLoading(false) : setIsLoading(true);
    };

    // Get carts
    const getCart = async () => {
        const data = await commerce.cart.retrieve();

        // Set cart state
        setCart(data);

        // Set loading if cart is not loaded
        data ? setIsLoading(false) : setIsLoading(true);
    };

    // Add item to cart handler
    const addToCartHandler = async (productId, amount) => {
        const item = await commerce.cart.add(productId, amount);

        setCart(item.cart);
    };

    // Get products and cart after render
    useEffect(() => {
        getProducts();
        getCart();
    }, []);

    return (
        <>
            {/* Header */}
            <Navbar isLoading={isLoading} totalItems={cart.total_items} />

            {/* Set loading if products are not loaded else display products list */}
            {isLoading === false && (
                // <Products
                //     products={products}
                //     addToCartHandler={addToCartHandler}
                // />

                <Cart cart={cart} isLoading={isLoading} />
            )}
        </>
    );
}

export default App;
