import React from "react";
import PageTitle from "../../components/pagetitle";
import { feedLocales } from "./feedLocales";
import ActivityFeedItem from "../../components/FeedPageItems/ActivityFeedItem";
import { ClientContext } from "../../context/ClientContext";
import { Notification } from "../../munzee-backend/types";

export const feedItemType = {
    captureOn: "capture_on",
    entry: "entry",
    badge: "badge",
    level: "level",
    roverGoalReached: "rover_goal_reached",
    photoAdded: "photo_added",
    blastCapture: "blast_capture",
    archived: "archived",
    capture: "capture",
    deploy: "deploy"
}

export interface activityItemType {
    currentUser: any,

    itemId: string;
    itemType: string;
    points: number;
    timestamp: number;
    userData: {
        user_id: number;
        username: string;
    };
    notes?: string;

    munzeeData?: {
        captureTypeId: number;
        code: string;
        friendlyName: string;
        munzeeId: number;
        numberOfCaptures: number;
        pinIcon: string;
    };

    captureId?: string;
    roverId?: number;
    badgeId?: number;
    newLevel?: number;
    logo?: string;
    name?: string;
    typeId?: number;
    typeName?: string;
    totalCaptures?: number;
    totalPoints?: number;
    text?: string;
    message?: string;
    photo?: string;
}

const ActivityFeed = () => {

    const { backend, user, publicProfile } = React.useContext(ClientContext);

    const [isFetching, setFetching] = React.useState(false)
    const [notificationData, setNotificationData] = React.useState<Notification[]>([])

    React.useEffect(() => {
        if (publicProfile && !isFetching) {
            setFetching(true);
            const apiIndicator = async () => {
                const result = await backend?.notifications.userNotifications({ user_id: publicProfile?.userId ?? 0 })
                let arrNotification: Notification[] = [];
                result?.forEach((item) => {
                    arrNotification.push(item);
                })
                setNotificationData(arrNotification);
            }
            apiIndicator();
        }
    }, [publicProfile])

    const userName: string = publicProfile?.username ?? "";
    const items = () => {
        return notificationData.map(item => {
            return <ActivityFeedItem
                currentUser={user}
                itemId={item.item_id}
                itemType={item.item_type}
                points={item.points}
                timestamp={item.timestamp}
                userData={item.user_data}
                notes={item.notes}

                munzeeData={item.munzee_data ? {
                    captureTypeId: item.munzee_data.capture_type_id,
                    code: item.munzee_data.code,
                    friendlyName: item.munzee_data.friendly_name,
                    munzeeId: item.munzee_data.munzee_id,
                    numberOfCaptures: item.munzee_data.number_of_captures,
                    pinIcon: item.munzee_data.pin_icon,
                } : undefined}

                captureId={item.capture_id}
                roverId={item.rover_id}
                badgeId={item.badge_id}
                newLevel={item.new_level}
                logo={item.logo}
                name={item.name}
                typeId={item.type_id}
                typeName={item.type_name}
                totalCaptures={item.total_captures}
                totalPoints={item.total_points}
                text={item.text}
                message={item.message}
                photo={item.photo}
            />
        })
    }

    return (
        <main id="activity-feed">
            <div className="content-wrapper">
                <PageTitle
                    title={feedLocales.activityFeedTitle}
                    details={`${feedLocales.activityFeedDetails} ${userName}`}
                />
                <div className="items-list">
                    {user ? items() : <></>}
                </div>
            </div>
        </main>
    )
}

export default ActivityFeed;