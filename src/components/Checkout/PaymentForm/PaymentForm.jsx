import React from "react";
import {
    CardElement,
    Elements,
    ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Divider, Typography, Button } from "@material-ui/core";
import Review from "../Review/Review";
import "./PaymentForm.scss";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
    checkoutTokenId,
    backStep,
    nextStep,
    shippingData,
    checkoutCaptureHandler,
    timeOutHandler,
}) => {
    const paymentFormSubmitHandler = async (event, elements, stripe) => {
        event.preventDefault();

        if (!elements || !stripe) return;

        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: checkoutTokenId.live.line_items,
                customer: {
                    firstname: shippingData.firstName,
                    lastname: shippingData.lastName,
                    email: shippingData.email,
                },
                shipping: {
                    name: "Primary",
                    street: shippingData.address,
                    town_city: shippingData.city,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry,
                    county_state: shippingData.shippingSubdivision,
                },
                fulfillment: {
                    shipping_method: shippingData.shippingOption,
                },
                payment: {
                    gateway: "stripe",
                    card: {
                        token: paymentMethod.id,
                    },
                },
            };

            // Can not be process if not having credit card setting of stripe
            checkoutCaptureHandler(checkoutTokenId.id, orderData);

            // Use for displaying successful message if not having credit card setting of stripe
            timeOutHandler();

            nextStep();
        }
    };

    return (
        <div className="paymentForm">
            <Review checkoutTokenId={checkoutTokenId} />
            <Divider className="paymentForm__divider" />
            <Typography
                variant="h6"
                gutterBottom
                className="paymentForm__title"
            >
                Payment method
            </Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form
                            onSubmit={(event) =>
                                paymentFormSubmitHandler(
                                    event,
                                    elements,
                                    stripe
                                )
                            }
                        >
                            <CardElement />
                            <br />
                            <br />
                            <div className="paymentForm__buttons">
                                <Button
                                    variant="outlined"
                                    onClick={() => backStep()}
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={!stripe}
                                >
                                    Pay{" "}
                                    {
                                        checkoutTokenId.live.subtotal
                                            .formatted_with_symbol
                                    }
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    );
};

export default PaymentForm;
