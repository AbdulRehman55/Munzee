import React, { useEffect, useState } from "react";
import "./styles.scss";
import UndeploysItem from "./UndeploysItem";
import { undeploysLocales as u } from "./undeploysLocales";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Pin } from '../../components/Map'
import { MapComponent, PageTitle } from "../../components";
import SearchTypes from "./SearchTypes";
import { mockData } from "./mockData";
import { archivedLocales as a } from "../ArchivedPage/archivedLocales";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { QrCode } from "@mui/icons-material";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import Backend, { UserInfo } from "../../munzee-backend";
import { LatestCaps, Munzee, MunzeeLog, MunzeeRooms } from "../../munzee-backend/types";
import SubTitle from "../../components/subtitle";
import MunzeeShare from "../../components/MunzeeShare";
import MunzeeSidebar from "../../components/MunzeeSidebar";
import { base_convert, nl2br, timeAgoFromDate, userAvatar } from "../../utils/functions/functions";
import { Flag } from "@mui/icons-material";
import { APP_CONFIG } from "../../config/config";
import moment from 'moment';

const CustomToolTip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

const MunzeeActivityPage = (): JSX.Element => {

    // const navigate = useNavigate();
    // const { id, munzeeId, code } = useParams();
    // if(code) {
    //     alert(code);
    //     navigate(`/m/${id}/${munzeeId}`);
    // }

    const { backend, user, publicProfile } = React.useContext(ClientContext);

    let isValidUser = (user != undefined && user != null && publicProfile != undefined && publicProfile != null);
    if (isValidUser) {
        isValidUser = user?.userId == publicProfile?.userId;// && user?.premium == 1;
    }

    if (isValidUser) {
        return <MunzeeActivityPageForValidUser backend={backend} user={user} />
    } else {
        return (
            <Container id="undelpoys-page">
            </Container>
        );
    }
}

