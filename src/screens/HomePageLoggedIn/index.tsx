import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Box, Button, Typography } from "@mui/material";
import noAvatar from "../../assets/images/no_avatar.png";
import UserStatisticTab from "../../components/tabs/UserStatisticTabs";
import SubMenu from "../../components/SubMenu";
import { ClientContext } from "../../context/ClientContext";
import { Link, useLocation, useParams } from "react-router-dom";
import { UserInfo } from "../../munzee-backend";
import { Munzee } from "../../munzee-backend/types";
import { APP_CONFIG } from "../../config/config";
import { numberFormat } from "../../utils/functions/functions";
import { count } from "console";
import MunzeeSubMenu from "../../components/MunzeeSubMenu";
import starIcon from "../../assets/images/start-icon.svg";
import activityUserAvatar from "../../assets/images/activityUserAvatar.png";
import tab1Icon from "../../assets/images/tab1.svg";
import tab2Icon from "../../assets/images/tab2.svg";
import tab3Icon from "../../assets/images/tab3.svg";
import tab4Icon from "../../assets/images/tab4.svg";
import tab5Icon from "../../assets/images/tab5.svg";

interface tabs {
  title: string;
  link?: string;
  count?: number;
  child?: LinkMenu[];
}
interface LinkMenu {
  count: number;
  title: string;
  link?: string;
}
const HomePageLoggedIn = (): JSX.Element => {
  const { id, munzeeId } = useParams();
  const { backend, user, publicProfile, setPublicProfile, munzeeRefresh, setMunzeeRefresh, setMunzeeDetailApi, } = React.useContext(ClientContext);
  const isPremiumAccount = publicProfile?.premium === 1;
  const [munzeeDetail, setMunzeeDetail] = useState<Munzee>();

  const { pathname } = useLocation();

  const tabs = () => {
    const tabsData: tabs[] = [];
    tabsData.push({
      title: "Points",
      count: publicProfile?.points,
      link: `/player/points/${publicProfile?.username}`,
    });
    tabsData.push({
      title: "Captures",
      count: publicProfile?.numberOfCaptures,
      link: `/m/${publicProfile?.username}/captures/`,
    });
    tabsData.push({
      title: "Deployed",
      count: publicProfile?.numberOfDeployments,
      link: `/m/${publicProfile?.username}/deploys/`,
    });
    tabsData.push({
      title: "Badges",
      count: publicProfile?.numberOfBadges,
      link: `/m/${publicProfile?.username}/badges/`,
    });
    tabsData.push({
      title: "Days Old",
      count: publicProfile?.daysOld,
    });
    return tabsData.map((item, itemIndex) => {
      return (
        <UserStatisticTab
          key={itemIndex}
          count={item.count ?? 0}
          title={item.title}
          link={item.link}
        />
      );
    });
  };

  const clain = () => {
    if (publicProfile?.clan != undefined) {
      const clain = publicProfile?.clan;
      return (
        <div className="col-lg-6 col-xs-12 clan">
          <h2>
            <small>Clan</small>
            <br />
            <a href="/clans/beginnersclan/">{clain.name}</a>
          </h2>
          <a href={clain.url}>
            <img className="user-photo" src={clain.logo} alt="Clan" />
          </a>
        </div>
      );
    } else {
      <div />;
    }
  };

  const tabsMunzeeActivity = () => {
    const tabsData: tabs[] = [];
    tabsData.push({
      title: "Captures",
      count: munzeeDetail?.number_of_captures ? munzeeDetail?.number_of_captures : 0,
      link: `/m/${publicProfile?.username}/${munzeeId}/captures/`,
    });
    tabsData.push({
      title: "Entries",
      count: munzeeDetail?.number_of_entries ?? 0,
      link: `/m/${publicProfile?.username}/${munzeeId}/entries/`,
    });
    tabsData.push({
      title: "Rovers",
      count: munzeeDetail?.rovers?.length,
      link: `/m/${publicProfile?.username}/${munzeeId}/rovers/`,
    });
    tabsData.push({
      title: "Photos",
      count: munzeeDetail?.photos ?? 0,
      link: `/m/${publicProfile?.username}/${munzeeId}/photos/`,
    });
    tabsData.push({
      title: "Notes • Stats",
      count: 0,
      link: `/m/${publicProfile?.username}/${munzeeId}/notes/`,
      child: [{
        title: "Notes",
        count: 0,
        link: `/m/${publicProfile?.username}/${munzeeId}/notes/`,
      }, {
        title: "Stats",
        count: 0,
        link: `/m/${publicProfile?.username}/${munzeeId}/stats/`,
      }]
    });
    return tabsData.map((item, itemIndex) => {
      return (
        <UserStatisticTab
          key={itemIndex}
          count={item.count ?? 0}
          title={item.title}
          link={item.link}
          child={item.child ?? undefined}
        />
      );
    });
  };

  const handleBecomePremiumBtn = () => {
    console.log("handleBecomePremiumBtn clicked!"); /* TO DO later */
  };

  const apiPublicUser = async () => {
    const result = await backend?.user.user({ user_id: 0, username: id });
    if (result) {
      const userInfo: UserInfo = {
        username: result!!.username,
        email: "",
        uid: result!!.user_id.toString(),
        userId: result!!.user_id,
        userTypeId: result!!.user_type_id,
        avatar: result!!.avatar,
        premium: result!!.premium,
        premiumExpires: result!!.premium_expires,
        level: result!!.level,
        rank: result!!.rank,
        numberOfCaptures: result!!.number_of_captures,
        numberOfDeployments: result!!.number_of_deployments,
        numberOfUndeployments: result!!.number_of_undeployments,
        numberOfArchived: result!!.number_of_archived,
        numberOfBadges: result!!.number_of_badges,
        points: result!!.points,
        daysOld: result!!.days_old,
        titles: result!!.titles ?? [],
        clan: result!!.clan ?? {},
      };
      setPublicProfile(userInfo);
    } else {
      // not profile find navigate
    }
  };

  useEffect(() => {
    if (munzeeId) {
      const apiMunzee = async () => {
        var currentUrl: string = window.location.host + window.location.pathname;
        const result = await backend?.munzee.getMunzee({ url: currentUrl, username: id });
        if (result) {
          setMunzeeDetail(result);
          setMunzeeDetailApi(result);
        }
      }

      apiMunzee();
    }
  }, [user, id, munzeeId])

  useEffect(() => {
    if (munzeeRefresh == 1) {
      const apiMunzee = async () => {
        var currentUrl: string = window.location.host + window.location.pathname;
        const result = await backend?.munzee.getMunzee({ url: currentUrl, username: id });
        if (result) {
          setMunzeeDetail(result);
          setMunzeeDetailApi(result);
        }
        setMunzeeRefresh(0);
      }
      apiMunzee();
    }
  }, [munzeeRefresh])

  useEffect(() => {
    if (user != null && user != undefined && id != undefined) {
      setPublicProfile(null)
      apiPublicUser();
    }
  }, [user, id]);

  if (munzeeId) {

    return (
      <main id="homepage-loggedin">
        <div className="statistic-block">
          <div className="statistic-wrapper">
            <div className="personal-info1 munzee-header">
              <div className="col-lg-10 col-sm-8 col-xs-12 avatar">
                <img src={munzeeDetail?.original_pin_image ?? noAvatar} alt={munzeeDetail?.friendly_name} loading="lazy" />

                <div className="userinfo-with-icon">
                  <span className="munzee-name">
                    <Link to={`/m/${publicProfile?.username}/`}>
                      {munzeeDetail?.friendly_name}
                    </Link>
                    (id: {munzeeDetail?.munzee_id} capture type: {munzeeDetail?.capture_type_id})
                  </span>
                </div>
                {(munzeeDetail?.deployed == 1) ? (
                  <p className="status-date">Deployed <span className="deployed-at" data-deployed-at={munzeeDetail?.deployed_at} title={munzeeDetail?.deployed_at} ></span><br />
                  </p>
                ) :
                  (munzeeDetail?.archived == 1) ? (
                    <p className="status-date">Archived <span className="deployed-at" data-deployed-at={munzeeDetail?.archived_at} title={munzeeDetail?.archived_at || ''}></span></p>
                  ) :
                    (munzeeDetail?.undeployed_at) ? (
                      <p className="status-date">Archived <span className="deployed-at" data-deployed-at={munzeeDetail?.archived_at} title={munzeeDetail?.archived_at || ''}></span></p>
                    ) :
                      (
                        <Typography className="status-date" component="p" sx={{ fontStyle: 'italic', color: '#999' }}>Not deployed</Typography>
                      )}
              </div>

              <div className="clearfix hidden-lg"></div>
              {/* clain() */}
              <Box className="col-lg-2 col-sm-2 col-xs-12 deployed">
                <Link to={`/m/${publicProfile?.username}/`}>
                  <Typography component="p" align="center" fontSize={14}>Deployed by</Typography>
                  <img className="avatar-img" src={publicProfile?.avatar ?? noAvatar} alt="User avatar" loading="lazy" />
                  <Typography component="p" align="center" fontSize={14}>{publicProfile?.username}</Typography>
                </Link>
              </Box>

            </div>

            <div className="homepage-loggedin-tabs tabs-munzee-activity">{tabsMunzeeActivity()}</div>

          </div>
        </div>
        <MunzeeSubMenu />
        <div className="homepage-loggedin-content"></div>
      </main>
    );

  } else {
    return (
        <main id="homepage-loggedin">

          <div className="statistic-block">
            <div className="statistic-wrapper">
                <img src={publicProfile?.avatar ?? noAvatar} alt="User avatar" />
                <Box className="info-section">
                  <Box className="info-section-wrapper">
                    <Box className="user-details">
                      <Link to={`/m/${publicProfile?.username}/`} className="user-id">{publicProfile?.username}@</Link>
                      {isPremiumAccount ? (
                        <img src={starIcon} alt="Star Icon" />
                      ) : (
                        <Button onClick={handleBecomePremiumBtn}>
                          Become premium
                        </Button>
                      )}
                      {(publicProfile?.titles ?? []).map((item) => {
                        return <Button>{item}</Button>
                      })}
                    </Box>
                    {publicProfile?.clan != undefined ? <Box className="clan-details">
                      <Typography>
                        Clan
                        <Link to={publicProfile.clan.url}><span>{publicProfile.clan.name}</span></Link>
                      </Typography>
                      <Link to={publicProfile.clan.url}><img src={publicProfile.clan.logo} alt="Clan" /></Link>
                    </Box> : <></>}
                  </Box>
                  <Box className="statistic-tabs">
                    <Link to={`/player/points/${publicProfile?.username}`} className="tab">
                      <img src={tab1Icon} />
                      <span className="count">{numberFormat(publicProfile?.points ?? 0)}</span>
                      <span className="tab-name">Points</span>
                    </Link>
                    <Link to={`/m/${publicProfile?.username}/captures/`} className="tab">
                      <img src={tab2Icon} />
                      <span className="count">{numberFormat(publicProfile?.numberOfCaptures ?? 0)}</span>
                      <span className="tab-name">Captures</span>
                    </Link>
                    <Link to={`/m/${publicProfile?.username}/captures/`} className="tab">
                      <img src={tab3Icon} />
                      <span className="count">{numberFormat(publicProfile?.numberOfBadges ?? 0)}</span>
                      <span className="tab-name">Badges</span>
                    </Link>
                    <Link to={`/m/${publicProfile?.username}/deploys/`} className="tab">
                      <img src={tab4Icon} />
                      <span className="count">{numberFormat(publicProfile?.numberOfDeployments ?? 0)}</span>
                      <span className="tab-name">Deployed</span>
                    </Link>
                    <Link to="#" className="tab">
                      <img src={tab5Icon} />
                      <span className="count">{numberFormat(publicProfile?.daysOld ?? 0)}</span>
                      <span className="tab-name">Days Old</span>
                    </Link>
                  </Box>
                </Box>
            </div>
          </div>

          {/*<div className="statistic-block">*/}
          {/*  <div className="statistic-wrapper">*/}
          {/*    <div className="personal-info">*/}
          {/*      <div className="col-lg-6 col-xs-12 avatar">*/}
          {/*        <img src={publicProfile?.avatar ?? noAvatar} alt="User avatar" />*/}
          {/*        <span className="badge-success-count1">{publicProfile?.level}</span>*/}

          {/*        {(publicProfile?.rank ?? 0) > 0 && <Link to={`${APP_CONFIG.HOST_STATZEE}player/rankings/${publicProfile?.username}`} className="world-rank tooltip-holder"><span className="badge badge-success">{numberFormat(publicProfile?.rank ?? 0)}</span></Link>}*/}

          {/*        <div className="userinfo-with-icon">*/}
          {/*          <span className="user-name">*/}
          {/*            <Link to={`/m/${publicProfile?.username}/`}>*/}
          {/*              {publicProfile?.username}*/}
          {/*            </Link>*/}
          {/*            (id: {publicProfile?.userId})*/}
          {/*          </span>*/}

          {/*          {user != null && publicProfile != null && publicProfile?.userId != user?.userId && */}
          {/*          <div className="avatar-send-message">*/}
          {/*            <Link to={`/flows/?username=${publicProfile?.userId}`}><i className="fa fa-envelope-o"></i></Link>*/}
          {/*          </div>}*/}

          {/*          <span className="hidden-xs">*/}
          {/*          {(publicProfile?.titles ?? []).map((item) => {*/}
          {/*            return <span className="badge title-badge">{item}</span>                          */}
          {/*          })}*/}
          {/*          </span>*/}

          {/*          {isPremiumAccount ? (*/}
          {/*            <div className="premium tooltip-holder">*/}
          {/*              <i*/}
          {/*                data-toggle="tooltip"*/}
          {/*                data-placement="right"*/}
          {/*                data-original-title={publicProfile?.premiumExpires}*/}
          {/*                className="fa fa-star"*/}
          {/*              ></i>*/}
          {/*            </div>*/}
          {/*          ) : (*/}
          {/*            <Button onClick={handleBecomePremiumBtn}>*/}
          {/*              Become premium*/}
          {/*            </Button>*/}
          {/*          )}*/}

          {/*        </div>*/}
          {/*      </div>*/}

          {/*      <div className="clearfix hidden-lg"></div>*/}
          {/*      {clain()}*/}
          {/*    </div>*/}

          {/*    <div className="homepage-loggedin-tabs">{tabs()}</div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <SubMenu />
          <div className="homepage-loggedin-content"></div>
        </main>
      );
  }
};

export default HomePageLoggedIn;
