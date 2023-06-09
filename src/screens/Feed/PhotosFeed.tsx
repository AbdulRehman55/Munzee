import React from "react";
import "./styles.scss";
import { PageTitle } from "../../components";
import { feedLocales } from "./feedLocales";
import PhotosFeedItem from "../../components/FeedPageItems/PhotosFeedItem";
import { ClientContext } from "../../context/ClientContext";
import { Photos } from "../../munzee-backend/types";

export interface photosItemType {
     pathSmall: string,

     // id: string;
     photo: string;
     timestamp: number;
     user: {
          userId: string;
          username: string;
     };
     munzeeData: {
          captureTypeId: string;
          code: string;
          friendlyName: string;
          munzeeId: string;
          pinIcon: string;
     };
}

const PhotosFeed = (): JSX.Element => {

     const { backend, user, publicProfile } = React.useContext(ClientContext);

     const [isFetching, setFetching] = React.useState(false)
     const [photosData, setPhotosData] = React.useState<Photos[]>([])
     const [pathSmall, setPathSmall] = React.useState("")


     React.useEffect(() => {
          if (publicProfile && !isFetching) {
               setFetching(true);
               const apiIndicator = async () => {
                    const result = await backend?.user.userPhotos({ user_id: publicProfile?.userId ?? 0 })
                    
                    let arrPhotos: Photos[] = [];
                    result?.photos?.forEach((item) => {
                         arrPhotos.push(item);
                    })
                    
                    setPathSmall(result?.path_small ?? "")
                    setPhotosData(arrPhotos);
               }
               apiIndicator();
          }
     }, [publicProfile])


     const items = () => {
          if (photosData.length == 0) {
               return <div className="alert alert-success text-center">No photos yet</div>
          }
          return photosData.map(item => {
               return <PhotosFeedItem
                    pathSmall={pathSmall}
                    photo={item.photo}
                    timestamp={item.timestamp}
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

     const userName: string = publicProfile?.username ?? "";
     const { photosFeedTitle, photosFeedDetails } = feedLocales;

     return (
          <main id="photos-feed">
               <div className="content-wrapper">
                    <PageTitle
                         title={photosFeedTitle}
                         details={`${photosFeedDetails[0] + userName + '`s' + photosFeedDetails[1]}`}
                    />
                    <div className="items-list">
                         {items()}
                    </div>
               </div>
          </main>
     )
}

export default PhotosFeed;