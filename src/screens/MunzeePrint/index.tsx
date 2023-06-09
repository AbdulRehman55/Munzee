import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { PageTitle } from "../../components";
import { printLocales as p } from "./printLocales";
import { ClientContext } from "../../context/ClientContext";
import Backend, { UserInfo } from "../../munzee-backend";
import MunzeeSidebar from "../../components/MunzeeSidebar";

const MunzeePrint = (): JSX.Element => {


    const { backend, user, publicProfile } = React.useContext(ClientContext);

    let isValidUser = (user != undefined && user != null && publicProfile != undefined && publicProfile != null);
    if (isValidUser) {
        isValidUser = user?.userId == publicProfile?.userId && user?.premium == 1;
    }

    if (isValidUser) {
        return <MunzeeActivityPageForValidUser backend={backend} user={user} />
    } else {
        return (
            <Container>
            </Container>
        );
    }
}

const MunzeeActivityPageForValidUser = ({
    backend,
    user
}: { backend: Backend | null, user: UserInfo | null }): JSX.Element => {

    const { munzeeDetailApi } = React.useContext(ClientContext);
    const [formVals, setFormVals] = useState({
        checkMunzeesNum: 9,
        chkPrintNum: true,
        chkPrintText: true,
        fontSize: 16,
        qrCodeSize: 180,
        qrCodeMargin: 10,
        qrCodeText: "munzee.com",
    });

    const [secret, setSecret] = React.useState<string>("")
    const apiSecret = async () => {
        const result = await backend?.munzee.secret({ munzee_id: `${munzeeDetailApi?.munzee_id}` })
        setSecret(result ?? "");
    }

    useEffect(() => {
        apiSecret();
    }, [])

    let barcode = 'https://www.munzee.com' + munzeeDetailApi?.url;
    if(secret != "") {
        barcode = barcode + secret + '/';
    }

    return (
        <Container id="munzee-print-page">
            <Grid container spacing={2} pt={5}>
                <Grid item md={9} xs={9} pt={0}>

                    <PageTitle title={p.pageTitle} />
                    <form className="form" role="form" method="post" onSubmit={(e) => {
                        e.preventDefault();

                        let data = {
                            isPrintNum: true,
                            isPrintText: true,
                            fontSize: 16,
                            qrCodeSize: 180,
                            qrCodeMargin: 10,
                            qrCodeText: "munzee.com",
                            munzees: [barcode]
                        }
                        data["isPrintNum"] = ((e.target as any)["chkPrintNum"] as any).checked;
                        data["isPrintText"] = ((e.target as any)["chkPrintText"] as any).checked;
                        data["fontSize"] = ((e.target as any)["fontSize"] as any).value;
                        data["qrCodeMargin"] = ((e.target as any)["qrCodeMargin"] as any).value;
                        data["qrCodeText"] = ((e.target as any)["qrCodeText"] as any).value;
                        data["qrCodeSize"] = ((e.target as any)["qrCodeSize"] as any).value;
                        if (data["qrCodeSize"] < 70) {
                            data["qrCodeSize"] = 70;
                        }

                        if (data["munzees"].length > 0) {
                            localStorage.setItem("printMunzees", JSON.stringify(data))
                            window.open('/print/code', "_blank", "noreferrer");
                        } else {
                            window.open('/print', "_blank", "noreferrer");
                        }
                        return false;
                    }}>
                        <Box className={'params'} >
                            <TextField
                                id="qr-code-pixels"
                                label={p.qrCodePixelsLabel}
                                name={"qrCodeSize"}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={formVals.qrCodeSize}
                            />
                            <TextField
                                id="qr-code-margin"
                                label={p.qrCodeMarginLabel}
                                name={"qrCodeMargin"}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={formVals.qrCodeMargin}
                            />
                            <FormControlLabel control={<Checkbox name="chkPrintNum" defaultChecked={formVals.chkPrintNum} />} label={p.printNum} className='checkbox' />
                            <FormControlLabel control={<Checkbox name="chkPrintText" defaultChecked={formVals.chkPrintText} />} label={p.printText} className='checkbox' />
                            <TextField
                                id="font-size"
                                label={p.fontSizeLabel}
                                name={"fontSize"}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={formVals.fontSize}
                            />
                            <TextField
                                id="font-size"
                                name={"qrCodeText"}
                                label={p.textLabel}
                                defaultValue={formVals.qrCodeText}
                            />
                        </Box>
                        <Button type="submit" className="update-btn" >{p.printBtn}</Button>
                    </form>

                    <h4 className="subtitle"><br />Barcode Value</h4>
                    <p>{barcode}</p>
                </Grid>
                <Grid item md={3} xs={3} pt={0}>
                    {munzeeDetailApi && <MunzeeSidebar screenType={'munzee_activity'} munzeeDetail={munzeeDetailApi} />}
                </Grid>
            </Grid>
        </Container >
    )
}

export default MunzeePrint;