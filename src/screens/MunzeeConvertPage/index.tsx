import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import { PageTitle } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import Backend, { UserInfo } from "../../munzee-backend";
import { Munzee } from "../../munzee-backend/types";
import MunzeeSidebar from "../../components/MunzeeSidebar";
import { APP_CONFIG } from "../../config/config";

const MunzeeConvertPage = (): JSX.Element => {
    const { backend, user, publicProfile, setMunzeeRefresh } = React.useContext(ClientContext);

    let isValidUser = (user != undefined && user != null && publicProfile != undefined && publicProfile != null);
    if (isValidUser) {
        isValidUser = user?.userId == publicProfile?.userId && user?.premium == 1;
    }

    if (isValidUser) {

        return <MunzeeConvertPageForValidUser backend={backend} user={user} setMunzeeRefresh={setMunzeeRefresh} />
    } else {
        return (
            <Container id="undelpoys-page">
            </Container>
        );
    }
}

const MunzeeConvertPageForValidUser = ({
    backend,
    user,
    setMunzeeRefresh
}: { backend: Backend | null, user: UserInfo | null, setMunzeeRefresh: any }): JSX.Element => {
    const navigate = useNavigate();
    const { munzeeId } = useParams()
    const [isFetching, setIsFetching] = useState(false);
    const [munzeeDetail, setMunzeeDetail] = useState<Munzee>()
    const [munzeeConvert, setMunzeeConvert] = useState<any>({})
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const [apiResp, setApiResp] = useState<any>()
    const [apiQuiz, setApiQuiz] = useState<any>()
    const [apiTrailOpen, setApiTrailOpen] = useState<any>()
    

    const apiFetchMunzeeDetail = async () => {
        if (isFetching) { return; }
        setIsFetching(true);
        const currentUrl = window.location.host + window.location.pathname;
        const username = user?.username;
        const munzee = await backend?.munzee.getMunzee({ url: currentUrl, 'username': username });
        if (munzee) {

            if (munzee?.url && munzee?.creator_user_id != user?.userId && user?.maintenanceTeam != 1 ){
                navigate(munzee?.url);
            }

            setMunzeeDetail(munzee);

            if ( munzee ){
                const convert = await backend?.munzee.convertMunzee({ munzee_id: munzee?.munzee_id || 0, username: user?.username || '' });
                if (convert) {
                    if ( convert.length == undefined ){
                        setMunzeeConvert(convert);
                        setIsLoaded(true);
                    }else{
                        setIsLoaded(true);
                    }
                }

                if ( munzee.capture_type_id == 0 && munzee.number_of_captures == 0 )
                {
                    const convert = await backend?.munzee.trailOpenMunzee({});
                    if (convert) {
                        console.log('trailOpenMunzee', convert);
                        setApiTrailOpen(convert);
                    }                    
                }
                else if ( ( munzee.capture_type_id == 1409 ) && munzee.number_of_captures == 0 )
                {
                    var $type = 0;
                    if ( user?.userTypeId != 5 )
                        $type = 2;
                    else
                        $type = 3;

                    const convert = await backend?.munzee.trailOpenMunzee({ type: $type });
                    if (convert) {
                        console.log('trailOpenMunzee', convert);
                        setApiTrailOpen(convert);

                        var open_trail = { ...convert };

                        if ( open_trail?.trail ){
                            if ( open_trail?.trail[0] ){

                                open_trail['distance_to_trailhead'] = latLongDistance(munzee?.latitude, munzee?.longitude, convert?.trail[0]['latitude'], convert?.trail[0]['longitude']);

                                open_trail['distance_to_trailhead_miles'] = open_trail['distance_to_trailhead'] / 5280;
                            }
                        }                        
                    }                    
                }

            }
        }
        setIsFetching(false);
    }

    const latLongDistance = ( $lat1 : any, $lon1 : any, $lat2 : any, $lon2 : any ) => {
        var $theta = $lon1 - $lon2;
        var $dist = Math.sin(deg2rad($lat1)) * Math.sin(deg2rad($lat2)) +  Math.cos(deg2rad($lat1)) * Math.cos(deg2rad($lat2)) * Math.cos(deg2rad($theta));
        $dist = Math.acos($dist);
        $dist = rad2deg($dist);
        var $distance = $dist * 364795.2;        
        return Math.max( parseInt($distance.toString()), 0 );
    }
    const deg2rad = (degrees :any) => {
        var pi = Math.PI;
        return degrees * (pi/180);
    }
    const rad2deg = (radians :any) => {
        var pi = Math.PI;
        return radians * (180/pi);
    }

    useEffect(() => {
        apiFetchMunzeeDetail();
    }, []);

    const munzeeConvertByType = async (pinType: string) => {
        console.log('pinType', pinType);
        const convert = await backend?.munzee.convertMunzee({ munzee_id: munzeeDetail?.munzee_id || 0, username: user?.username || '', type: pinType });
        if (convert) {
            console.log('munzeeConvertByType', convert);
            setApiResp(convert);
            if ( convert?.success ){
                setMunzeeConvert({});
            }
        }
    }

    const trailOpenMunzee = async (type:string) => {
        
    }

    const handleConvertAction = (type: any) => {
        if( window.confirm(`Are you sure you want to convert this munzee into a ${(type.replace('_',' ')).toUpperCase()} munzee?`) ){
            munzeeConvertByType(type);
        }else{

        }
    }

    return (
        <Container id="munzee-convert-page">
            <Grid container spacing={2} pt={5}>
                <Grid item md={9} xs={9} pt={0}>
                    <PageTitle title={"Convert Your Munzee"} />

                    { apiResp?.success && apiResp?.success?.message &&
                        <div className="alert alert-success">{ apiResp?.success?.message }</div>
                    }

                    { apiResp?.error &&
                        <div className="alert alert-danger">{ apiResp?.error?.message }</div>
                    }
                    
                    {  apiQuiz?.error &&
                        <div className="alert alert-danger">{ apiQuiz?.error }</div>
                    }
                    
                    { Object.keys(munzeeConvert).length > 0 &&
                        <Grid container spacing={2} pt={5}>
                        { Object.keys(munzeeConvert).map((itemVal, itemKey) => {
                            const pinCount = munzeeConvert[itemVal];
                            const pinGridClass = pinCount == 0 ? 'gray': '';
                            const pinText = itemVal.replace('_', ' ');

                            return(
                                <Grid className={`pin-grid ${pinGridClass}`} textAlign={'center'} item lg={1} md={1} sm={1} xs={6} pt={1} pl={1} m={0}>
                                    <Tooltip classes={{
                                        popper:"pin-popper",
                                        tooltip:"pin-tooltip",
                                    }} title={pinText} placement={'top'} arrow>
                                        <img className="pin-image" key={itemKey} src={APP_CONFIG.IMAGE_BASE_URL + `pins/${itemVal}.png`} alt={itemVal} loading="lazy" />
                                    </Tooltip>
                                    {( pinCount > 0 ) ? (
                                        <Typography onClick={() => handleConvertAction(itemVal)} className={`convert-count active`}>{ pinCount }</Typography>
                                    ): (
                                        <Typography className={`convert-count`}>{ pinCount }</Typography>
                                    )}                                
                                </Grid>
                            )}
                        )}
                        </Grid>
                    }

                    <Box textAlign={'center'}>
                        <Typography component={'h3'} className="credit-title">Don't have the credits you need?</Typography>
                        <Button target="_new" href="https://store.freezetag.com/collections/munzee/credit?" variant="contained" className="update-btn">Restock</Button>
                    </Box>

                    {(isLoaded) && <>
                    { ( Object.keys(munzeeConvert).length ==  0 ) ? (
                        <Typography component={'div'} className="no-options">This munzee can not be converted to anything.</Typography>
                    ):(
                        <>
                        { 
                            (munzeeDetail?.capture_type_id == 0 && apiTrailOpen?.hops > 0) ? (
                                <div className="col-xs-12"><br/><br/><i>You have an unfinished trail with next stage being { apiTrailOpen?.hops + 1 }/5. Trailhead is <a href={ apiTrailOpen?.trail[0].code }>{ apiTrailOpen?.trail[0].friendly_name }</a>.</i></div>
                            ) :                                
                            ( ( munzeeDetail?.capture_type_id == 1409 ) && apiTrailOpen?.hops > 0 ) ? (
                                <div className="col-xs-12"><br/><br/><i>You have an unfinished virtual trail with next stage being #{ apiTrailOpen?.hops + 1 }. Trailhead is <a href={ apiTrailOpen.trail[0].code }>{ apiTrailOpen?.trail[0].friendly_name }</a>
                                { munzeeDetail?.deployed == 1 && <>
                                    and is { apiTrailOpen?.distance_to_trailhead > 5280 ? (parseFloat(apiTrailOpen.distance_to_trailhead_miles.toString()).toFixed(1) ) + " miles" : parseInt(apiTrailOpen.distance_to_trailhead.toString()) + " ft" } away
                                </>
                                }
                                <br/>
                                { apiTrailOpen.hops >= 5 && <>
                                    You can also <a href={ apiTrailOpen.trail[0].code + 'admin/' }>close</a> the unfinished trail to start a new one.
                                </>
                                }
                                </i>
                                </div>
                            ): 
                            ('')
                        }
                        </>
                    )}
                    </>
                    }
                    
                </Grid>
                <Grid item md={3} xs={3} pt={0}>
                    { munzeeDetail && <MunzeeSidebar screenType={'munzee_convert'} munzeeDetail={munzeeDetail} />}
                </Grid>
            </Grid>
        </Container>
    )
}

export default MunzeeConvertPage;