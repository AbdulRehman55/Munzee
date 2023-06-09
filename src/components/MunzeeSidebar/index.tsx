import React, { useContext, useEffect } from "react";
import "./style.scss";
import SubTitle from "../subtitle";
import { Box, Button, Tooltip } from "@mui/material";
import { ClientContext } from "../../context/ClientContext";
import MunzeeShare from "../MunzeeShare";
import { Munzee } from "../../munzee-backend/types";
import { userAvatar } from "../../utils/functions/functions";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  screenType?: "munzee_activity" | "edit_munzee" | "munzee_convert" | "edit_munzee_location" | "";
  munzeeDetail?: Munzee;
  children?: any;
  callbackApiResponse?: (response: Readonly<{
    success: number;
    message: string;
  }>) => void
}

const MunzeeSidebar = ({ screenType, munzeeDetail, children, callbackApiResponse }: Props): JSX.Element => {

  const navigate = useNavigate()
  const { user, backend, setMunzeeDetailApi } = useContext(ClientContext);

  const apiMagnetize = async () => {
    const result = await backend?.munzee.magnetize({
      type: 1,
      munzee_id: munzeeDetail!!.munzee_id || 0,
    });

    if (result) {
      if (callbackApiResponse != undefined) {
        callbackApiResponse({ success: result.success, message: result.message });
      }
      if (result.success == 1) {
        setMunzeeDetailApi(result.munzee_data)
      }
    }
  }
  const apiMunzeeNudge = async () => {
    const result = await backend?.munzee?.munzeeNudge({ munzee_id: munzeeDetail?.munzee_id ?? 0 })
    if (result) {
      if (callbackApiResponse != undefined) {
        callbackApiResponse({ success: result.success, message: result.message });
      }
    }
  }

  const apiMunzeeEvolutionReset = async () => {
    const result = await backend?.munzee?.munzeeEvolutionReset({ munzee_id: munzeeDetail?.munzee_id ?? 0 })
    if (result) {
      if (callbackApiResponse != undefined) {
        callbackApiResponse({ success: result.success, message: result.message });
      }
      if (result.success == 1) {
        setMunzeeDetailApi(result.munzee_data)
      }
    }
  }

  useEffect(() => {

  }, []);

  const captureTypeId = parseInt(`${munzeeDetail?.capture_type_id}`)

  return (
    <div className="sidebar">


      {(munzeeDetail?.creator_user_id != user?.userId) && <>
        {(munzeeDetail?.has_user_captured_munzee == 0) ? <>
          <SubTitle title={"Not captured"} />
          <div className="captured-state"></div>
        </> : <>
          <SubTitle title={"Captured"} />
          <div className="captured-state yes"></div>
        </>}
      </>}

      {munzeeDetail != undefined && <>
        {munzeeDetail.capture_type_id && ![32, 2588, 3092, 3789].includes(captureTypeId) && munzeeDetail.latitude != 0 && munzeeDetail.longitude != 0 ? <>
          <div id="locationimage">
            <Button style={{ padding: 0 }} onClick={() => {
              navigate('/map/', { state: { latitude: munzeeDetail.latitude, longitude: munzeeDetail.longitude } });
            }}>
              <img src={`https://www.munzee.com/staticmap.php?center=${Number(munzeeDetail.latitude).toFixed(2)},${Number(munzeeDetail.longitude).toFixed(2)}&zoom=11&size=250x170`} />
            </Button>
          </div>
        </> : munzeeDetail.bouncing_munzee == 1 && munzeeDetail.unicorn_host ? <>
          <div id="locationimage">
            <Button style={{ padding: 0 }} onClick={() => {
              navigate('/map/', { state: { latitude: munzeeDetail.latitude, longitude: munzeeDetail.longitude } });
            }}>
              <img src={`https://www.munzee.com/staticmap.php?center=${Number(munzeeDetail.latitude).toFixed(2)},${Number(munzeeDetail.longitude).toFixed(2)}&zoom=11&size=250x170`} />
            </Button>
          </div>
          <div className="text-center" style={{ marginTop: 8 }}>at <Link to={`${munzeeDetail.unicorn_host.code}`}>{munzeeDetail.unicorn_host.friendly_name}</Link></div>
        </> : <></>}

        {munzeeDetail.first_to_capture && <>
          <div className="ftc text-center">
            <Link to={`/m/${munzeeDetail.first_to_capture.username}/`}><img className="user-photo" src={userAvatar(munzeeDetail.first_to_capture.user_id ?? 0)} /></Link>
          </div>
          <div className="clearfix"></div>
          <p className="text-center">
            FTC by<br /> <Link to={`/m/${munzeeDetail.first_to_capture.username}/`}>{munzeeDetail.first_to_capture.username}</Link>
          </p>
        </>}

        {munzeeDetail.closest && munzeeDetail.closest.length > 0 && munzeeDetail.capture_type_id != undefined && ![32, 2588, 3092, 3789].includes(captureTypeId) && <>
          <div id="closest-munzees" className="tooltip-holder">
            <SubTitle title={"Closest munzees"} />
            {munzeeDetail.closest.map((munzee) => {
              return <Tooltip title={`${Number(munzee.distance).toFixed(2)} mi / ${Number(munzee.distance * 1.609344).toFixed(2)} km`} arrow placement="left">
                <div style={{ width: '100%', height: 38, marginBottom: 10 }}>
                  <Link to={munzee.code ?? ""}><img src={munzee.pin_icon} style={{ width: 32, float: "left" }} />{munzee.friendly_name}</Link>
                </div>
              </Tooltip>
            })}
          </div>
        </>}
      </>}


      {munzeeDetail != undefined && screenType == "munzee_activity" && <>

        {(munzeeDetail.capture_type_id != undefined && [0, 40, 131, 218, 242, 280, 290, 532, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 584, 651, 681, 851, 1020, 1086, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1420, 1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1432, 1433, 1434, 1435, 1436, 1437, 1438, 1439, 1440, 1441, 1442, 1443, 1444, 1445, 1446, 1447, 1448, 1449, 1450, 1451, 1452, 1453, 1454, 1455, 1456, 1457, 1458, 1459, 1460, 1461, 1462, 1463, 1464, 1465, 1466, 1467, 1468, 1469, 1470, 1471, 1472, 1473, 2145, 2361, 2362, 2391, 2426, 3244, 3295, 3580, 3724, 3862, 3961].includes(captureTypeId)) && <>

          {munzeeDetail.hospitable != undefined && [0, 52, 53, 140, 306, 40, 131, 218, 242, 584].includes(captureTypeId) && <>
            {munzeeDetail.hospitable == 0 ? <>
              <Button disabled style={{ marginBottom: 10 }} className="btn"><i className="fa fa-ban"></i>cannot host</Button>
            </> : munzeeDetail.hospitable == 1 ? <>
              <Button disabled style={{ marginBottom: 10 }} className="btn"><i className="fa fa-check"></i>can host</Button>
            </> : <></>}
          </>}

          <SubTitle title={"More"} />
          <Box textAlign={"center"}>
            <Button style={{ marginBottom: 10 }} className="update-btn" onClick={() => {
              if (window.confirm('Are you sure you want to MAGNETIZE this munzee using a magnet credit?')) {
                //document.forms['form-mag'].submit()
                apiMagnetize();
              }
            }}>
              <i className="fa fa-magnet"></i>magnetize
            </Button>
          </Box>
        </>}

        {(munzeeDetail?.creator_user_id == user?.userId && munzeeDetail.can_nudge == 1) && <>
          <SubTitle title={"More"} />
          <Box textAlign={"center"}>
            <Button style={{ marginBottom: 10 }} className="update-btn" onClick={() => {
              if (window.confirm('Are you sure you want to NUDGE this Myth to bounce to a new location?')) {
                apiMunzeeNudge();
              }
            }}>
              <i className="fa fa-forward"></i>nudge
            </Button>
          </Box>
        </>}


        {(munzeeDetail?.creator_user_id == user?.userId && munzeeDetail.deployed == 1 && munzeeDetail.evolution_reset_available == 1) && <>
          <SubTitle title={"More"} />
          <Box textAlign={"center"}>
            <Button style={{ marginBottom: 10 }} className="update-btn" onClick={() => {
              if (window.confirm('Are you sure you want to RESET this Munzee to stage 1 using an evolution reset credit?')) {
                // document.forms['form-evoreset'].submit()
                apiMunzeeEvolutionReset();
              }
            }}>
              <i className="fa fa-history"></i>reset evolution
            </Button>
          </Box>
        </>}
      </>}


      {munzeeDetail && <MunzeeShare munzeeDetail={munzeeDetail} />}

      {(children) && children}
    </div >
  );
};

export default MunzeeSidebar;
