import React from "react";
import "./styles.scss";
import { photoGalleryItemType } from "../../screens/More/PhotoGallery";
import { Button } from "@mui/material";

interface iProps extends photoGalleryItemType{
    index: number;
    onSelect: any;
}

const PhotoGalleryMoreItem = ({ index,  onSelect, ...props }: iProps): JSX.Element => {

    return(
        <Button className="photo" onClick={() => onSelect(props)}>
            <img src={props.pic} alt="Picture" />
        </Button>
    )
}

export default PhotoGalleryMoreItem;