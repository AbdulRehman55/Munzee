import React from "react";
import "./style.scss";
import { Container, PageTitle, VerticalTabs } from "../../components";
import { Box, Grid } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container>
      <div className="privacy-policy-container">
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
            <PageTitle title="PRIVACY POLICY" />
            <div className="privacy-policy-content">
              <p>
                <strong>Last updated: 3 May 2019</strong>
                <br />
                <strong>Freeze Tag, Inc. Privacy Policy</strong>
              </p>
              <p>
                Freeze Tag values the privacy of our customers (collectively or
                individually, “Users”) who use our application program
                interface, the mobile applications, Freeze Tag website, and
                other websites, online services, or content (e.g., feeds and
                applications) owned or operated by Freeze Tag (collectively, the
                “Freeze Tag Services”).
              </p>
              <p>
                This Privacy Notice governs the Freeze Tag Services, and details
                important information about the use and disclosure of User
                information collected through the Freeze Tag Services. Freeze
                Tag provides this Privacy Notice to help you make an informed
                decision about whether to use the Freeze Tag Services. Please
                read Freeze Tag’s Privacy Policy before using Freeze Tag’s
                services because it will tell you how we collect, store, use and
                disclose your personal information when providing these services
                to you.
              </p>
              <p>
                This Privacy Notice is incorporated into and is subject to
                Freeze Tag Terms of Service. Your use of the Freeze Tag Services
                and any personal information you provide on the Freeze Tag
                Services remains subject to the terms of this Privacy Notice and
                the Terms of Service.
              </p>
              <p>
                Should you have any questions or complaints relating to this
                Privacy Policy, please contact us at privacy[a]freezetag.com or
                alternatively at Freeze Tag, Inc., Privacy Department, 18062
                Irvine Blvd., Suite 103, Tustin, CA 92780.
              </p>
              <p>
                “Freeze Tag”, or “Munzee” or “we” or “us” refers to Freeze Tag,
                Inc.
              </p>
              <p>
                This Privacy Policy applies whenever you (or Your Authorized
                Child) play our games or otherwise access any of our other
                products, services, content, Freezetag.com and/or the other
                domains provided by Freeze Tag, together referred to as “Freeze
                Tag Services.” This Privacy Policy describes:
              </p>
                <div className="list-area">
                <ul>
                  <li>
                    what information we collect, how we collect it, and why
                  </li>
                  <li>how we use that information and with whom we share it</li>
                  <li>how you can access and update that information</li>
                  <li>
                    the choices you can make about how we collect, use, and
                    share your information
                  </li>
                  <li>how we protect the information we store about you</li>
                </ul>
                </div>
              <br />
              <p>
                If you do not want Freeze Tag to collect, store, use or share
                your information in the ways described in this Privacy Policy,
                you may not play Freeze Tag’s games or use Freeze Tag’s
                Services.
              </p>
              <p>
                <strong>
                  <u>Information We Collect and How We Collect It</u>
                </strong>
              </p>
              <p>
                <strong>
                  {" "}
                  Information About You (or Your Authorized Child) That We Get
                  From Connected Third-Party Applications, Including Social
                  Networks (like Facebook)
                </strong>
              </p>
              <p>
                If you play Freeze Tag games or access any of our other Freeze
                Tag Services on connected third-party applications or connect
                our Services to any third-party applications, including social
                networks like Facebook, Freeze Tag may receive certain
                information about you from the provider of the third-party
                application. The information we receive depends on the Freeze
                Tag game you’re playing, the third-party application, your
                privacy settings and, if applicable, your friends’ privacy
                settings on that third-party application.
              </p>
              <p>
                For example, Freeze Tag may collect and store some or all of the
                following information shared by the provider of the connected
                third-party application:
              </p>
              <div className="list-area">
              <ul>
                <li>your first and last name;</li>
                <li>your profile picture or its URL;</li>
                <li>
                  your user ID number (like your Facebook ID number), which may
                  be linked to publicly-available information like your name and
                  profile photo;
                </li>
                <li>
                  the user ID number and other public data for your friends;
                </li>
                <li>
                  the login e-mail you provided to that third-party application
                  when you registered with it
                </li>
                <li>
                  your physical location and that of the devices you use to
                  access our Services;
                </li>
                <li>your gender;</li>
                <li>your birthday year and/or age range;</li>
                <li>
                  information about your activities on or through the connected
                  third-party application;
                </li>
                <li>
                  other publicly-available information on the third-party
                  application; and/or
                </li>
                <li>
                  any other information that you or the provider of the
                  third-party application share with Freeze Tag.
                </li>
              </ul>
              </div>
              <p>
                If you access our Services from a third-party application or
                connect our Services to a third-party application, you should
                also read that third-party application’s Terms of Service and
                Privacy Policy.
              </p>
              <p>
                If you are unclear about what information a third-party
                application is sharing with us, please go to the third-party
                application to find out more about their privacy practices.
              </p>
              <strong>Cookies and Automated Information Collection</strong>
              <p>
                We and service providers acting on our behalf, like Google
                Analytics, store log files and use tracking technologies such
                as:
              </p>
              <div className="list-area">
              <ul>
                <li>
                  cookies, which are small pieces of data transferred to your
                  mobile device or computer for record-keeping purposes;
                </li>
                <li>
                  web beacons, which let us know if a certain page was visited
                  or whether an e-mail was opened;
                </li>
                <li>
                  tracking pixels, which allow us or our advertising partners to
                  advertise more efficiently and effectively; and
                </li>
                <li>
                  local shared objects, also known as flash cookies, which help
                  us to reduce fraud, remember your in-game preferences and
                  speed up load times.
                </li>
              </ul>
              </div>
              <p>
                We and our service providers use these log files, tags, and
                tracking technologies to collect and analyze certain kinds of
                technical information, including:
              </p>
              <div className="list-area">
              <ul>
                <li>IP addresses;</li>
                <li>the type of computer or mobile device you are using;</li>
                <li>your operating system version;</li>
                <li>
                  your mobile device’s identifiers, like your MAC Address,
                  Identifier For Advertising (IDFA), and/or International Mobile
                  Equipment Identity (IMEI);
                </li>
                <li>your browser types;</li>
                <li>your browser language;</li>

                <li>referring and exit pages, and URLs;</li>

                <li>platform type;</li>

                <li>the number of clicks on a page or feature;</li>
                <li>domain names;</li>
                <li>landing pages;</li>
                <li>pages viewed and the order of those pages;</li>

                <li>the amount of time spent on particular pages; and</li>

                <li>
                  game state and the date and time of activity on our websites
                  or games.
                </li>
              </ul>
              </div>
              <p>
                In some cases, we will connect this information with your social
                network ID or Freeze Tag Internal user ID.
              </p>
              <p>
                Please note that companies delivering advertisements on our
                Services may also use cookies or other technologies as described
                below in Third Party Advertising Including Tailored Advertising
                and Analytics, and those practices are subject to those
                companies’ own policies.
              </p>
              <p>
                For more information on how to limit the types of cookies you
                allow, please see Opting out of Cookie Tracking below.
              </p>
              <strong>Other Information from Your Mobile Device</strong>
              <p>
                If you play Freeze Tag games on your mobile device, in addition
                to your device identifiers, we may also collect:
              </p>
              <div className="list-area">
              <ul>
                <li>Your country; and</li>
                <li>
                  Your mobile contacts (as further described below in
                  “Information About Your Contacts”); and
                </li>

                <li>
                  in some games, like Garfield Go, Munzee, WallaBee, Eventzee,
                  and ZeeTours, which are location based games, we will also
                  collect location information, but only if you have authorized
                  it, including for your child under 13 (in this section, and
                  sections where we refer to location based games, when we
                  reference you, we also reference your authorized child,
                  because we have technical features which require parental
                  authorization). We collect and store information about your
                  (or your authorized child’s) location when you use our game
                  and take game actions that use the location services made
                  available through your device’s mobile operating system, which
                  makes use of mobile tower triangulation, wi-fi triangulation,
                  and/or GPS. You understand and agree that by using our games,
                  you will be transmitting your device location to us and some
                  of that location information, along with your user name, may
                  be shared through the game. We retain the right to use all
                  information gathered via user activities. However, privacy
                  will be respected and your information will not be released to
                  any third parties.
                </li>

                <li>
                  Your usage information. Our servers automatically record
                  certain information about your usage. These server logs may
                  include information such as a mobile device identification
                  number and device identifier, platform type, features used in
                  the mobile applications, the amount of time spent on
                  particular screens, and the dates and times of your access
                </li>

                <li>
                  Personal Health Information such as “steps” and “distance”
                  recorded by Apple Healthkit, Google Fit, or another fitness
                  tracking device. Users must complete a second authorization
                  process to allow one or more of the Freeze Tag apps to access
                  and display the personal health information that is recorded
                  by a fitness device or app (such as Apple Health recorded by
                  the iPhone or Apple Watch).
                </li>
              </ul>
              </div>
              <p>
                If you want to adjust your privacy preferences on your mobile
                device, please see How to Access, Update and Manage Your
                Information below.
              </p>
              <strong>
                Information About You That You Share With Us Directly
              </strong>
              <p>
                When you use our Services (whether through a social network or
                through Freeze Tag directly), you may give us information
                directly (like when you’re setting up your account) and we will
                store that on our systems and use it for the purposes described
                in this Privacy Policy.
              </p>
              <p>
                Some games or parts of our Services may use a more traditional
                registration or account set-up process where you may be asked to
                give us some or all of the following information:
              </p>
              <div className="list-area">
              <ul>
                <li>your first and last names;</li>
                <li>the year you were born;</li>
                <li>your e-mail address;</li>
                <li>a password; and</li>
                <li>
                  other information that helps us make sure it’s you accessing
                  your account or helps us improve our services.
                </li>
              </ul>
              </div>
              <p>
                We may also let you create a player profile, separate from your
                social networking site profile (for example, your Facebook
                profile), that other Freeze Tag players can see. Your player
                profile may include information like:
              </p>
              <div className="list-area">
              <ul>
                <li>a profile photo;</li>
                <li>game username(s);</li>
                <li>biographic details (like your age or age range);</li>
                <li>approximate location information that you provide;</li>
                <li>links to your profiles on various social network;</li>
                <li>
                  a Freeze Tag player ID number that is created by Freeze Tag
                  and used to identify your profile.
                </li>
              </ul>
              </div>
              <p>
                Certain information in your Freeze Tag profile may be publicly
                accessible on Freeze Tag games, including:
              </p>
              <div className="list-area">
              <ul>
                <li>The Freeze Tag player ID;</li>
                <li>Your name and/or username; and</li>
                <li>Your player profile picture.</li>
              </ul>
              </div>
              <strong>
                Information You Generate Using Our Communications Features
              </strong>
              <p>
                Except for games that have an age gate for children under 13
                (which will either require parent authorization, or refuse game
                play), you may be able to take part in certain activities on our
                Service that let you communicate or share information not just
                with Freeze Tag, but also with other Freeze Tag players. These
                include:
              </p>
              <div className="list-area">
              <ul>
                <li>participating in player forums and message boards;</li>
                <li>
                  posting public comments to other players’ profiles or
                  gameboards;
                </li>
                <li>
                  sending private messages or invitations to other players,
                  either directly on our websites or to their e-mail accounts;
                </li>
                <li>chatting with other players; and/or</li>
                <li>posting photos or drawings.</li>
              </ul>
              </div>
              <p>
                You acknowledge and expressly agree that we may access in
                real-time, record and/or store archives of these communications,
                comments, photos and drawings on Freeze Tag’s servers to make
                use of them to protect the safety and well-being of our players
                and Freeze Tag’s rights and property in connection with our
                Services; to conduct research; to operate, improve, personalize
                and optimize our Services and our players’ experiences,
                including through the use of analytics; and to manage and
                deliver contextual advertising.
              </p>
              <strong>Customer Support Correspondence</strong>
              <p>
                Except as provided herein, when you ask for help from our
                Customer Support team, we will collect and store the contact
                information you give them (generally, your name and e-mail
                address), information about your game play or activity on our
                Services, and your Freeze Tag player and/or social network ID
                number. We will also store the communications you have with the
                Customer Service team and any information in those
                communications in order to provide support and improve the
                Services. For users of our games designed for children under 13,
                we will use your contact information for the sole purpose of
                providing a one-time response to your question. We will then
                delete your information from our servers.
              </p>
              <strong>Other Sources</strong>
              <p>
                We may collect or receive information about you from other
                sources like third-party information providers. We use this
                information along with information you provide us directly, for
                example, to help you and your friends connect or to serve you
                advertising more tailored to your interests.
              </p>
              <p>
                If you would like to learn more about how we secure your
                information, please see Security of Your Information below.
                <br />
                <br />
                <strong>
                  <u>
                    {">"}
                    {">"}How We Use the Information We Collect
                  </u>
                </strong>
              </p>
              <p>
                The main use of the information we collect and store is to
                provide a better gaming experience, but there are other uses as
                well. The uses for which we collect and store your information
                include:
              </p>
              <div className="list-area">
              <ul>
                <li>
                  to operate, improve and optimize our Services and our players’
                  experiences;
                </li>
                <li>
                  to create your game accounts and allow you to play our games;
                </li>
                <li>
                  {" "}
                  to remember information so that you will not have to re-enter
                  it during your visit or the next time you visit the Freeze Tag
                  Services;
                </li>
                <li>
                  to identify and suggest connections with other Freeze Tag
                  players and personalize our Services to you;
                </li>
                <li>
                  to identify your location (for specific games such as Garfield
                  Go, Munzee, WallaBee, Eventzee, and ZeeTours which are
                  location based games), and allow us to provide you with full
                  game play, including to verify that you are at the required
                  location for a feature in the game. That location is stored on
                  the Freeze Tag servers to verify it matches with game play
                  items. At no time is your location being stored or transmitted
                  for any other reason other than those essential for the Freeze
                  Tag Services.
                </li>
                <li>to enable players to communicate with each other;</li>
                <li>
                  to provide technical support and respond to player inquiries;
                </li>
                <li>to protect the safety and well-being of our players;</li>
                <li>
                  to protect Freeze Tag’s rights and property in connection with
                  our Services;
                </li>
                <li>
                  to prevent fraud or potentially illegal activities, and to
                  enforce our Terms of Service;
                </li>
                <li>
                  to manage and deliver contextual and behavioral advertising;
                </li>
                <li>
                  to notify players of in-game updates, new products or
                  promotional offers;
                </li>
                <li>
                  to administer rewards, surveys, sweepstakes, contests, or
                  other promotional activities or events sponsored or managed by
                  us or our business partners;
                </li>
                <li>
                  to comply with our legal obligations, resolve any disputes we
                  may have with you or other players, and to enforce our
                  agreements with third parties; and
                </li>
                <li>to conduct research.</li>
              </ul>
              </div>
              <p>
                One important use of your information is communication. If you
                have provided your e-mail address to Freeze Tag, we will use it
                to respond to customer support inquiries, and keep you informed
                of your in-game activity, including comments from friends, let
                you know about in-game status as well as tell you about gift and
                neighbor requests, send you messages such as privacy or security
                related notices, or notify you of major Freeze Tag services
                updates, or other customer service purposes. Some messages are
                directed to investors who have requested updates that are sent
                out regarding the Company. Some messages, like invites for
                friends to join you in a game, may include your name and profile
                photo. We may also send promotional e-mail messages
                (“Promotional Communications”) directly or in partnership with
                other parties, in accordance with your marketing preferences.
                Each Promotional Communication will offer you choices about
                receiving additional messages. Receipt of such communications
                depends on Freeze Tag having certain contact information from
                you. Some of our games will ask for age information to determine
                if you are under 13. If you are under 13, you will not be able
                to provide us with certain contact information. Please see the
                section on Our Policies Concerning Children for more
                information.
              </p>
              <p>
                <strong>
                  <u>
                    {">"}
                    {">"}How We Share Your Information
                  </u>
                </strong>
              </p>

              <p>
                We may disclose or publish aggregated information (information
                about you and other players collectively that is not intended to
                specifically identify you) and other non-personal information
                about our players for industry analysis, demographic profiling,
                marketing, analytics, advertising, and other business purposes.
              </p>

              <p>
                In addition, we may share your information (which may include
                personal information) with third parties (in other words,
                parties other than Freeze Tag) or allow third parties to collect
                this information from our Services in the following
                circumstances:
              </p>
              <strong>Your Consent</strong>
              <p>
                With your consent, we may share your information with third
                parties or allow them to collect your information from our
                Services in some ways not specifically described in this Privacy
                Policy.
              </p>
              <strong>Friends and Other Freeze Tag Players</strong>
              <p>
                The Service supports and often encourages you to interact with
                other players. In most Freeze Tag games, if you play through a
                social network or register through a social network (for
                example, Facebook), your social network friends will see your
                name, profile photo and descriptions of your game activity.
                Similarly, in some Freeze Tag games, other players, regardless
                of whether they are your social network friends or not, will be
                able to see descriptions of your game activity, communicate with
                you within our Services, and view your game profile, which may
                include your name or a “game name” and your profile photo. Other
                players may also be able to send you game requests or even
                friend requests through the related social network’s or Freeze
                Tag’s communication channels.
              </p>
              <strong>
                Third-Party Advertising Including Tailored Advertising and
                Analytics
              </strong>
              <p>
                We have advertising on our Services so we can continue to offer
                many of our Services for free.
              </p>
              <p>
                We do not actively share personal information with third-party
                advertisers for their direct marketing purposes unless you give
                us your consent.
              </p>
              <p>
                When advertisers or ad networks place ads in our Services, they
                may collect or we may share the following types of information
                from within our Services:
              </p>
              <div className="list-area">
              <ul>
                <li>
                  performance data (like the number of clicks on an
                  advertisement);
                </li>
                <li>
                  aggregated and/or de-identified information about you and
                  other players collectively that is not intended to
                  specifically identify you;
                </li>
                <li>
                  certain technical information (for example, IP addresses,
                  non-persistent device identifiers such as IDFAs, and
                  de-identified persistent device identifiers such as a hashed
                  Android ID);
                </li>
                <li>your social network ID;</li>
                <li>
                  and other contextual data about your game play (for example,
                  your level and session length).
                </li>
              </ul>
              </div>
              <p>The information collected may be used to:</p>
              <div className="list-area">
              <ul>
                <li>
                  measure how effective ads are, to offer you targeted
                  advertising in order to personalize your experience by showing
                  you advertisements for products and services that are more
                  likely to appeal to you (a practice known as behavioral
                  advertising), and/or
                </li>
                <li>
                  undertake web analytics (like Google Analytics which is used
                  to analyze traffic and other player activity to improve your
                  experience).
                </li>
              </ul>
              </div>
              <p>
                Advertisers or ad networks may collect this information through
                the use of tracking technologies like browser cookies and web
                beacons, and they may use a single tracking technology or
                multiple tracking technologies at the same time.
              </p>
              <p>
                Please note, after clicking on a third party advertisement, you
                may no longer be on a site hosted by Freeze Tag or the social
                network through which you are playing Freeze Tag’s games.
              </p>

              <p>
                If you do not want to receive tailored in-application
                advertisements from third parties, please see How to Access,
                Update and Manage Your Information. Please note that no tailored
                advertisements will be delivered for Freeze Tag games that have
                an age gate to identify players under 13, though Freeze Tag may
                allow contextual advertisements to be displayed.
              </p>
              <strong>Safety, Security and Compliance with Law</strong>
              <p>
                Your information, and the contents of all of your online
                communications in our Services and between You and Freeze Tag
                may be accessed and monitored as needed to provide our Service
                and may be disclosed:
              </p>
              <div className="list-area">
              <ul>
                <li>
                  when we have a good faith belief that we have to disclose the
                  information in response to lawful requests by public
                  authorities, including to meet national security or law
                  enforcement requirements, or legal process (for example, a
                  court order, search warrant or subpoena);
                </li>
                <li>to satisfy any laws or regulations that apply;</li>
                <li>
                  where we believe in our sole discretion that the Service is
                  being used in committing a crime, including to report such
                  criminal activity or to share information with other companies
                  and organizations for the purposes of fraud protection, credit
                  risk reduction, and other security precautions;
                </li>
                <li>
                  when we have a good faith belief that there is an emergency
                  that poses a threat to the health and/or safety of you,
                  another person or the public generally; and
                </li>
                <li>
                  to protect the rights or property of Freeze Tag and other
                  applicable third parties, including to enforce our&nbsp;Terms
                  of Service.
                </li>
              </ul>
              </div>
              <strong>Offer Walls</strong>
              <p>
                Freeze Tag games or their purchase pages may display an “offer
                wall” that is hosted by an offer wall provider. The offer wall
                allows third-party advertisers to provide virtual currency to
                players in exchange for interacting with an advertisement or for
                completing a marketing offer that may include signing up for an
                account with one of those advertisers. These offers are not made
                by Freeze Tag. These offers may be shown to you based on certain
                technical information, like your geographic area or
                de-identified demographic information. After clicking on one of
                these offers, you will no longer be on a site hosted by Freeze
                Tag or the social network through which you are playing Freeze
                Tag’s games. To properly credit player accounts and to prevent
                fraud, a unique identifier, in some cases your social network ID
                or Freeze Tag player ID, will be shared with the offer wall
                provider.
              </p>
              <strong>Third-Party Service Providers</strong>
              <p>
                We will share your information with third-party companies to
                perform services on our behalf, like processing payments,
                analyzing data, optimizing game play, e-mail delivery, hosting
                services, customer service and to help us in our marketing
                efforts, including managing and delivering contextual and
                tailored advertisements. We require these third-party service
                providers to maintain the confidentiality of the information we
                share with them, and we require them not use your information
                for anything other than to provide services on our behalf.
              </p>
              <strong>Sale or Merger</strong>
              <p>
                In the event that Freeze Tag undergoes a business transition
                (including proposed transactions), like a merger, acquisition by
                another company, or sale of all or part its assets (like selling
                a game), we may disclose or transfer all of your information,
                including personal information, to the successor organization in
                the transition. We will make reasonable efforts to let you and
                other players know (in the way described in Changes to Our
                Privacy Policy) of the business transition before transferring
                your personal information.
              </p>
              <p>
                <strong>
                  <u>
                    {">"}
                    {">"}How to Access, Update and Manage Your Information
                  </u>
                </strong>
              </p>
              <p>
                <strong>
                  Information We Receive From a Third-Party Application Where
                  You Play Our Games or From Your Mobile Device
                </strong>
              </p>
              <p>
                To manage the information Freeze Tag receives about you from a
                third-party application where you play our games, like Facebook,
                you will need to follow the instructions for the third-party
                application for updating your information and changing your
                privacy settings. The privacy management tools for applications
                on Facebook can be found here. To review and update information
                associated with your Freeze Tag game profile in certain games,
                visit the “settings” page in that game. You also can manage some
                aspects of information collection and use by visiting the
                “settings” page of your mobile device and reviewing the
                permissions of each application or “app.”
              </p>
              <p>
                Once Freeze Tag receives your information from a third-party
                application or your mobile device, that information is stored
                and used by Freeze Tag in accordance with this Privacy Policy.
                You may access and update that information as described below.
              </p>
              <strong>
                Accessing and Updating Your Information Held by Freeze Tag
              </strong>
              <p>
                If you want to review, delete, or change the information Freeze
                Tag has about you or have additional questions, e-mail us at
                privacy[a]freezetag.com. We will respond to your request within
                thirty days.
              </p>
              <strong>Stopping Use of Your Information</strong>
              <p>
                If you no longer want Freeze Tag to make active use of your
                information, you may send an e-mail to privacy[a]freezetag.com.
                Place “Delete My Account” in the subject line and include your
                first name, last name, e-mail address and your social network ID
                for the social network from which you access our Services (if
                applicable) in the body of the e-mail (for example, your
                Facebook user ID). We will respond to your request within thirty
                days. Please note that certain records, for example those
                relating to payments or customer service matters, will be held
                for legal and accounting purposes. If you have sent content
                through or posted content on the Service, we may not be able to
                delete it, but we will make every effort to remove an
                association of it from any personally identifiable information.
              </p>
              <strong>Opting Out of Geolocation</strong>
              <p>
                If you have previously allowed us to access your geolocation
                data, you can stop making geolocation available to us by
                visiting your mobile device’s settings for the relevant
                application or the “settings” page for the relevant game.
              </p>
              <p>
                For some games, such as Munzee, Garfield Go, WallaBee, Eventzee,
                and ZeeTours, if you do not allow us to us geolocation data, you
                will not be able to play the game.
              </p>
              <p>
                For some games, such as Garfield Go, which use an age gate and a
                parent authorization platform, parent permission to opt out of
                that game is controlled through the parent portal that we have
                setup.
              </p>
              <strong>Opting Out of Promotional Emails from Freeze Tag</strong>
              <p>
                If you want to stop receiving promotional e-mails from Freeze
                Tag, click on the “unsubscribe” link in any promotional email
                from Freeze Tag. Please note that once we receive your request,
                it may take an additional period of time for your opt-out to
                become effective. Your unsubscribe or e-mail preference change
                will be processed promptly, and in no event longer than ten
                business days.
              </p>
              <strong>Opting Out of Third-Party Tailored Advertising</strong>
              <p>
                If you are interested in more information about tailored
                advertising and your choices to prevent third parties from
                delivering tailored web and mobile web advertising you may visit
                the following websites:
              </p>
              <div className="list-area">
              <ul>
                <li>
                  <a href="http://www.networkadvertising.org/choices/">
                    Network Advertising Initiative Consumer Opt-Out Page
                  </a>
                  &nbsp;or the&nbsp;
                  <a href="http://www.aboutads.info/choices/">
                    Digital Advertising Alliance Opt-Out Page for U.S.-based
                    advertising
                  </a>
                  ; and
                </li>
                <li>
                  <a href="http://www.youronlinechoices.com/uk/your-ad-choices">
                    Your Online Choices UK website for EU-based advertising
                  </a>
                  .
                </li>
              </ul>
              </div>
              <p>
                These opt-out tools are provided by third parties, not Freeze
                Tag. Freeze Tag does not control or operate these tools or the
                choices that advertisers and others provide through these tools.
              </p>
              <p>
                In addition, if you do not want to receive tailored
                in-application advertisements from third parties that relate to
                your interests in apps on your mobile device, you may opt-out by
                adjusting the ad tracking settings on your device. You can also
                reset the “Advertising Identifier” (like an IDFA) from your
                mobile device’s settings page, which will prevent continued use
                of existing behavioral data tied to the previous “Advertising
                Identifier.” Further, depending on the platform provider (such
                as Apple or Google), you may be able to download apps, such as
                the Digital Advertising Alliance’s “AppChoices” app, that offer
                to provide you with control regarding the collection and use of
                cross-app data for tailored advertising. Like the opt-out tools
                mentioned above for web, these mobile opt-out tools are provided
                by third parties, not Freeze Tag. Freeze Tag does not control or
                operate these tools or the choices that advertisers and others
                provide through these tools.
              </p>
              <p>
                <strong>
                  <em>
                    Please note that you may still receive advertisements from
                    third parties within Freeze Tag’s games even if you opt out
                    of tailored advertising but they will not be based on your
                    activity across unrelated web sites or apps.
                  </em>
                </strong>
              </p>
              <p>
                <strong>Opting Out of Cookie Tracking</strong>
              </p>
              <p>
                You can set your web browser to warn you about attempts place
                cookies on your computer or limit the type of cookies you allow.
                Flash cookies operate differently than browser cookies and
                cookie management tools available in a web browser may not
                remove flash cookies. To learn more about and manage flash
                cookies you can visit the&nbsp;
                <a href="http://www.adobe.com/">Adobe website</a>&nbsp;and make
                changes at the&nbsp;
                <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager02.html">
                  Global Privacy Settings Panel
                </a>
                .
              </p>
              <p>
                If you disable cookies, you may lose some of the features and
                functionality of our Services because Freeze Tag cookies are
                necessary to track and enhance your game activities.
              </p>
              <p>
                <strong>
                  <u>
                    {">"}
                    {">"}Privacy Policies of Linked Third-Party Services and
                    Advertisers
                  </u>
                </strong>
              </p>
              <p>
                Our websites and games may contain advertisements from
                Third-Party Services, which are companies other than Freeze Tag
                that may link to their own websites, online services or mobile
                applications. We are not responsible for the privacy practices
                or the content of these Third-Party Services. If you have any
                questions about how these Third-Party Services use your
                information, you should review their policies and contact them
                directly.
              </p>
              <p>
                Here are a few of the more prevalent third-party service
                providers that may be used in our games:
              </p>
              <div className="list-area">
              <ul>
                <li>
                  DeltaDNA.&nbsp; For more information on DeltaDNA’s Privacy
                  Policy, please follow this link:{" "}
                  <a href="https://deltadna.com/privacy/">
                    https://deltadna.com/privacy/
                  </a>
                </li>
                <li>
                  Localytics. For more information on Localytics’ Privacy
                  Policy, please follow this link:&nbsp;{" "}
                  <a href="http://www.localytics.com/privacy-policy/">
                    http://www.localytics.com/privacy-policy/
                  </a>
                  .
                </li>
                <li>
                  Flurry. If you wish to opt-out from Flurry analytics, please
                  follow this link:&nbsp;
                  <a href="https://dev.flurry.com/secure/optOut.do">
                    https://dev.flurry.com/secure/optOut.do
                  </a>
                  .
                </li>
                <li>
                  Appsflyer. Also included in some games is a mobile ad tracking
                  and reporting tool by Appsflyer. &nbsp;For more information on
                  their privacy policy and information to opt-out of their
                  service, please follow this link: &nbsp;&nbsp;
                  <a href="https://www.appsflyer.com/optout/">
                    https://www.appsflyer.com/optout/
                  </a>
                  .
                </li>
                <li>
                  Chartboost.&nbsp; For more information on Chartboost’s Privacy
                  Policy, please follow this link:&nbsp;{" "}
                  <a href="https://answers.chartboost.com/hc/en-us/articles/200780269-Privacy-Policy">
                    https://answers.chartboost.com/hc/en-us/articles/200780269-Privacy-Policy
                  </a>
                </li>
                <li>
                  Google Firebase Analytics.&nbsp; For more information on
                  Google Firebase Analytics, please follow this link:&nbsp;{" "}
                  <a href="https://firebase.google.com/policies/analytics">
                    https://firebase.google.com/policies/analytics
                  </a>
                </li>
                <li>
                  Google Web Analytics.&nbsp; For more information on Google Web
                  Analytics, please follow this link:&nbsp;{" "}
                  <a href="https://policies.google.com/privacy?hl=en">
                    https://policies.google.com/privacy?hl=en
                  </a>
                </li>
                <li>
                  Google Ad Settings.&nbsp; For more information on Google Ad
                  Settings, please follow this link:&nbsp;{" "}
                  <a href="https://adssettings.google.com/">
                    https://adssettings.google.com/
                  </a>
                </li>
                <li>
                  AgeCheq.&nbsp; For more information on the service and privacy
                  policy associated with AgeCheq, please follow this link:&nbsp;{" "}
                  <a href="http://www.agecheq.com/?page_id=217">
                    http://www.agecheq.com/?page_id=217
                  </a>
                </li>
                <li>
                  Amazon Web Services (AWS):{" "}
                  <a href="https://aws.amazon.com/privacy/">
                    https://aws.amazon.com/privacy/
                  </a>
                </li>
                <li>
                  Facebook – We have integrated the Facebook SDK to facilitate
                  tracking advertising activities using the Facebook platform
                  and also to analyze aggregated data for our players
                </li>
              </ul>
              </div>
              <p>
                <strong>
                  <u>
                    {">"}
                    {">"}Our Policies Concerning Children
                  </u>
                </strong>
              </p>
              <p>
                Most of our websites and games are not for children under 13 and
                we do not knowingly collect any personal information from
                children under 13. Children under 13 should not use these
                websites or games at any time. If we learn that we have
                inadvertently gathered personal information from a child under
                13, we will take reasonable measures to promptly remove that
                information from our records.
              </p>
              <p>
                Freeze Tag provides games like Kitty Pawp, which are intended
                for users of all ages. In these games, Freeze Tag does not
                knowingly collect personal information (as that term is defined
                under the Children’s Online Privacy Protection Act (COPPA)) from
                users under the age of 13, except as permitted by COPPA. For
                example, Freeze Tag may collect persistent identifiers to
                support the internal operations of its games. If Freeze Tag
                learns that a child under the age of 13 has provided us with
                personal information that is not subject to a COPPA exception,
                Freeze Tag will delete such information.
              </p>
              <p>
                In addition, for our games that are location based, such as
                Garfield Go, we use a solution which requires parental
                permission to allow children under 13 to play. This permission
                is controlled through a web site, which allows the parents to
                revoke access to the game, and will also notify us if personal
                information needs to be removed from any of our databases. For
                information on having the information removed by us, please see
                section above, entitled, “Stopping Use of Your Information.”
                Please note, however, that if you refuse further collection of
                information, use, and/or disclosure of your personal
                information, you may not be able to access and use all or a
                portion of the game(s).
              </p>
              <p>
                <strong>
                  <u>
                    {">"}
                    {">"}How Long We Keep Your Information
                  </u>
                </strong>
              </p>
              <p>
                How long we retain your information depends on why we collected
                it and how we use it. We will not retain your personal
                information for longer than is necessary for our business
                purposes or for legal requirements. For instance, we may retain
                some information for a few years after you have closed your
                account with us if this is necessary to meet our legal
                obligations or to exercise, defend or establish legal rights.
              </p>
              <p>
                {" "}
                <strong>
                  <u>
                    {">"}
                    {">"}Security of Your Information
                  </u>
                </strong>
              </p>
              <p>
                We implement commercially reasonable physical, managerial, and
                technical security measures to help protect the security of your
                information both online and offline. We take steps to ensure
                that your data is treated securely and in accordance with this
                Privacy Policy. These measures vary based upon the sensitivity
                of your information.
              </p>
              <p>
                If you have an account registered directly with Freeze Tag, your
                profile information is protected by the password you use to
                access your Freeze Tag account. It is important that you protect
                and maintain your Freeze Tag account’s security and that you
                immediately tell us of any unauthorized use of your account. If
                you forget the password to your Freeze Tag account, the Service
                allows you to request that instructions be sent to you that
                explain how to reset your password. If you access our Services
                through a social network and your social network account is
                hacked, this may lead to someone playing your Freeze Tag games
                without your permission. So, be careful to keep your social
                network account information, including your social network
                account password, secure as well. We urge you to log out of your
                Freeze Tag account and any social network account you have used
                to access our Services after you use it.
              </p>
              <p>
                While we take precautions against possible security breaches of
                our Services and our customer databases and records, no website
                or Internet transmission is completely secure. We cannot
                guarantee that unauthorized access, hacking, data loss, or other
                breaches will never occur, and we cannot guarantee the security
                of your information while it is being transmitted to our
                Service. Any transmission is at your own risk. If you have
                questions about the security of our websites, please contact us
                at privacy[a]freezetag.com.
              </p>
              <p>
                If Freeze Tag learns of a security systems breach, then we may
                attempt to notify you electronically so that you can take
                appropriate protective steps. Freeze Tag may post a notice on
                the Freeze Tag Services if a security breach occurs. Depending
                on where you live, you may have a legal right to receive notice
                of a security breach in writing.
              </p>
              <strong>
                <u>
                  {">"}
                  {">"}Munzee API and Third-Party Developers
                </u>
              </strong>
              <p>
                To assist in the creation and development of third-party mobile
                applications and other software for our Munzee game, we permit
                certain authorized third-parties to access our application
                program interface. These third-party developers are first
                authorized by Freeze Tag and must agree to Freeze Tag’s Terms of
                Services. Freeze Tag DISCLOSES the following User information to
                third-parties: usernames, Profile Information, Location
                Information, avatar image, date of creation of User account(s),
                account activity, expiration date of account, membership status,
                score and rank status, game piece geolocation information,
                leaderboard status, and clan information. (“Munzee API”) Freeze
                Tag DOES NOT DISCLOSE the following User information to
                third-parties: name, email address, date of birth, account
                password, OAuth token, and payment information. Freeze Tag
                reserves the right to modify the Munzee API
              </p>
              <strong>
                <u>
                  {">"}
                  {">"}Eventzee EDU Clause
                </u>
              </strong>
              <p>
                If you or your educational institute is participating in the
                Eventzee EDU scavenger hunt program certain sections of the
                Munzee Terms of Service do not apply. The safety of students’
                personal information is extremely important to our company, so
                the following are addendums when playing Eventzee through the
                EDU program.
              </p>
              <div className="list-area">
              <ul>
                <li>Eventzee EDU can be played by anyone of any age.</li>
                <li>
                  Eventzee EDU student accounts are anonymously created by
                  approved educational professionals. These accounts do not
                  require any personal information such as names or email
                  addresses.
                </li>

                <li>
                  No one but the assigned educational professionals have access
                  to the photos taken during Eventzee EDU photo scavenger hunts.
                  The data from the Eventzee EDU program is not shared with
                  anyone outside of the client’s school, district, campus, etc.
                  This information is not publicly available.
                </li>
                <li>
                  Eventzee EDU admins are approved educational professionals.
                  These admins take sole responsibility for any information they
                  share.
                </li>

                <li>
                  Eventzee EDU photo scavenger hunt submissions are added to a
                  gallery, but it is the responsibility of the approved
                  educational professional whether or not they share the
                  gallery.
                </li>
                <li>
                  As a secondary source of protection, SSL (Secure Socket Layer)
                  ensures all Eventzee traffic from within the Eventzee
                  application or Eventzee website to the servers is completely
                  secure. Any photos, clue descriptions, or other sensitive
                  information will not be accessible from outside parties.
                </li>
              </ul>
              </div>
              <strong>
                <u>
                  {">"}
                  {">"}International Visitors
                </u>
              </strong>
              <p>
                The Freeze Tag Services are hosted in the United States. If you
                are using the Freeze Tag Services from the European Union or
                other regions with laws governing data collection and use that
                may differ from U.S. law, then please note that you are
                transferring your personal data to the United States and by
                providing your personal data you consent to that transfer.
              </p>
              <p>
                {" "}
                <strong>
                  <u>
                    {">"}
                    {">"}Changes to Our Privacy Policy
                  </u>
                </strong>
              </p>
              <p>
                If we decide to make material changes to our Privacy Policy, we
                will tell you and other players by placing a notice on
                freezetag.com or its equivalent in-game, or by sending you a
                notice to the e-mail address we have on file for you prior to
                the change becoming effective. We may supplement this process by
                placing notices on game blogs, social network pages, and/or
                forums and on other Freeze Tag websites. You should periodically
                check&nbsp;
                <a href="https://www.freezetag.com/">
                  https://www.freezetag.com/
                </a>
                &nbsp;and this privacy page for updates.
              </p>
              <p>
                {" "}
                <strong>
                  <u>
                    {">"}
                    {">"}Contact Us
                  </u>
                </strong>
              </p>
              <p>
                If you have any questions, comments or concerns regarding our
                Privacy Policy and/or practices, please send an e-mail to
                privacy[a]freezetag.com. All other inquiries should be directed
                to&nbsp;
                <a href="https://freezetag.zendesk.com/hc/en-us/requests/new">
                  Freeze Tag’s Support Page
                </a>
                .
              </p>
              <p>
                You may also write to:
                <br />
                Freeze Tag, Inc.
                <br />
                ATTN: Data Protection Officer
                <br />
                18062 Irvine Blvd., Suite 103
                <br />
                Tustin, CA 92780
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
