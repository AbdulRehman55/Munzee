import React, { useState } from "react";
import "./styles.scss";
import { Container, Box, TextField, Button, FormControlLabel, Checkbox, Grid, FormControl, FormLabel } from "@mui/material";
import { PageTitle } from "../../components";
import { printLocales as p } from "./printLocales";
import { ClientContext } from "../../context/ClientContext";
import { Munzee } from "../../munzee-backend/types";
import { Link } from "react-router-dom";

const BatchPrint = (): JSX.Element => {

    const refChkBox = React.useRef<any[]>([]);
    const { backend, user, publicProfile } = React.useContext(ClientContext);
    const [formVals, setFormVals] = useState({
        checkMunzeesNum: 9,
        chkPrintNum: true,
        chkPrintText: true,
        fontSize: 16,
        qrCodeSize: 180,
        qrCodeMargin: 10,
        qrCodeText: "munzee.com",
    });
    
    const checkAll = async () => {
        for (let i = 0; i < refChkBox.current.length; i++) {
            const ref = (refChkBox.current[i] as MunzeeCheckbox)
            ref.setChecked(true);
        }
    }
    const unCheckAll = () => {
        for (let i = 0; i < refChkBox.current.length; i++) {
            const ref = (refChkBox.current[i] as MunzeeCheckbox)
            ref.setChecked(false);
        }
    }
    const checkFirstCheckedToNumber = () => {
        let checkMunzeesNum = parseInt((document.getElementById("checkMunzeesNum") as any).value);
        if (checkMunzeesNum > 0) {
            let checkedCount = 0;
            let isStartCheckedProcess = false;
            for (let i = 0; i < refChkBox.current.length; i++) {
                const ref = (refChkBox.current[i] as MunzeeCheckbox)
                if (isStartCheckedProcess) {
                    ref.setChecked(true);
                    checkedCount++
                    if(checkedCount >= checkMunzeesNum) {
                        break;
                    }
                } else if (ref.state.checked) {
                    isStartCheckedProcess = true;
                }
            }
        }
    }

    const [isFetching, setFetching] = React.useState(false)
    const [munzeeData, setMunzeeData] = React.useState<Munzee[]>([])
    React.useEffect(() => {
        if (user && !isFetching) {
            setFetching(true);
            const apiEntries = async () => {
                const result = await backend?.user.userUndeploysPrinting({ user_id: user?.userId ?? 0 });
                let arrData: Munzee[] = [];
                result?.forEach((item) => {
                    arrData.push(item);
                });
                setMunzeeData(arrData);
            }
            apiEntries();
        }
    }, [user])


    return (
        <Container id="print-page">
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
                    munzees: [""]
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

                data["munzees"] = [];
                munzeeData.forEach((munzee, index) => {
                    const ref = (refChkBox.current[index] as MunzeeCheckbox)
                    if (ref.state.checked) {
                        data["munzees"].push(munzee.url ?? "")
                    }
                });

                if (data["munzees"].length > 0) {
                    localStorage.setItem("printMunzees", JSON.stringify(data))
                    window.open('/print/code', "_blank", "noreferrer");
                } else {
                    window.open('/print', "_blank", "noreferrer");
                }
                return false;
            }}>
                <Box className="check-munzees">
                    <span>{p.checkMunzeeText[0]}</span>
                    <TextField
                        name="checkMunzeesNum"
                        id="checkMunzeesNum"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue={formVals.checkMunzeesNum}
                    />
                    <span>{p.checkMunzeeText[1]}</span>
                    <Button onClick={checkFirstCheckedToNumber}>{p.checkBtn}</Button>
                    <Button onClick={() => checkAll()}>{p.checkAllBtn}</Button>
                </Box>
                <Grid container spacing={0} className="checkbox-container">
                    {munzeeData.map((munzee, index) => {
                        return <MemoMunzeeCheckbox ref={(element) => { refChkBox.current[index] = element }} index={index} relativeUrl={munzee.relative_url ?? ""} url={munzee.url ?? ""} friendlyName={munzee.friendly_name ?? ""} />
                    })}
                </Grid>
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
                <Button type="submit" disabled={munzeeData.length == 0} className={munzeeData.length == 0 ? "disabled" : undefined}>{p.printBtn}</Button>
            </form>
        </Container>
    )
}


interface iGridCheckbox {
    index: number;
    url: string;
    relativeUrl: string;
    friendlyName: string;
};


class MunzeeCheckbox extends React.PureComponent<iGridCheckbox> {

    state = {
        checked: false
    }

    setChecked = async (checked: boolean) => {
        this.setState({ checked: checked });
    }

    onChange = () => {
        this.setChecked(!this.state.checked)
    }

    render() {
        const {
            index,
            url,
            relativeUrl,
            friendlyName
        } = this.props;
        return <Grid item xs={12} md={6} spacing={0}>
            <FormControl>
                <FormLabel><Checkbox value={url} checked={this.state.checked} onChange={this.onChange} /><Link to={relativeUrl} target="_blank">{friendlyName}</Link></FormLabel>
            </FormControl>
        </Grid>
    }
}
const MemoMunzeeCheckbox = React.memo(MunzeeCheckbox);

export default BatchPrint;