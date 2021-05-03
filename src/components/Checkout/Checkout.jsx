import React, { useState } from "react";
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

const steps = ["Shipping address", "Payment details"];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);

    const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

    const Confirm = () => {
        return <div>Confirm</div>;
    };

    return (
        <Container>
            <Paper className="checkout">
                <Typography align="center" variant="h4">
                    Checkout
                </Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === steps.length ? <Confirm /> : <Form />}
            </Paper>
        </Container>
    );
};

export default Checkout;
