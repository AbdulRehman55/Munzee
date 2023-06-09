import React, { useEffect } from "react";
import EventIndicator from "../EventIndicator";
import { ClientContext } from "../../context/ClientContext";

const ProfilePage = (): JSX.Element => {
  const { backend, user, publicProfile } = React.useContext(ClientContext);
  // backend?.user.userByName("Ashvinfreezetag", {user_id: 596608})
  // backend?.user.userCaptures({page: 0, user_id: user?.userId ?? 0})

  const [capturesItemsData, setCapturesItemsData] = React.useState<any[]>([]);
  const [popluarItemsData, setPopluarItemsData] = React.useState<any[]>([]);
  const [daysActivityData, setDaysActivityData] = React.useState<any[]>([]);

  useEffect(() => {
    // alert(JSON.stringify(user))
    if (publicProfile != null) {
      const apiCaptures = async () => {
        const result = await backend?.user.userCaptures({
          page: 0,
          user_id: publicProfile?.userId ?? 0,
        });
        let arrPanelItemsData: any[] = [];
        result?.forEach((data) => {
          //pin_icon, friendly_name, deployed_at, points, url,
          arrPanelItemsData.push({
            icon: data.pin_icon ?? "",
            title: data.friendly_name ?? "",
            timeAgo: data.deployed_at ?? "",
            points: data.points ?? "",
            link: data.url ?? "",
            type: "points",
          });
        });
        setCapturesItemsData(arrPanelItemsData);
      };
      const apiPopluar = async () => {
        const result = await backend?.user.userPopluar({
          page: 0,
          user_id: publicProfile?.userId ?? 0,
          filter: 0,
        });
        let arrPanelItemsData: any[] = [];
        result?.forEach((data) => {
          //pin_icon, friendly_name, deployed_at, number_of_captures, url,
          arrPanelItemsData.push({
            icon: data.pin_icon ?? "",
            title: data.friendly_name ?? "",
            timeAgo: data.deployed_at ?? "",
            points: data.number_of_captures ?? "",
            link: data.url ?? "",
            type: "captures",
          });
        });
        setPopluarItemsData(arrPanelItemsData);
      };
      const apiIndicator = async () => {
        const result = await backend?.user.userIndicator({
          page: 0,
          user_id: publicProfile?.userId ?? 0,
        });
        const activityData = Object.keys(result || {}).map((r) => ({
          ...result?.[r],
          route: r,
        }));
        setDaysActivityData(activityData);
      };
      apiCaptures();
      apiPopluar();
      apiIndicator();
    } else {
      setCapturesItemsData([]);
      setPopluarItemsData([]);
      setDaysActivityData([]);
    }
  }, [publicProfile]);

  return (
    <EventIndicator
      daysActivityData={daysActivityData}
      leftPanelItemsData={popluarItemsData}
      rightPanelItemsData={capturesItemsData}
    />
  );
};

export default ProfilePage;
