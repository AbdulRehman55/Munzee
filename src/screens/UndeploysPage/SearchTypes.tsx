import React, { ReactEventHandler, useState } from "react";
import "./styles.scss";
import { Container, TextField, Button } from "@mui/material";
import { undeploysLocales as u } from "./undeploysLocales";
import searchIconImg from "../../assets/images/electricmystery.png";
import { searchData } from "./mockData";
import { APP_CONFIG } from "../../config/config";
import { ClientContext } from "../../context/ClientContext";
import { Link } from "react-router-dom";

const SearchTypes = ({ actionSearch }: { actionSearch: Function }): JSX.Element => {

    const { backend, user, publicProfile } = React.useContext(ClientContext);
    const [searchVal, setSearchVal] = useState('');

    const getIcons = () => {
        const currentDate = new Date();
        return searchData.map(item => {
            if (item.displayAfter) {
                const displayAfter = new Date(item.displayAfter);
                if (displayAfter > currentDate) {
                    return <></>
                }
            }
            return <Link to={`/m/${publicProfile?.username}/undeploys/0/type/${item.type}`}>
                <img src={APP_CONFIG.IMAGE_BASE_URL + `pins/${item.pin}`} alt='Munzee Icon' />
            </Link>
        });
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchVal(e.target.value);
    }

    const submitVal = () => {
        // console.log('Input value will be sent in future!') /* TO DO WHEN BACKEND IS READY */
        if (actionSearch) {
            actionSearch(searchVal)
        }
    }

    return (
        <Container id="search-types">
            <span>{u.searchFormTitle}</span>
            <div className="munzee-icons">
                {getIcons()}
            </div>
            <div className="search-form">
                <span>{u.searchByName}</span>
                <TextField
                    id="filled-search"
                    label="Min. 3 characters"
                    type="search"
                    variant="filled"
                    onChange={(e) => handleChange(e)}
                    value={searchVal}
                />
                <Button className="go-btn" onClick={() => submitVal()}>{u.goBtn}</Button>
            </div>
        </Container>
    )
}

export default SearchTypes;