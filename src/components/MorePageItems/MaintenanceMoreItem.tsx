import React from "react";
import "./styles.scss";
import { maintenanceModeItemType } from "../../screens/More/MaintenanceMode";
import moreItem from "../../assets/images/more-item.png";

const MaintenanceMoreItem = ({ message, timeReported, timeCaptured }: maintenanceModeItemType): JSX.Element => {
    return (
        <div className="maintenance-more-item">
            <div className="item-wrapper">
                <img src={moreItem} alt="User avatar" />
                <span className="message">
                    {message}
                </span>
                <span className="time-reported">
                    reported
                    <span>{timeReported}</span>
                </span>
                { timeCaptured && <span className="time-captured">and last captured <span>{timeCaptured}</span> </span> }
            </div>
        </div>
    )
}

export default MaintenanceMoreItem;