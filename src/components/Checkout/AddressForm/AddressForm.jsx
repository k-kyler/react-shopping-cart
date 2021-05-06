import React, { useState, useEffect } from "react";
import {
    Typography,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Grid,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "../CustomTextField/CustomTextField";
import { commerce } from "../../../commerce";
import { Link } from "react-router-dom";
import "./AddressForm.scss";

const AddressForm = ({ checkoutTokenId, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");

    const formMethods = useForm();

    // Shipping countries handler
    const getShippingCountries = async (checkoutTokenId) => {
        const {
            countries,
        } = await commerce.services.localeListShippingCountries(
            checkoutTokenId
        );

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    // End of shipping countries handler

    // Shipping subdivisions handler
    const getSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode
        );

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const subdivisions = Object.entries(shippingSubdivisions).map(
        ([code, name]) => ({
            id: code,
            label: name,
        })
    );
    // End of shipping subdivisions handler

    // Shipping options handler
    const getShippingOptions = async (
        country,
        checkoutTokenId,
        subdivision = null
    ) => {
        const options = await commerce.checkout.getShippingOptions(
            checkoutTokenId,
            { country, subdivision }
        );

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    const options = shippingOptions.map((option) => ({
        id: option.id,
        label: `${option.description} - ${option.price.formatted_with_symbol}`,
    }));
    // End of shipping options handler

    useEffect(() => {
        getShippingCountries(checkoutTokenId.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) getSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision)
            getShippingOptions(
                shippingCountry,
                checkoutTokenId.id,
                shippingSubdivision
            );
    }, [shippingSubdivision]);

    return (
        <div className="addressForm">
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>

            <FormProvider {...formMethods}>
                <form
                    onSubmit={formMethods.handleSubmit((data) =>
                        next({
                            ...data,
                            shippingCountry,
                            shippingSubdivision,
                            shippingOption,
                        })
                    )}
                >
                    <Grid container spacing={3}>
                        <CustomTextField name="firstName" label="First name" />
                        <CustomTextField name="lastName" label="Last name" />
                        <CustomTextField name="email" label="Email" />
                        <CustomTextField name="address" label="Address" />
                        <CustomTextField name="city" label="City" />
                        <CustomTextField name="zip" label="ZIP / Postal code" />

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping country</InputLabel>
                            <Select
                                fullWidth
                                value={shippingCountry}
                                onChange={(event) =>
                                    setShippingCountry(event.target.value)
                                }
                            >
                                {countries.map((country) => (
                                    <MenuItem
                                        key={country.id}
                                        value={country.id}
                                    >
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping subdivision</InputLabel>
                            <Select
                                fullWidth
                                value={shippingSubdivision}
                                onChange={(event) =>
                                    setShippingSubdivision(event.target.value)
                                }
                            >
                                {subdivisions.map((subdivision) => (
                                    <MenuItem
                                        key={subdivision.id}
                                        value={subdivision.id}
                                    >
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping options</InputLabel>
                            <Select
                                onChange={(event) =>
                                    setShippingOption(event.target.value)
                                }
                                fullWidth
                                value={shippingOption}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <div className="addressForm__buttons">
                        <Button component={Link} to="/cart" variant="outlined">
                            Back to cart
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default AddressForm;
