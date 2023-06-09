import React from "react";
import "./style.scss";
import { Container, PageTitle, VerticalTabs } from "../../components";
import { Box, Grid } from "@mui/material";

const PlaySafe = () => {
  return (
    <Container>
      <div className="play-safe-container">
        <Grid container spacing={3}>
          <Grid item xs={false} sm={false} md={4} lg={2}>
            <Box sx={{ display: { sm: "none", xs: "none", md: "block" } }}>
              <VerticalTabs
                data={[
                  { title: "About", route: "/company/about" },
                  { title: "Team", route: "/company/team" },
                  { title: "Play Safe", route: "/playsafe" },
                  { title: "Contact", route: "/company/contact" },
                  { title: "Terms of Service", route: "/terms" },
                  { title: "Privacy Policy", route: "/privacy" },
                ]}
              />
            </Box>
          </Grid>
          <Grid item xs={false} sm={false} md={8} lg={10}>
            <PageTitle title="PLAY SAFE" />
            <div className="play-safe-content">
              <h3>
                <i>Player Code Of Conduct</i>
              </h3>
              <h3>As a Munzee Player I agree to:</h3>
              <h3>
                BE CAREFUL
                <br /> Please make sure you are aware of the world around you
                while playing Munzee. Watch for cars if you’re near a road.
                Watch for holes so you don’t fall in one. Watch for critters
                that bite and plants that might give you a rash. Be careful and
                be aware- you never know when a Unicorn may stampede by!
              </h3>
              <h3>
                BE RESPECTFUL
                <br /> Follow all local, state, and federal laws while hunting
                and deploying Munzees. Do not trespass on private property
                without permission from the owner while playing Munzee. If
                someone doesn’t want you there, then find another place to
                play*. The world is a big place!
              </h3>
              <h3>
                BE CLEAN
                <br /> Respect the earth (and your fellow earthlings) and leave
                it clean after playing Munzee. When deploying Munzee stickers be
                sure to pick up any leftover paper or sticker backings. Maybe
                even pick up other trash as you go along!
              </h3>
              <h3>
                BE PREPARED <br /> Always make sure you’ve got plenty of water,
                good shoes, and a backup battery pack. Check the weather report
                for any conditions that might make it dangerous to play Munzee.
                Our stickers may be weatherproof, but you're not!
              </h3>
              <p>
                *Clarification to seeking permission. Amusement parks, inside
                zoos, airports, government buildings and private businesses are
                all examples of off-limits areas. Some outlet malls or public
                shopping spaces may also refuse deployment of munzees. If you
                receive permission to deploy in any of these areas you should be
                have it written in the notes of that munzee. Only official
                <a
                  href="https://store.freezetag.com/products/virtual-munzee"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  Virtual Munzees
                </a>{" "}
                may be placed in these locations.
              </p>
              <div className="list-area">
                <h1>Prohibited Actions:</h1>
                <ul>
                  <li>
                    Players are not allowed to publicly (or privately) share
                    their munzee barcodes or secret codes - unless they are
                    social munzees. *Exception: friendly field maintenance for a
                    player who can't maintain their munzee.*
                  </li>
                  <li>
                    Physical Munzees are to be present at the location you
                    specify on the map when deploying.
                  </li>
                  <li>
                    Players must be physically present at the location when
                    capturing or deploying a physical munzee. It it prohibited
                    to share user information for ghost capture or using other
                    means to virtually teleport to multiple locations (Mock GPS
                    or other means).
                    <ul>
                      <li>
                        While team/family play is encouraged, please do not send
                        members of a team (registered to and using a single
                        account) to multiple locations all over a city at the
                        same time.
                      </li>
                      <li>
                        One account is meant to be used in one location by a
                        team, not spread over a large distance. This is a great
                        case for creating individual accounts.
                      </li>
                      <li>
                        COMMON SENSE ADDITION: YOUR FAMILY or TEAM MAY NOT
                        CAPTURE ACROSS THE COUNTY, STATE, PROVINCE, COUNTRY, or
                        WORLD with one account.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Virtual Munzees can be deployed from anywhere in the world,
                    but must be captured within a certain range.{" "}
                  </li>
                  <li>
                    Premium Munzee Members may have up to 3 accounts logged in
                    per phone. If more than one account is in use, each player
                    must be present.
                  </li>
                  <li>
                    Munzees can not be deployed or housed within 150 feet of
                    another munzee by the same player. Other types of munzees
                    like Motel Munzees may require a wider radius. This can vary
                    by type.
                  </li>
                  <li>
                    Munzees can not be deployed or housed within 50 feet of
                    another munzee by a different player.
                  </li>
                  <li>
                    No more than one munzee can be deployed per location,
                    regardless of who the munzee owner is. *Exclusions for those
                    placed before proximity rules put in place. (mid year 2012)*
                  </li>
                  <li>
                    Do not deploy Munzees on educational campuses used for
                    students under age 18*. In addition, deployments should not
                    be placed on or near playground equipment in parks.
                    *Exclusions available with prior consent from school
                    administration and MHQ (Munzee Game Headquarters located in
                    McKinney, Texas)*
                  </li>
                  <li>
                    Abuse of the offline queue or excessive upload is
                    prohibited. Storing captures or deploys in the queue in
                    preparation for a special points day or weekend is strictly
                    prohibited. Points will be removed. The offline queue is a
                    backup tool, not designed for primary use. Use as necessary
                    when data/wifi is not accessible
                  </li>
                  <li>
                    Use of mock GPS app, device, program or any means of using
                    fake location data for the purpose of capture or deploy is
                    strictly prohibited.
                  </li>
                  <li>
                    Abusive language, bullying, or stalking by any member of the
                    player community will not be tolerated. This applies to
                    players bullying other players or players bullying or using
                    abusive language with Freeze Tag/Munzee representatives.
                    This applies to social media (Facebook, Twitter, Instagram,
                    etc.), whether it is an official Munzee page or Munzee
                    player-organized social pages, email sent to any member of
                    the Munzee or Freeze Tag team, journal entries, forums (such
                    as Discord), messaging features or any form of communication
                    between players and/or to Freeze Tag/Munzee representatives.
                  </li>
                  <li>
                    No inappropriate naming of Munzees. This is a
                    family-friendly game, so please keep it clean.
                    <ul>
                      <li>Examples of inappropriate munzee names include:</li>
                      <ul>
                        <li>Any use of profanity or vulgar terms.</li>
                        <li>Naming other Munzee players in a negative way.</li>
                        <li>Any attack on MHQ or Freeze Tag.</li>
                      </ul>
                    </ul>
                  </li>
                  <li>
                    Creation of fake accounts. Each account must be created by
                    the person in possession. Fake account and all associated
                    points will be removed permanently with primary account
                    holder receiving one month ban. *Exception: School-aged
                    children accompanied by consenting adult*
                  </li>
                  <li>
                    Use of a Munzee (of any kind) to raise funds for personal
                    projects or fundraisers is not permitted without full
                    permission from MHQ. This includes links from Munzee to
                    external fundraising sites, use of Munzee captures as a
                    reward for contribution, or any other act deemed
                    inappropriate use by MHQ.
                  </li>
                  <li>
                    Unauthorized use of trademark or copyright
                    image/design/logo/information on deployed Munzee skins.
                  </li>
                  <li>
                    Players shall not leave "Unable to Locate" or "Needs Repair"
                    entries on munzee unless they are certain the munzee is not
                    at the location.
                  </li>
                  <li>
                    Munzees must be deployed where other players can capture
                    them.
                  </li>
                  <li>
                    Munzees can not be deployed on private property where only
                    the land owner can capture the munzee. If deployed on your
                    property, you accept that other players can come onto your
                    property to capture them. If you do not want players on your
                    property, do not deploy munzees there.
                  </li>
                  <li>
                    Munzees can not be undeployed and redeployed to block others
                    from capturing them. If you see this done, please report to
                    support so the munzee can be archived.
                  </li>
                </ul>
              </div>
              <h1>
                Violation of any part of this Code of Conduct will result in a
                full ban for an undetermined period of time based on severity of
                violation (minimum seven days) at the sole discretion of MHQ.
                Ban applies to the app, website, forums, and player will not
                earn any residual points during the ban. If you are in a clan,
                you will be removed for the current battle, points removed from
                clan score, and no replacement player will be added.
              </h1>
              <p>
                <b>
                  Munzee reserves the right to take action against player
                  activity that it considers, in its sole discretion, offensive,
                  objectionable, irresponsible, violative of the Player Code of
                  Conduct or in any other way inappropriate for the Munzee
                  community and game. Specifically, we may take action against
                  any player activity that could be considered: - Abusive,
                  hateful, discriminatory, dangerous, defamatory, harassing,
                  threatening, or attacking others. Actions that may fall under
                  "cyber-bullying" are taken seriously by Munzee.
                </b>
              </p>
              <p>
                <b>
                  We recommend all players familiarize themselves with{" "}
                  <a
                    href="https://cyberbullying.org/cyberbullying-laws"
                    target="_blank"
                    rel="noreferrer"
                  >
                    http://cyberbullying.us/cyberbullying-laws/
                  </a>{" "}
                  -cyberbullying happens to people of all ages and will not be
                  tolerated. - Vulgar, obscene, sexually suggestive, or
                  otherwise offensive - Fraudulent, deceptive, misleading,
                  unlawful, spam or solicitations of any kind - Violations of
                  player privacy and invasive observation of player activity
                  ("stalking", in-game and via Munzee supported properties. This
                  includes activity not in compliance with Facebook’s Terms and
                  Conditions) - Deliberate disruption of gameplay, events, or
                  player activity.
                </b>
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default PlaySafe;
