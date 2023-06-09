import React, { useState } from "react";
import "./styles.scss";

import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

interface iPrintData {
    checkMunzeesNum: number;
    isPrintNum: boolean;
    isPrintText: boolean;
    fontSize: number;
    qrCodeSize: number;
    qrCodeMargin: number;
    qrCodeText: string;
    munzees: string[];
}

const BatchPrintQrcode = (): JSX.Element => {

    const navigate = useNavigate();

    const [printData, setPrintData] = useState<iPrintData | null>(null)

    React.useEffect(() => {
        const result = localStorage.getItem("printMunzees");
        if (result) {
            try {
                let data = JSON.parse(result);
                if (data.munzees) {
                    data.qrCodeMargin = parseInt(data.qrCodeMargin)
                    setPrintData(data);
                } else {
                    noDataFoundAction();
                }
            } catch (error) {
                noDataFoundAction();
            }
            setTimeout(() => {
                localStorage.removeItem("printMunzees")
            }, 1000);
        } else {
            noDataFoundAction();
        }
    }, [])

    const noDataFoundAction = () => {
        localStorage.removeItem("printMunzees");
        navigate(`/print`);
    }

    return (
        <div className="print-page-code">
            {printData && <>
                {printData.munzees.map((munzeeUrl, index) => {
                    const pathCompoent = munzeeUrl.split('/');
                    const code = pathCompoent.length > 5 ? pathCompoent[5] : undefined;

                    return <div key={index} className="qrcodeContainer">
                        <div id={'qrcode' + index} style={{
                            float: "left",
                            margin: printData.qrCodeMargin + 'px',
                            width: printData.qrCodeSize + 'px',
                            marginBottom: (printData.isPrintNum || printData.isPrintText) ? 2 : undefined
                        }}>
                            <QRCode
                                value={munzeeUrl}
                                size={printData.qrCodeSize}
                                level="L"
                            />
                        </div>
                        <div style={{ margin: printData.qrCodeMargin + 'px', fontSize: printData.fontSize + 'px', width: printData.qrCodeSize + 'px' }}>
                            {printData.isPrintText && <div style={{ textAlign: "left", marginLeft: '2px' }}>{printData.qrCodeText}</div>}
                            {printData.isPrintNum && <div style={{
                                textAlign: "right", marginRight: '2px',
                                position: printData.isPrintText ? "relative" : undefined,
                                top: printData.isPrintText ? -(printData.fontSize * 1.2) + 'px' : undefined,
                                marginBottom: printData.isPrintText ? -(printData.fontSize * 1.2) + 'px' : undefined,
                            }}>{code}</div>}
                        </div>
                    </div>
                })}
            </>}
        </div>
    );
};

export default BatchPrintQrcode;