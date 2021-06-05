import { useState, useEffect } from "react";
import "./Search.scss";
import SearchIcon from "@material-ui/icons/Search";
import {
    InputBase,
    Container,
    Grid,
    CircularProgress,
    Typography,
} from "@material-ui/core";
import { commerce } from "../../commerce";

const Search = () => {
    const [input, setInput] = useState("");
    const [searchingProgress, setSearchingProgress] = useState(false);
    const [text, setText] = useState("No item being searched...");
    const [searchList, setSearchList] = useState([]);

    const inputHandler = (value) => {
        setInput(value);
        setSearchingProgress(true);
    };

    const getPageData = async (pageNumber) => {
        const {
            data: {
                data,
                meta: { pagination },
            },
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

        if (data) return data
        return null;
    };

    const getSearchList = async () => {
        const {
            data,
            meta: { pagination },
        } = await commerce.products.list();
        let pageNumber = 2;
        let pageData = [];

        while (true) {
            let data = getPageData(pageNumber);

            pageData.push(data);
            pageNumber++;

            if (!data) break;
        }

        setSearchList([...data, ...pageData]);
    };

    const searchHandler = () => {
        try {
        } catch (error) {
            if (error) {
                setText("No items found...");
                setSearchingProgress(false);
            }
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
            <div className="search__input MuiPaper-elevation4">
                <SearchIcon />
                <InputBase
                    className="search__inputBase"
                    placeholder="Find your favourite items..."
                    value={input}
                    onChange={(event) => inputHandler(event.target.value)}
                />
            </div>

            <Grid container justify="center" spacing={4}>
                {!input || !searchingProgress ? (
                    <Grid item xs={12} className="search__init">
                        <Typography variant="h5" color="primary">
                            {text}
                        </Typography>
                    </Grid>
                ) : searchingProgress ? (
                    <Grid item xs={12} className="search__progressing">
                        <CircularProgress />
                    </Grid>
                ) : null}
            </Grid>
        </Container>
    );
};

export default Search;