const MunzeeActivityPageForValidUser = ({
    backend,
    user
}: { backend: Backend | null, user: UserInfo | null }): JSX.Element => {

    const { munzeeId } = useParams();
    const { munzeeDetailApi } = React.useContext(ClientContext);
    const [munzeeLog, setMunzeeLog] = React.useState<MunzeeLog[]>([])
    const [apiResponse, setApiResponse] = React.useState<any>()
    const [rooms, setRooms] = React.useState<MunzeeRooms[]>([])
    //const [latestCaps, setLatestCaps] = React.useState<LatestCaps[]>([])
    const [hops, setHops] = React.useState<any>(0);
    const [indicators, setIndicators] = React.useState<any[]>([]);
    const [mapView, setMapView] = useState<"street" | "satellite">("street");
    const [mapZoom, setMapZoom] = useState<number>(15);
    const [mapPins, setMapPins] = useState<Pin[]>([]);
    

    const sateliteView = () => {
        setMapView("satellite");
      };
    const streetView = () => {
        setMapView("street");
    };

    const apiMunzeeLogs = async () => {
        const munzee_id = munzeeDetailApi?.munzee_id != undefined ? munzeeDetailApi?.munzee_id?.toString() : '';
        const result = await backend?.munzee.logs({ username: user?.username ?? "", munzee_id: munzee_id }) // munzeeId ?? ""

        let array: MunzeeLog[] = [];
        if (result != undefined) {
            Object.values(result).forEach(log => {
                array.push(log);
            })
        }
        setMunzeeLog(array)
    }

    // useEffect(() => {
    //     apiMunzeeLogs();
    // }, []);

    const apiMunzeeRooms = async () => {
        const motel_id = munzeeDetailApi?.motel_id != undefined ? parseInt(munzeeDetailApi?.motel_id?.toString()) : 0;
        const result = await backend?.munzee.rooms({ motel_id: motel_id })
        if ( result ) {
            setRooms(Object.values(result));
        }
    }
    const apiMunzeeRoomsHotel = async () => {
        const hotel_id = munzeeDetailApi?.hotel_id != undefined ? parseInt(munzeeDetailApi?.hotel_id?.toString()) : 0;
        const result = await backend?.munzee.roomsHotel({ hotel_id: hotel_id })
        if ( result ) {
            setRooms(Object.values(result));
        }
    }
    const apiMunzeeRoomsTimeshare = async () => {
        const hotel_id = munzeeDetailApi?.hotel_id != undefined ? parseInt(munzeeDetailApi?.hotel_id?.toString()) : 0;
        const result = await backend?.munzee.roomsTimeshare({ hotel_id: hotel_id })
        if ( result ) {
            setRooms(Object.values(result));
        }
    }
    const apiMunzeeRoomsCondo = async () => {
        const hotel_id = munzeeDetailApi?.hotel_id != undefined ? parseInt(munzeeDetailApi?.hotel_id?.toString()) : 0;
        const result = await backend?.munzee.roomsCondo({ hotel_id: hotel_id })
        if ( result ) {
            setRooms(Object.values(result));
        }
    }
    const apiMunzeeRoomsResort = async () => {
        const motel_id = munzeeDetailApi?.motel_id != undefined ? parseInt(munzeeDetailApi?.motel_id?.toString()) : 0;
        const result = await backend?.munzee.roomsResort({ resort_id: motel_id })
        if ( result ) {
            setRooms(Object.values(result));
        }
    }
    const apiCapturesLatestMany = async () => {
        const result = await backend?.munzee.capturesLatestMany({ munzee_id: munzeeDetailApi?.munzee_id ?? 0 })
        if ( result ) {
            //setLatestCaps(Object.values(result));
            var mapPinsTmp: Pin[] = [];
            var latestCapsTmp = Object.values(result);
            latestCapsTmp.forEach((pinItem, itemKey) => {
                mapPinsTmp.push({
                    id: ('name' + (itemKey + 1)),
                    latitude: pinItem.latitude,
                    longitude: pinItem.longitude,
                    imageUrl: munzeeDetailApi?.pin_icon,
                    content: `
                    <div style="cursor: default; position: absolute; width: 67px; height: 41px; left: -19px; top: -58px; z-index: 7;">
                    <div style="position: absolute; left: 0px; top: 0px;">
                    <div style="width: 0px; height: 0px; border-right: 10px solid transparent; border-left: 10px solid transparent; border-top: 24px solid rgba(0, 0, 0, 0.1); position: absolute; left: 24px; top: 41px;">
                    </div>
                    <div style="position: absolute; left: 0px; top: 0px; background-color: rgba(0, 0, 0, 0.2); border-radius: 2px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; width: 67px; height: 41px;">
                    </div>
                    <div style="border-top-width: 24px; position: absolute; left: 24px; top: 38px;">
                    <div style="position: absolute; overflow: hidden; left: -6px; top: -1px; width: 16px; height: 30px;">
                    <div style="position: absolute; left: 6px; background-color: rgb(255, 255, 255); transform: skewX(22.6deg); transform-origin: 0px 0px 0px; height: 24px; width: 10px; box-shadow: rgba(0, 0, 0, 0.6) 0px 1px 6px;">
                    </div>
                    </div>
                    <div style="position: absolute; overflow: hidden; top: -1px; left: 10px; width: 16px; height: 30px;">
                    <div style="position: absolute; left: 0px; background-color: rgb(255, 255, 255); transform: skewX(-22.6deg); transform-origin: 10px 0px 0px; height: 24px; width: 10px; box-shadow: rgba(0, 0, 0, 0.6) 0px 1px 6px;">
                    </div>
                    </div>
                    </div>
                    <div style="position: absolute; left: 1px; top: 1px; border-radius: 2px; background-color: rgb(255, 255, 255); width: 65px; height: 39px;">
                    </div>
                    </div>
                    <div class="gm-style-iw" style="top: 9px; position: absolute; left: 30px; width: 37px;">
                    <div style="display: inline-block; overflow: auto; max-height: 654px; max-width: 654px;">
                    <div style="overflow: auto;"> ${ latestCapsTmp.length - itemKey } </div>
                    </div>
                    
                    </div></div>
                `,
                })
            })

            setMapPins(mapPinsTmp);

            const captures = await backend?.munzee.munzeeIndicator({ munzee_id: munzeeDetailApi?.munzee_id ?? 0 })
            if ( captures ){
                setIndicators(Object.values(captures));
            }
        }
    }

    useEffect(() => {

        console.log('munzeeDetailApi', munzeeDetailApi);
        console.log('user', user);
        apiMunzeeLogs();

        const capture_type_id = munzeeDetailApi?.capture_type_id != undefined ? parseInt(munzeeDetailApi?.capture_type_id?.toString()) : 0;        

        if ( [70,2356,2358].includes(capture_type_id) ){
            apiMunzeeRooms();
        }
        if ( [170,3341,3343].includes(capture_type_id) ){
            apiMunzeeRoomsHotel();
        }
        if ( capture_type_id == 970 ){
            apiMunzeeRoomsTimeshare();
        }
        if ( capture_type_id == 2183 ){
            apiMunzeeRoomsCondo();
        }
        if ( [470,2937,2939].includes(capture_type_id) ){
            apiMunzeeRoomsResort();
        }
        if ( ( munzeeDetailApi?.bouncing_munzee != undefined && munzeeDetailApi?.bouncing_munzee == 1) || [505, 508, 573, 725, 853, 953, 1100, 1118, 1151, 1164, 1168, 1210, 1229, 1237, 1240, 1268, 1329, 1370, 1378, 1485].includes(capture_type_id) ){
            apiCapturesLatestMany();
        }

    }, [user, munzeeDetailApi])

    const captureTypeId = munzeeDetailApi?.capture_type_id != undefined ? parseInt(munzeeDetailApi?.capture_type_id?.toString()) : 0;
    const isDisplayMotelRooms = munzeeDetailApi != undefined && [70,2356,2358].includes(captureTypeId);
    const isDisplayHotelRooms = munzeeDetailApi != undefined && [170,3341,3343].includes(captureTypeId);
    const isDisplayTimeShareRooms = munzeeDetailApi != undefined && munzeeDetailApi?.capture_type_id == 970;
    const isDisplayVacationCondoRooms = munzeeDetailApi != undefined && munzeeDetailApi?.capture_type_id == 2183;
    const isDisplayResortRooms = munzeeDetailApi != undefined && [470,2937,2939].includes(captureTypeId);
    const isDisplaySocialImage = munzeeDetailApi != undefined && [32].includes(captureTypeId);
    const isDisplayUniversalImage = munzeeDetailApi != undefined && [2588,3092,3789].includes(captureTypeId);
    const isDisplayMunzeeTrail = munzeeDetailApi != undefined && ([190,390,600,1115].includes(captureTypeId) && munzeeDetailApi?.archived == 0);
    const isDisplayLatestCapture = munzeeDetailApi != undefined && munzeeDetailApi?.bouncing_munzee == 1 && user?.userId && mapPins.length > 0;
    // const isDisplayMunzeeTrail = true;
    // const isDisplayLatestCapture = true;

    const isDisplayUnicornMunzee = munzeeDetailApi?.unicorn_munzee != undefined;
    const isDisplayBouncers = munzeeDetailApi?.bouncers != undefined;

    const isDisplaySocialNotes = munzeeDetailApi != undefined && [32].includes(captureTypeId);
    const isDisplayUniversalNotes = munzeeDetailApi != undefined && [2588, 3092, 3789].includes(captureTypeId);



    return (
        <Container id="munzeeactivity-page">
            <Grid container spacing={2} pt={5}>
                <Grid item md={9} xs={9} pt={0}>

                    { apiResponse && apiResponse?.success == 0 &&
                        <div className="alert alert-danger">{ apiResponse?.message }</div>
                    }
                    { apiResponse && apiResponse?.success == 1 &&
                        <div className="alert alert-success">{ apiResponse?.message }</div>
                    }

                    { isDisplayMotelRooms &&
                        <>
                            <PageTitle title={<>Motel Rooms<small id="motel-rooms"> <i>
                              { (rooms.length < (munzeeDetailApi?.motel_max_rooms || 0) + 1) ? (
                                <>
                                { (munzeeDetailApi?.motel_max_rooms || 0) + 1 - rooms.length } vacant rooms
                                </>
                              ): (
                                <>no vacancy</>
                              )}
                            </i></small></>} />

                            <div id="room-holder">
                            { rooms.length > 0 ? ( 
                                rooms.map((room : any) => {
                                    if( room?.motel_room && parseInt(room?.motel_room) > 0 ){
                                        return(
                                            <section>
                                                <Link to={`/m/${ room?.creator_username }/`}>
                                                    <img className="user-photo lazy" data-src={userAvatar(parseInt(room?.user_id))} loading="lazy" />
                                                </Link>
                                                <div className="stat">
                                                    <div className="number">
                                                    { room?.current_room_points }
                                                    </div>
                                                    <div className="desc">room<br/>point{ room?.current_room_points != 1 && <>s</> }</div>
                                                </div>
                                                <p>
                                                    <Link to={`/m/${ room?.creator_username }/`}>
                                                        <i className='fa fa-suitcase'></i>
                                                    </Link>
                                                    <span className="motel-room">Room #{ room.motel_room } by <Link to={`/m/${ room?.creator_username }/`}>{ room?.creator_username }</Link></span>
                                                </p>
                                            </section>
                                        )
                                    }
                                })
                            ) : (
                                <div className="alert alert-success">All rooms vacant. Go get one!</div>
                            )}
                            </div>
                        </>
                    }

                    { isDisplayHotelRooms &&
                        <>
                            <PageTitle title={<>Hotel Rooms<small id="motel-rooms"> <i>
                              { (rooms.length < (munzeeDetailApi?.motel_max_rooms || 0) + 1) ? (
                                <>
                                { (munzeeDetailApi?.motel_max_rooms || 0) + 1 - rooms.length } vacant rooms
                                </>
                              ): (
                                <>no vacancy</>
                              )}
                            </i></small></>} />
                            
                            <div id="room-holder">
                            { rooms.length > 0 ? ( 
                                rooms.map((room : any) => {
                                    if( room?.hotel_room && parseInt(room?.hotel_room) > 0 ){
                                        return(
                                            <section>
                                                <Link to={`/m/${ room?.creator_username }/`}>
                                                    <img className="user-photo lazy" data-src={userAvatar(parseInt(room?.user_id))} loading="lazy" />
                                                </Link>
                                                <div className="stat">
                                                    <div className="number">
                                                    { room?.current_room_points }
                                                    </div>
                                                    <div className="desc">room<br/>point{ room?.current_room_points != 1 && <>s</> }</div>
                                                </div>
                                                <p>
                                                    <Link to={`/m/${ room?.creator_username }/`}>
                                                        <i className='fa fa-suitcase'></i>
                                                    </Link>
                                                    <span className="motel-room">Room #{ room.hotel_room } by <Link to={`/m/${ room?.creator_username }/`}>{ room?.creator_username }</Link></span>
                                                </p>
                                            </section>
                                        )
                                    }
                                })
                            ) : (
                                <div className="alert alert-success">All rooms vacant. Go get one!</div>
                            )}
                            </div>
                      </>
                    }

                    { isDisplayTimeShareRooms && <>
                        <PageTitle title={<>Time Share Rooms<small id="motel-rooms"> <i>
                              { ( rooms.length < 6 ) ? (
                                <>
                                    { (6 - rooms.length) } vacant rooms
                                </>
                              ): (
                                <>no vacancy</>
                              )}
                            </i></small></>} />

                        <div id="room-holder">
                            { rooms.length > 0 ? ( 
                                rooms.map((room : any) => {
                                    if( room?.hotel_room && parseInt(room?.hotel_room) > 0 ){
                                        return(
                                            <section>
                                                <Link to={`/m/${ room?.creator_username }/`}>
                                                    <img className="user-photo lazy" data-src={userAvatar(parseInt(room?.user_id))} loading="lazy" />
                                                </Link>
                                                <div className="stat">
                                                    <div className="number">
                                                    { room?.current_room_points }
                                                    </div>
                                                    <div className="desc">room<br/>point{ room?.current_room_points != 1 && <>s</> }</div>
                                                </div>
                                                <p>
                                                    <Link to={`/m/${ room?.creator_username }/`}>
                                                        <i className='fa fa-suitcase'></i>
                                                    </Link>
                                                    <span className="motel-room">Room #{ room?.hotel_room } by <Link to={`/m/${ room?.creator_username }/`}>{ room?.creator_username }</Link> expires <span className="expires-at" data-expires-at={ room?.expires_at * 1000 } title={ moment(room?.expires_at).format() }></span></span>
                                                </p>
                                            </section>
                                        )
                                    }
                                })
                            ) : (
                                <div className="alert alert-success">All rooms vacant. Go get one!</div>
                            )}
                        </div>
                        </>
                    }

                    { isDisplayVacationCondoRooms && <>
                        <PageTitle title={<>Vacation Condo Rooms<small id="motel-rooms"> <i>
                              { ( rooms.length < 6 ) ? (
                                <>
                                    { (6 - rooms.length) } vacant rooms
                                </>
                              ): (
                                <>no vacancy</>
                              )}
                            </i></small></>} />
                        
                        <div id="room-holder">

                        { rooms.length > 0 ? ( 
                            rooms.map((room : any) => {
                                if( room?.hotel_room && parseInt(room?.hotel_room) > 0 ){
                                    return(
                                        <section>
                                            <Link to={`/m/${ room?.creator_username }/`}>
                                                <img className="user-photo lazy" data-src={userAvatar(parseInt(room?.user_id))} loading="lazy" />
                                            </Link>
                                            <div className="stat">
                                                <div className="number">
                                                { room?.current_room_points }
                                                </div>
                                                <div className="desc">room<br/>point{ room?.current_room_points != 1 && <>s</> }</div>
                                            </div>
                                            <p>
                                                <Link to={`/m/${ room?.creator_username }/`}>
                                                    <i className='fa fa-suitcase'></i>
                                                </Link>
                                                <span className="motel-room">Room #{ room?.hotel_room } by <Link to={`/m/${ room?.creator_username }/`}>{ room?.creator_username }</Link> expires <span className="expires-at" data-expires-at={ room?.expires_at * 1000 } title={ moment(room?.expires_at).format() }></span></span>
                                            </p>
                                        </section>
                                    )
                                }
                            })
                        ) : (
                            <div className="alert alert-success">All rooms vacant. Go get one!</div>
                        )}
                        </div>
                    </>
                    }

                    { isDisplayResortRooms && <>
                        <PageTitle title={<>Resort Rooms<small id="motel-rooms"> <i>
                              { ( rooms.length < ((munzeeDetailApi?.motel_max_rooms || 0) + 1) ) ? (
                                <>
                                    { (munzeeDetailApi?.motel_max_rooms || 0) + 1 - rooms.length } vacant rooms
                                </>
                              ): (
                                <>no vacancy</>
                              )}
                            </i></small></>} />
                        
                        <div id="room-holder">
                            { rooms.length > 0 ? ( 
                                rooms.map((room : any) => {
                                    if( room?.resort_room && parseInt(room?.resort_room) > 0 ){
                                        return(
                                            <section>
                                                <Link to={`/m/${ room?.creator_username }/`}>
                                                    <img className="user-photo lazy" src={userAvatar(parseInt(room?.user_id))} loading="lazy" />
                                                </Link>
                                                <div className="stat">
                                                    <div className="number">
                                                    { room?.current_room_points }
                                                    </div>
                                                    <div className="desc">room<br/>point{ room?.current_room_points != 1 && <>s</> }</div>
                                                </div>
                                                <p>
                                                    <Link to={`/m/${ room?.creator_username }/`}>
                                                        <i className='fa fa-suitcase'></i>
                                                    </Link>
                                                    <span className="motel-room">Room #{ room?.resort_room } by <Link to={`/m/${ room?.creator_username }/`}>{ room?.creator_username }</Link></span>
                                                </p>
                                            </section>
                                        )
                                    }
                                })
                            ):(
                                <div className="alert alert-success">All rooms vacant. Go get one!</div>
                            )}
                        </div>
                    </>
                    }

                    { isDisplaySocialImage && <>
                        <PageTitle title={'Social Image'} />
                        <Box id="room-holder" textAlign={"center"} className="text-center">
                            <img 
                                src={`${APP_CONFIG.IMAGE_BASE_URL}social_munzees/${base_convert((munzeeDetailApi?.munzee_id || 0), 10, 36)}.png`} 
                                onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    event.currentTarget.src = APP_CONFIG.IMAGE_BASE_URL + 'pins/social.png';
                                    // event.currentTarget.width = 300;
                                    //event.currentTarget.className = "error";
                                  }
                                } loading="lazy" />
                        </Box>
                    </>
                    }

                    { isDisplayUniversalImage && <>
                        <PageTitle title={'Universal Image'} />
                        <Box id="room-holder" textAlign={"center"} className="text-center">
                            { ( [2588].includes(captureTypeId) ) ? (
                                <img src={`${APP_CONFIG.IMAGE_BASE_URL}pins/universal_bash.png`} loading="lazy" />
                            ) : 
                            ( [3092].includes(captureTypeId) ) ?  (
                                <img src={`${APP_CONFIG.IMAGE_BASE_URL}pins/universal_10th_birthday.png`} loading="lazy" />
                            ) :
                            ( [3789].includes(captureTypeId) ) ?  (
                                <img src={`${APP_CONFIG.IMAGE_BASE_URL}pins/universal_wonder11and.png`} loading="lazy" />
                            ) :
                            ('')
                            }
                        </Box>
                        </>
                    }

                    { isDisplayMunzeeTrail && <>

                        <PageTitle title={'Munzee Trail'} />
                        <Box>
                            <p><i>
                                This Munzee is part of a Munzee Trail!
                                { munzeeDetailApi?.creator_user_id != user?.userId ? (
                                    <>
                                    { (captureTypeId == 190) ? (
                                        <>
                                        { munzeeDetailApi?.trail != undefined && munzeeDetailApi?.trail.length == 5 && ! munzeeDetailApi?.trail_unfinished ? (
                                            <>
                                            { (hops == 1) ? (
                                                <>Start your adventure at Stage 1.</>
                                            ):
                                            ( hops == 5 && munzeeDetailApi?.trail[4].has_user_captured_munzee == 1 ) ? (
                                                <>Congratulations, you've captured the whole trail with a length of <span id="totall"></span>!</>
                                            ): (
                                                <>Continue your adventure at Stage { hops }.</>
                                            )}
                                            </>
                                        ) : (
                                            <b>This trail isn't finished yet. Please come back later.</b>
                                        )}
                                        </>
                                    ) : 
                                    ( captureTypeId == 390 || captureTypeId == 600 || captureTypeId == 1115) ? (
                                        <>
                                        { munzeeDetailApi?.trail && munzeeDetailApi?.trail.length >= 5 && ! munzeeDetailApi?.trail_unfinished ? (<>
                                            { hops == 1 && <>
                                                Start your adventure at Stage 1.
                                            </>}
                                            </>
                                        ): (
                                            <b>This trail isn't finished yet. Please come back later.</b>
                                        )}
                                        </>
                                    ):('')}
                                    </>
                                ) : (
                                    <>
                                    { munzeeDetailApi?.trail != undefined && munzeeDetailApi?.trail.length < 5 || munzeeDetailApi?.trail_unfinished ? (
                                        <>
                                        <br/><b>The trail isn't finished yet. Please finish your trail to make it show up for others to cap.</b>
                                        </>
                                    ): (    
                                        <>
                                        Your trail has a total length of <span id="totall"></span>.
                                        </>
                                    )}
                                    </>
                                )}
                            </i></p>
                            <div id="map" style={{"height":"200px","marginBottom":"20px","marginTop":"15px"}}>
                                {/* <!-- <div id="map-box-bounceHistory-zoom-div"  className="mapboxgl-ctrl mapboxgl-ctrl-group">
                                    <button className="mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in" type="button" aria-label="Zoom In" id='map-box-editLocation-zoom-in'></button>
                                    <button className="mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out" type="button" aria-label="Zoom Out" id='map-box-editLocation-zoom-out'></button>
                                </div> -->*/}
                                <div id="map-box-satellite-position-bounceHistory">
                                    <input type="submit" id="satelliteView" className=" map-box-view-type btn-medium-green btn-xs hidden-xs" data-renderType='street' value="satellite" />
                                    <input type="submit" id="streetView" className=" map-box-view-type mapboxgl-ctrl-icon mapboxgl-ctrl-icon btn  btn-medium-green btn-xs hidden-xs" data-renderType='street' value="street" />
                                </div>
                            </div>
                            <Box style={{ position: "relative" }}>
                                <MapComponent
                                    pos={{
                                        latitude: 0,
                                        longitude: 0,
                                    }}
                                    zoom={mapZoom}
                                    view={mapView}
                                    pins={[]}
                                    onMapBounds={(bounds) => {}}
                                />
                                <button onClick={sateliteView} className={`map-view-btn satelite-btn ${
                                        mapView == "satellite" ? "active" : ""
                                    }`}
                                    >
                                    satelite
                                    </button>
                                <button onClick={streetView} className={`map-view-btn street-btn ${
                                        mapView == "street" ? "active" : ""
                                    }`}
                                    >
                                    street
                                    </button>
                            </Box>
                        </Box>
                    </>
                    }

                    { isDisplayLatestCapture && <>
                        <PageTitle title={"Latest Captures"} />

                        <div id="ajax-indicator" className="hidden-xs">
                            <div className="col-md-12 hidden-xs">
                                <table className="indicator-box" style={{"width":"100%"}}>
                                    <tr>
                                    
                                    { indicators.map((indicate : any) => {
                                        let indicate_class = '';
                                        if ( indicate.captures != undefined && indicate.deploys != undefined && indicate.deploys != 0 && indicate.captures != 0 ){
                                            indicate_class = 'deploy-capture';
                                        }else if ( indicate.captures != undefined && indicate.captures != 0 ){
                                            indicate_class = 'capture-only';
                                        }else if ( indicate.deploys != undefined && indicate.deploys != 0 ){
                                            indicate_class = 'deploy-only';
                                        }
                                        return(
                                            <td>
                                                <CustomToolTip title={`${ indicate.day } |
                                ${ indicate.captures }x`} placement={'top'} arrow>
                                            <div data-toggle="tooltip" data-original-title={`${ indicate.day } |
                                ${ indicate.captures }x`} className={`indicator ${ indicate_class }`}></div>
                                                </CustomToolTip>
                                        </td>
                                        )
                                        }
                                    )}
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className="clearfix"></div><hr/>
                        <Box>
                            {/*<div id="map" style={{"height":"250px","marginBottom":"20px"}}>
                                <div id="map-box-satellite-position-bounceHistory">
                                    <input type="submit" id="satelliteView" className=" map-box-view-type btn-medium-green btn-xs hidden-xs" data-renderType='street' value="satellite" />
                                    <input type="submit" id="streetView" className=" map-box-view-type mapboxgl-ctrl-icon mapboxgl-ctrl-icon btn  btn-medium-green btn-xs hidden-xs" data-renderType='street' value="street" />
                                </div>
                            </div>*/ }
                            <Box className={'map-container'} style={{ position: "relative" }}>
                                <MapComponent
                                    pos={{
                                        latitude: 0,
                                        longitude: 0,
                                    }}
                                    zoom={mapZoom}
                                    view={mapView}
                                    pins={mapPins}
                                    onMapBounds={(bounds) => {}}
                                    fullscreenOff={true}
                                    geolocationOff={true}
                                    style={{'minHeight':'250px'}}
                                />
                                <button onClick={sateliteView} className={`map-view-btn satelite-btn ${
                                        mapView == "satellite" ? "active" : ""
                                    }`}
                                    >
                                    satelite
                                    </button>
                                <button onClick={streetView} className={`map-view-btn street-btn ${
                                        mapView == "street" ? "active" : ""
                                    }`}
                                    >
                                    street
                                    </button>
                            </Box>
                        </Box>
                    </>
                    }
                    

                    {isDisplayUnicornMunzee && <div>
                        <div className="unicorn">This Munzee is currently hosting <Link to={`${munzeeDetailApi!!.unicorn_munzee?.code}`}>{munzeeDetailApi!!.unicorn_munzee?.friendly_name}</Link>! <img className="pull-right" src={`${APP_CONFIG.IMAGE_BASE_URL}pins/${munzeeDetailApi?.mythological_type == "unicorn" ? 'theunicorn' : munzeeDetailApi?.mythological_type}.png`} /></div>
                    </div>}

                    {isDisplayBouncers && <>
                        { munzeeDetailApi?.bouncers.map((bouncer) => (
                            <div className="unicorn"><img style={{"height":"32px"}} src={`${APP_CONFIG.IMAGE_BASE_URL}images/pins/${ bouncer.mythological_type == 'unicorn' ? 'theunicorn' : bouncer.mythological_type}.png`} /> This Munzee is currently hosting <a href={ bouncer?.unicorn_munzee?.code }>{ bouncer?.unicorn_munzee?.friendly_name }</a>!</div>
                        ))}
                    </>}

                    {isDisplaySocialNotes ? <>
                        <PageTitle title={"Social Notes"} />
                        <Typography fontSize={14}>{nl2br(munzeeDetailApi.notes ?? "")}</Typography>
                    </> : isDisplayUniversalNotes ? <>
                        <PageTitle title={"Universal Notes"} />
                        <Typography fontSize={14}>{nl2br(munzeeDetailApi.notes ?? "")}</Typography>
                    </> : <>
                        <PageTitle title={"Munzee Activity"} />
                        <div id="munzee-holder">
                            {munzeeLog.map((log) => {
                                if (log.type == "capture") {
                                    return <section className="munzee-activity-holder">
                                        <Link to={`/m/${log.username}`}>
                                            <img className="user-photo square-64 lazy" src={userAvatar(parseInt(log.user_id ?? ""))} />
                                        </Link>
                                        <div className="stat">
                                            <div className="number">{log.points}</div>
                                            <div className="desc">point{log.points != 1 ? 's' : ''}</div>
                                        </div>
                                        <p>
                                            <Link to={`${munzeeDetailApi?.url}captures/`}><Flag fontSize="inherit" /></Link>
                                            <Link to={`/m/${log.username}`}>{log.username}</Link>
                                            <span className="captured-at"> {timeAgoFromDate(log.entry_at)}</span>
                                        </p>
                                    </section>
                                } else {
                                    return <section className="munzee-entry-holder">
                                        <Link to={`/m/${log.username}`}><img src={userAvatar(parseInt(log.user_id ?? ""))} alt="Logo" /></Link>
                                        <p className="entry">
                                            {log.notes != "" ? `"${log.notes}" - ` : ''}{log.type_name}
                                            <br /> - <Link to={`/m/${log.username}`}>{log.username}</Link>
                                        </p>
                                        <span className="wrote-at">{timeAgoFromDate(log.entry_at)}</span>
                                    </section>
                                }
                            })}
                        </div>
                    </>}

                </Grid>
                <Grid item md={3} xs={3} pt={0}>
                    {munzeeDetailApi && <MunzeeSidebar screenType={'munzee_activity'} munzeeDetail={munzeeDetailApi} callbackApiResponse={(response) => {
                        setApiResponse(response)
                    }} />}
                </Grid>
            </Grid>
        </Container>
    )
}

export default MunzeeActivityPage;