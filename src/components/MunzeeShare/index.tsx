import React, { useEffect, useState } from "react";
import "./style.scss";
import SubTitle from "../subtitle";
import { Box } from "@mui/material";
import { useLocation } from 'react-router-dom'

interface Props {
  munzeeDetail?: any;
}

const MunzeeShare = ({ munzeeDetail, }: Props) => {
  const location = useLocation();
  
  useEffect(() => {

      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      document.getElementsByClassName("twitter-embed")[0].appendChild(script);
      // document.body.append(script);

      let script2 = document.createElement("script");
      script2.setAttribute("crossOrigin","anonymous");
      script2.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&appId=172822769459528&version=v2.0";
      script2.type = "text/javascript";
      document.getElementsByClassName("facebook-embed")[0].appendChild(script2);
      // document.body.append(script2);

  }, [location]);

  return (
    <div>
      <SubTitle title={"Share"} />
      <Box textAlign={'center'}>
          <Box className="twitter-embed">
              <a href="https://twitter.com/share" className="twitter-share-button" data-via="munzee"></a>
          </Box>
          <div id="fb-root"></div>
          <Box className="facebook-embed">            
            <div className="fb-like" data-href={"https://www.munzee.com/" + munzeeDetail?.url} data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>
          </Box>
      </Box>      
    </div>
  );
};

export default MunzeeShare;
