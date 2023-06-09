import React, { useContext, useState, useEffect } from "react";
import "./styles.scss";
import { PageTitle } from "../../components";
import { settingsLocales as s } from "./settingsLocales";
import { Box, Button } from "@mui/material";
import { ClientContext } from "../../context/ClientContext";

const ChangePictureForm = (): JSX.Element => {
  const { client } = useContext(ClientContext);

  const [file, setFile] = useState<File | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  const handleSubmitForm = () => {
    if (dataUrl) {
      client?.settings.changeAvatar(dataUrl).then((result) => {
        alert(`Change avatar: ${result.success}`);
      });
    }
  };

  return (
    <form>
      <PageTitle title={s.change_pic_title} />
      <Box className="change-pic-wrapper">
        <span>{s.select_pic}</span>
        <input
          type="file"
          onChange={(e) => setFile(e?.target?.files?.[0] || null)}
        />
      </Box>
      <Box className="btn-wrapper">
        <Button className="confirm-btn" onClick={() => handleSubmitForm()}>
          {s.upload_avatar_btn}
        </Button>
      </Box>
    </form>
  );
};

export default ChangePictureForm;
