import React from "react";
import "./styles.scss";
import { Link, Typography } from "@mui/material";
import { numberFormat } from "../../../utils/functions/functions";

interface TabProps{
    count: number;
    title: string;
    link?: string;
    child?: LinkMenu[];
}
interface LinkMenu {
    count: number;
    title: string;
    link?: string;
}

const UserStatisticTab = ({ count, title, link, child }: TabProps):JSX.Element => {
    if ( child )
    {
        return(<Typography component="div" className="user-stat-tab">
            { child.map((item, itemIndex) => {
                return (
                    <Typography component="span" fontSize={16.8}>
                        {itemIndex > 0 && ' • '}
                        <Link className={`${item.link?.length ? '' : 'no-link'}`} href={item.link}>
                            { item.count > 0 && <span className="bold-text">{numberFormat(item.count)}</span>}
                            <span>{item.title}</span>
                        </Link>
                    </Typography>
                );
            }) }
        </Typography>);
    }else{
        return(
            <Link className={`user-stat-tab ${link?.length ? '' : 'no-link'}`} href={link}>
                <span className="bold-text">{numberFormat(count)}</span>
                <span>{title}</span>
            </Link>
        )
    }
};

export default UserStatisticTab;