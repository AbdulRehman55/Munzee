import React from "react";
import "./styles.scss";
import { PageTitle } from "../../components";
import { feedLocales } from "./feedLocales";
import { ClientContext } from "../../context/ClientContext";

import EntriesFeedItem from "../../components/FeedPageItems/EntriesFeedItem";
import { Entries } from "../../munzee-backend/types";

export interface entriesItemType {
    // entryId: string;
    // userId: number;
    typeId: number;
    typeName: string;
    timestamp: number;
    notes: string;
    user: {
        userId: number;
        username: string;
    };
    munzeeData: {
        captureTypeId: number;
        code: string;
        friendlyName: string;
        munzeeId: number;
        pinIcon: string;
    };
}

const EntriesFeed = (): JSX.Element => {

    const { backend, user, publicProfile } = React.useContext(ClientContext);

    const [isFetching, setFetching] = React.useState(false)
    const [entriesData, setEntriesData] = React.useState<Entries[]>([])

    React.useEffect(() => {
        if (publicProfile && !isFetching) {
            setFetching(true);
            const apiEntries = async () => {
                const result = await backend?.user.userEntries({ user_id: publicProfile?.userId ?? 0 });// as Map<string, Entries>
                let arrEntries: Entries[] = [];
                Object.values(result?.entries ?? {})?.forEach((item) => {
                    arrEntries.push(item);
                })
                setEntriesData(arrEntries);
            }
            apiEntries();
        }
    }, [publicProfile])

    const userName: string = publicProfile?.username ?? "";

    const items = () => {
        return entriesData.map(item => {
            return <EntriesFeedItem
                // entryId={item.entry_id}
                // userId={item.user_id}
                typeId={item.type_id}
                typeName={item.type_name}
                timestamp={item.timestamp}
                notes={item.notes}
                user={{
                    userId: item.user_data.user_id,
                    username: item.user_data.username
                }}
                munzeeData={{
                    captureTypeId: item.munzee_data.capture_type_id,
                    code: item.munzee_data.code,
                    friendlyName: item.munzee_data.friendly_name,
                    munzeeId: item.munzee_data.munzee_id,
                    pinIcon: item.munzee_data.pin_icon
                }}
            />
        })
    }

    const { entriesFeedDetails, entriesFeedTitle } = feedLocales;
    return (
        <main id="entries-feed">
            <div className="content-wrapper">
                <PageTitle
                    title={entriesFeedTitle}
                    details={`${entriesFeedDetails[0] + userName + '`s' + entriesFeedDetails[1]}`}
                />
                <div className="items-list">
                    {user ? items() : <></>}
                </div>
            </div>
        </main>
    )
}

export default EntriesFeed;