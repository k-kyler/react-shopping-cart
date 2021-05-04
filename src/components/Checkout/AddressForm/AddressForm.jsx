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

const AddressForm = ({ checkoutTokenId }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");

    const formMethods = useForm();

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

    useEffect(() => {
        getShippingCountries(checkoutTokenId.id);
    }, []);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>

            <FormProvider {...formMethods}>
                <form>
                    <Grid container spacing={3}>
                        <CustomTextField
                            required
                            name="firstName"
                            label="First name"
                        />
                        <CustomTextField
                            required
                            name="lastName"
                            label="Last name"
                        />
                        <CustomTextField required name="email" label="Email" />
                        <CustomTextField
                            required
                            name="address"
                            label="Address"
                        />
                        <CustomTextField required name="city" label="City" />
                        <CustomTextField
                            required
                            name="zip"
                            label="ZIP / Postal code"
                        />
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
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping subdivision</InputLabel>
                            <Select onChange={} fullWidth value={}>
                                <MenuItem key={} value={}></MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping options</InputLabel>
                            <Select onChange={} fullWidth value={}>
                                <MenuItem key={} value={}></MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
};

export default AddressForm;
