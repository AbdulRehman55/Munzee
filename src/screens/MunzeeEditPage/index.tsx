import React, { useEffect, useState } from "react";
import "./styles.scss";
import UndeploysItem from "./UndeploysItem";
import { undeploysLocales as u } from "./undeploysLocales";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { PageTitle } from "../../components";
import SearchTypes from "./SearchTypes";
import { mockData } from "./mockData";
import { archivedLocales as a } from "../ArchivedPage/archivedLocales";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { QrCode } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import Backend, { UserInfo } from "../../munzee-backend";
import { Munzee } from "../../munzee-backend/types";
import SubTitle from "../../components/subtitle";
import MunzeeSidebar from "../../components/MunzeeSidebar";

const MunzeeEditPage = (): JSX.Element => {

    const { backend, user, publicProfile, setMunzeeRefresh } = React.useContext(ClientContext);

    let isValidUser = (user != undefined && user != null && publicProfile != undefined && publicProfile != null);
    if (isValidUser) {
        isValidUser = user?.userId == publicProfile?.userId && user?.premium == 1;
    }

    if (isValidUser) {

        return <MunzeeEditPageForValidUser backend={backend} user={user} setMunzeeRefresh={setMunzeeRefresh} />
    } else {
        return (
            <Container id="undelpoys-page">
            </Container>
        );
    }
}

