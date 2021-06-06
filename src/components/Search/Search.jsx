import { useState, useEffect } from "react";
import "./Search.scss";
import SearchIcon from "@material-ui/icons/Search";
import {
    InputBase,
    Container,
    Grid,
    CircularProgress,
} from "@material-ui/core";
import { commerce } from "../../commerce";
import axios from "axios";
import Product from "../Products/Product/Product";
import SearchPng from "../../assets/Search.gif";

const Search = ({ addToCartHandler }) => {
    const [input, setInput] = useState("");
    const [searchingProgress, setSearchingProgress] = useState(false);
    const [searchList, setSearchList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const inputHandler = (value) => {
        setInput(value);
        setSearchingProgress(true);
    };

    const getPageData = async (pageNumber) => {
        const {
            data: { data },
        } = await axios.get(
            `https://api.chec.io/v1/products?page=${pageNumber}`,
            {
                headers: {
                    "X-Authorization":
                        process.env.REACT_APP_COMMERCEJS_PUBLIC_KEY,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );

        if (data) return data;
        return null;
    };

    const getSearchList = async () => {
        const { data } = await commerce.products.list();
        let pageNumber = 2;
        let pageData = [];

        try {
            while (true) {
                const data = await getPageData(pageNumber);

                if (!data.length) break;
                pageData.push(...data);
                pageNumber++;
            }
        } catch (error) {}

        setSearchList([...data, ...pageData]);
    };

    const searchHandler = () => {
        const results = searchList.filter((item) =>
            item.name.trim().toLowerCase().includes(input.trim().toLowerCase())
        );

        if (results && results.length) {
            setSearchingProgress(false);
            setSearchResults(results);
        }
    };

    useEffect(() => {
        getSearchList();
    }, []);

    useEffect(() => {
        if (input) searchHandler();
    }, [input]);

    return (
        <Container className="search">
            <Grid container justify="center" spacing={4}>
                <Grid item xs={12} sm={6} md={6} className="search__form">
                    <div className="search__input MuiPaper-elevation4">
                        <SearchIcon className="search__icon" />
                        <InputBase
                            className="search__inputBase"
                            placeholder="Find your favourite items here..."
                            value={input}
                            onChange={(event) =>
                                inputHandler(event.target.value)
                            }
                        />
                    </div>
                </Grid>
            </Grid>

            <Grid
                container
                justify="center"
                spacing={4}
                className="search__container"
            >
                {!input ? (
                    <Grid item xs={12} className="search__image">
                        <img src={SearchPng} alt="No items being searched..." />
                    </Grid>
                ) : searchingProgress ? (
                    <Grid item xs={12} className="search__progressing">
                        <CircularProgress />
                    </Grid>
                ) : searchResults && searchResults.length ? (
                    <>
                        {searchResults.map((product) => (
                            <Grid
                                key={product.id}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                            >
                                <Product
                                    id={product.id}
                                    name={product.name}
                                    price={product.price.formatted_with_symbol}
                                    image={product.media.source}
                                    description={product.description}
                                    addToCartHandler={addToCartHandler}
                                />
                            </Grid>
                        ))}
                    </>
                ) : null}
            </Grid>
        </Container>
    );
};

export default Search;
