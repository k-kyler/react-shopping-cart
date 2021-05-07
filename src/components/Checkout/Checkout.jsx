import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import {
    Paper,
    Stepper,
    StepLabel,
    Step,
    Typography,
    Container,
    Divider,
    Button,
    CircularProgress,
    CssBaseline,
} from "@material-ui/core";
import AddressForm from "./AddressForm/AddressForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import { commerce } from "../../commerce";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, checkoutCaptureHandler, errorMessage, order }) => {
    const history = useHistory();

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutTokenId, setCheckoutTokenId] = useState("");
    const [shippingData, setShippingData] = useState({});
    const [timeOut, setTimeOut] = useState(false);

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutTokenId={checkoutTokenId} next={next} />
        ) : (
            <PaymentForm
                checkoutTokenId={checkoutTokenId}
                shippingData={shippingData}
                backStep={backStep}
                nextStep={nextStep}
                checkoutCaptureHandler={checkoutCaptureHandler}
                timeOutHandler={timeOutHandler}
            />
        );

    const Feedback = () =>
        order.customer ? (
            <>
                <div>
                    <Typography variant="h6" gutterBottom>
                        Thanks you for your purchase, $
                        {order.customer.firstname} ${order.customer.lastname}
                    </Typography>
                    <Divider className="checkout__feedbackDivider" />
                    <Typography variant="subtitle2">
                        Order ref: ${order.customer_reference}
                    </Typography>
                </div>
                <br />
                <Button
                    variant="outlined"
                    component={Link}
                    to="/"
                    type="button"
                >
                    Back to home
                </Button>
            </>
        ) : timeOut ? (
            <>
                <div>
                    <Typography variant="h6" gutterBottom>
                        Thanks you for your purchase
                    </Typography>
                    <Divider className="checkout__feedbackDivider" />
                </div>
                <br />
                <Button
                    variant="outlined"
                    component={Link}
                    to="/"
                    type="button"
                >
                    Back to home
                </Button>
            </>
        ) : (
            <div className="checkout__spinner">
                <CircularProgress />
            </div>
        );

    // Payment process time out handler
    const timeOutHandler = () => {
        setTimeout(() => {
            setTimeOut(true);
        }, 3000);
    };
    // End of payment process time out handler

    // Error handler
    if (errorMessage) {
        <>
            <Typography variant="h5">Error: ${errorMessage}</Typography>
            <br />
            <Button variant="outlined" component={Link} to="/" type="button">
                Back to home
            </Button>
        </>;
    }
    // End of error handler

    // Generate checkout token id handler
    const generateCheckoutTokenId = async (cartId, option) => {
        try {
            const checkoutTokenId = await commerce.checkout.generateToken(
                cartId,
                option
            );

            setCheckoutTokenId(checkoutTokenId);
        } catch (error) {
            // history.push("/");
        }
    };
    // End of generate checkout token id handler

    // Step handler
    const nextStep = () => {
        setActiveStep((previousStep) => previousStep + 1);
    };

    const backStep = () => {
        setActiveStep((previousStep) => previousStep - 1);
    };

    const next = (data) => {
        setShippingData(data);
        nextStep();
    };
    // End of step handler

    useEffect(() => {
        generateCheckoutTokenId(cart.id, { type: "cart" });
    }, [cart]);

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm">
                <Paper className="checkout">
                    <Typography align="center" variant="h4">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className="checkout__stepper"
                    >
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {activeStep === steps.length ? (
                        <Feedback />
                    ) : (
                        checkoutTokenId && <Form />
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default Checkout;
