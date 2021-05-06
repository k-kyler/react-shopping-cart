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
} from "@material-ui/core";
import AddressForm from "./AddressForm/AddressForm";
import PaymentForm from "./PaymentForm/PaymentForm";
import { commerce } from "../../commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutTokenId, setCheckoutTokenId] = useState("");
    const [shippingData, setShippingData] = useState({});

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutTokenId={checkoutTokenId} next={next} />
        ) : (
            <PaymentForm shippingData={shippingData} />
        );

    const Confirm = () => {
        return <div>Confirm</div>;
    };

    const generateCheckoutTokenId = async (cartId, option) => {
        try {
            const checkoutTokenId = await commerce.checkout.generateToken(
                cartId,
                option
            );

            setCheckoutTokenId(checkoutTokenId);
        } catch (error) {}
    };

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
        <Container maxWidth="sm">
            <Paper className="checkout">
                <Typography align="center" variant="h4">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep} className="checkout__stepper">
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === steps.length ? (
                    <Confirm />
                ) : (
                    checkoutTokenId && <Form />
                )}
            </Paper>
        </Container>
    );
};

export default Checkout;