const MunzeeEditPageForValidUser = ({
    backend,
    user,
    setMunzeeRefresh
}: { backend: Backend | null, user: UserInfo | null, setMunzeeRefresh: any }): JSX.Element => {
    const navigate = useNavigate();
    const { munzeeId } = useParams()
    const [isFetching, setIsFetching] = useState(false);
    const [munzeeDetail, setMunzeeDetail] = useState<Munzee>()
    const [friendlyName, setFriendlyName] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [apiResp, setApiResp] = useState<any>();
    const [isMassChange, setIsMassChange] = useState(false);

    const isEventUser = user?.userTypeId == 5;


    const captureId = munzeeDetail?.capture_type_id != undefined ? parseInt((munzeeDetail?.capture_type_id).toString()) : undefined;
    const isDisplayReplaceMissingMunzee = captureId != undefined && (![148, 251, 71, 171, 971].includes(captureId) && munzeeDetail?.is_virtual == 0);
    const isDisplaySwapOutVirtualMunzee = captureId != undefined && (![470, 471, 32, 60, 148, 200, 251, 294, 390, 862, 1107, 1115, 2183, 2184, 2588].includes(captureId) && (1 == 1 /* Check in virtual type */));
    const isDisplayRenovateMunzee = captureId != undefined && munzeeDetail?.deployed == 1 && (1 == 1 /* Check in destination_types */);
    
    const isDisplaySwapOutMunzee = ( ['dafi87', 'coachV', 'dderryberry60'].includes(user?.username ?? "") && munzeeDetail?.deployed == 1 && munzeeDetail?.generic_code && (1 == 1 /* Check in virtual type */) );
    // data.munzee.capture_type_id not in virtual_types 
    // ![].includes( (captureId ?? '') ) 

    const isDisplayDeployMunzee = munzeeDetail?.deployed == 0 && munzeeDetail.archived == 0 && captureId != undefined && ([32, 2588].includes(captureId) || (1 == 1 /* check in virtual_types */ && ![2646, 2650, 2651, 2652, 2653, 3574, 3745, 3959].includes(captureId)))
    const isDisplayUndeployMunzee = munzeeDetail?.deployed == 1 && captureId != undefined && ![148, 251, 686, 862, 971].includes(captureId);
    const isDisplayArchived = munzeeDetail?.archived == 0 && captureId != undefined && ![148, 251, 686, 862, 971].includes(captureId);
    const isDisplayCloseTrail = captureId != undefined && (captureId == 390 || captureId == 600) && munzeeDetail?.trail_closed == 0 && ( munzeeDetail?.trail_hops ? munzeeDetail?.trail_hops >= 5 : false)


    const apiFetchMunzeeDetail = async () => {
        if (isFetching) { return; }
        setIsFetching(true);
        const currentUrl = window.location.host + window.location.pathname;
        const username = user?.username;
        const munzee = await backend?.munzee.getMunzee({ url: currentUrl, 'username': username });
        if (munzee) {
            console.log('munzee', munzee);
            setMunzeeDetail(munzee);
            setFriendlyName(munzee?.friendly_name || '')
            setNotes(munzee?.notes || '')
        }
        setIsFetching(false);
    }
    useEffect(() => {
        if (munzeeId) {
            apiFetchMunzeeDetail();
        }
    }, [munzeeId]);

    const handleFriendlyName = (e: any): void => {
        setFriendlyName(e.target.value)
    }
    const handleNotes = (e: any): void => {
        setNotes(e.target.value)
    }

    // (e: React.FormEvent<HTMLFormElement>)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (munzeeDetail!!.creator_user_id != user?.userId && user?.maintenanceTeam != 1) {
            //navigate( munzeeDetail!!.url );
        }

        backend?.munzee.updateMunzee({
            username: (user?.username || ''),
            munzee_id: munzeeDetail!!.munzee_id || 0,
            friendly_name: friendlyName,
            notes: notes,
            latitude: munzeeDetail!!.latitude,
            longitude: munzeeDetail!!.longitude,
            deployed: munzeeDetail!!.deployed,
        }).then((munzee) => {
            if (munzee) {
                console.log('munzee', munzee);
                setApiResp(munzee);
                apiFetchMunzeeDetail();
                setMunzeeRefresh(1);

                // setMunzeeDetail(munzee);
                // setFriendlyName(munzee?.friendly_name || '')
                // setNotes(munzee?.notes || '')
            }
        });

        if (isEventUser && isMassChange) {
            backend?.munzee.massupdate({
                capture_type_id: munzeeDetail?.capture_type_id ?? 0,
                friendly_name: friendlyName,
                notes: notes
            }).then(() => { });
        }
    }

    const handleSubmitReplaceMissingMunzee = (e: React.FormEvent<HTMLFormElement>) => {
    }

    const munzeeDeploy = async () => {
        if ( window.confirm("Are you sure you want to DEPLOY this munzee?") ){
            const munzee = await backend?.munzee.deployMunzee({ username: (user?.username || ''),
            munzee_id: munzeeDetail!!.munzee_id || 0, });
            if (munzee) {
                // console.log('munzee', munzee);
                apiFetchMunzeeDetail();
            }
        }
    }
    const munzeeUndeploy = async () => {
        if ( window.confirm("Are you sure you want to UNDEPLOY this munzee?") ){
            const munzee = await backend?.munzee.undeployMunzee({ username: (user?.username || ''),
            munzee_id: munzeeDetail!!.munzee_id || 0, });
            if (munzee) {
                // console.log('munzee', munzee);
                apiFetchMunzeeDetail();
            }
        }
    }
    const munzeeArchived = async () => {
        if ( window.confirm("Are you sure you want to ARCHIVE this munzee? You can NOT undo this!") ){
            const munzee = await backend?.munzee.archiveMunzee({ username: (user?.username || ''),
            munzee_id: munzeeDetail!!.munzee_id || 0, });
            if (munzee) {
                // console.log('munzee', munzee);
                apiFetchMunzeeDetail();
            }
        }
    }
    const munzeeClose = async () => {
        if ( window.confirm("Are you sure you want to CLOSE this trail?") ){
            if ( munzeeDetail?.trail_id ){
                const munzee = await backend?.munzee.closeTrailMunzee({ trail_id: munzeeDetail?.trail_id || 0, });
                if (munzee) {
                    // console.log('munzee', munzee);
                    apiFetchMunzeeDetail();
                }
            }
        }
    }

    return (
        <Container id="munzee-edit-page">
            <Grid container spacing={2} pt={5}>
                <Grid item md={9} xs={9} pt={0}>
                    <PageTitle title={"Edit Your Munzee"} />

                    {(apiResp?.updated == 1 || apiResp?.linked == 1) &&
                        <div className="alert alert-success">{apiResp?.result}</div>
                    }

                    {(apiResp?.updated && apiResp?.updated == 0) || (apiResp?.linked && apiResp?.linked == 0) &&
                        <div className="alert alert-danger">{apiResp?.result}</div>
                    }

                    {(apiResp?.success) &&
                        (apiResp?.success == 1 && apiResp?.munzee_url_new) ? (
                        <div className="alert alert-success">{apiResp?.message}<br />find the replacement here: <strong><a href={apiResp?.munzee_url_new}>{apiResp?.munzee_url_new}</a></strong></div>
                    ) : (apiResp?.success == 0) ? (
                        <div className="alert alert-danger">{apiResp?.message}</div>
                    ) : ('')
                    }

                    <form method="POST" onSubmit={handleSubmit}>
                        <Box mt={4} mb={2}>
                            <TextField label="Name" variant="outlined" fullWidth name="friendly_name" value={friendlyName} onChange={handleFriendlyName} />
                        </Box>
                        <Box mb={2}>
                            <TextField label="Notes" variant="outlined" rows={6} fullWidth multiline name="notes" value={notes} onChange={handleNotes} />
                        </Box>
                        {isEventUser && <Box mb={2}>
                            <FormControlLabel control={<Checkbox name="masschange" defaultChecked={false} onChange={(e, checked) => {
                                setIsMassChange(checked);
                            }} />} label={"Change name and notes for all my munzees of this type and append munzee's code number like #12"} className='checkbox' />
                        </Box>}
                        <Box textAlign={'right'}>
                            <Button type="submit" variant="contained" className="update-btn">Update</Button>
                        </Box>
                    </form>

                    {isDisplayReplaceMissingMunzee && <>
                        <Box mt={4}>
                            <SubTitle title={"Replace Missing Munzee"} />
                            <Typography className="replace-missing-munzee" component="p">Want to replace a missing Munzee with a <Typography component="a" className="game-piece-link" href="https://store.freezetag.com/" target="_blank">game piece from our store</Typography>? <Typography component="b" fontWeight={700}>This will NOT convert one kind of munzee into another (i.e. normal munzee into mystery munzee)</Typography> Set the new code here:</Typography>
                        </Box>
                        <form method="post" onSubmit={(e) => {
                            e.preventDefault();
                            let genericCode = (document.getElementById("generic_code") as any).value;
                            if (genericCode && genericCode != "") {
                                backend?.munzee.genericCodeAdd({
                                    username: user?.username ?? "",
                                    munzee_id: munzeeDetail?.munzee_id ?? 0,
                                    generic: genericCode
                                }).then((munzee) => {
                                    if (munzee) {
                                        setApiResp(munzee);
                                    }
                                })
                            }
                        }}>
                            <Box mt={2}>
                                <Box>
                                    <TextField
                                        id="generic_code"
                                        name={"generic_code"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    https://www.munzee.com/g/
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Box>
                                <Box mt={2} textAlign={'right'}>
                                    <Button type="submit" variant="contained" className="update-btn">Link Generic</Button>
                                </Box>
                            </Box>
                        </form>
                    </>}


                    {isDisplaySwapOutVirtualMunzee && <>
                        <Box mt={4}>
                            <SubTitle title={"Swap Out Virtual Munzee"} />
                            <Typography className="replace-missing-munzee" component="p">Want to replace this virtual Munzee with a fresh virtual Munzee from your undeployed list? <Typography component="b" fontWeight={700}>The old Munzee will be ARCHIVED and can NOT be used again.</Typography> Set the new Munzee's code here:</Typography>
                        </Box>
                        <form method="post" onSubmit={(e) => {
                            e.preventDefault();
                            let swapCode = (document.getElementById("swap_code") as any).value;
                            if (swapCode && swapCode != "") {
                                const newUrl = "/m/" + munzeeDetail?.creator_username + "/" + swapCode
                                backend?.munzee.swapMunzee({
                                    munzee_id: munzeeDetail?.munzee_id ?? 0,
                                    url_new: newUrl
                                }).then((munzee) => {
                                    if (munzee) {
                                        setApiResp(munzee);
                                    }
                                })
                            }
                        }}>
                            <Box mt={2}>
                                <Box>
                                    <TextField
                                        id="swap_code"
                                        name={"swap_code"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    https://www.munzee.com/m/{munzeeDetail?.creator_username}/
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        placeholder="1234"
                                    />
                                </Box>
                                <Box mt={2} textAlign={'right'}>
                                    <Button type="submit" variant="contained" className="update-btn">Swap Virtual</Button>
                                </Box>
                            </Box>
                        </form>
                    </>}

                    {isDisplayRenovateMunzee && <>
                        <Box mt={4}>
                            <SubTitle title={"Renovate Munzee"} />
                            <Typography className="replace-missing-munzee" component="p">A renovation credit adds 5 rooms to a currently deployed destination Munzee. This will not alter the deployed Munzee in any other way.</Typography>
                            <Box mt={2} textAlign={'right'}>
                                <Button variant="contained" className="update-btn" onClick={() => {
                                    navigate(`${munzeeDetail?.url}admin/renovate/`)
                                }}>Renovate</Button>
                            </Box>
                        </Box>
                    </>}

                    { isDisplaySwapOutMunzee &&
                        <Box mt={4}>
                            <SubTitle title={"Swap Out Munzee"} />
                            <Typography className="replace-missing-munzee" component="p">Want to replace this Munzee with a fresh Munzee using a credit? Your sticker will be linked to the new Munzee.<br/><span style={{fontWeight:"bold"}}>The old Munzee will be ARCHIVED.</span>
                            <br/><Link className="swap-link" to={munzeeDetail?.url + 'admin/swap/'}>Choose Type</Link></Typography>
                        </Box>
                    }

                    { isDisplayDeployMunzee &&
                        <Box mt={4}>
                            <SubTitle title={"Deploy Munzee"} />
                            <Box mt={2} textAlign={'right'}>
                                <Button variant="contained" className="update-btn" onClick={munzeeDeploy}>Deploy</Button>
                            </Box>
                        </Box>
                    }

                    { isDisplayUndeployMunzee &&
                        <Box mt={4}>
                            <SubTitle title={"Undeploy Munzee"} />
                            <Typography className="replace-missing-munzee" component="p">You must redeploy from the location, not the website.</Typography>
                            <Box mt={2} textAlign={'right'}>
                                <Button variant="contained" className="update-btn" onClick={munzeeUndeploy}>Undeploy</Button>
                            </Box>
                        </Box>
                    }

                    { isDisplayArchived &&
                        <Box mt={4}>
                            <SubTitle title={"Archive Munzee"} />
                            <Typography className="replace-missing-munzee" component="p">Archiving a munzee allows you to retire the munzee from use. All existing points and captures will stay but the munzee will no longer be capturable and it won't be visible on the map. Once you archive a munzee, it can no longer be deployed.</Typography>

                            <Box mt={2} textAlign={'right'}>
                                <Button onClick={munzeeArchived} variant="contained" className="archive-btn">Archive</Button>
                            </Box>
                        </Box>
                    }

                    { isDisplayCloseTrail &&
                        <Box mt={4}>
                            <SubTitle title={"Close Trail"} />
                            <Typography className="replace-missing-munzee" component="p">You'll have to close the trail before you can create a new virtual trail.</Typography>
                            <Box mt={2} textAlign={'right'}>
                                <Button onClick={munzeeClose} variant="contained" className="archive-btn">Close</Button>
                            </Box>
                        </Box>
                    }

                </Grid>
                <Grid item md={3} xs={3} pt={0}>
                    { munzeeDetail && <MunzeeSidebar screenType={'edit_munzee'} munzeeDetail={munzeeDetail} />}
                </Grid>
            </Grid>
        </Container>
    )
}

export default MunzeeEditPage;