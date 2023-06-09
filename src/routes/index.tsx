import * as React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import PublicLayout from "../layout/public";
import HomePageLoggedInLayout from "../layout/HomePageLoggedInLayout";
import {
  Login,
  Error404,
  Download,
  ForgotPassword,
  Game,
  HomePage,
  TermsOfService,
  CompanyContactPage,
  CompanyAboutPage,
  CompanyTeamPage,
  AuthorizedRetail,
  PlaySafe,
  PrivacyPolicy,
  AllPointsTotal,
  AllPointsDeploy,
  AllPointsCapture,
  AllPointsCapon,
  PhysicalPointsTotal,
  PhysicalPointsDeploy,
  PhysicalPointsCapture,
  PhysicalPointsCapon,
  VirtualPointsTotal,
  VirtualPointsDeploy,
  VirtualPointsCapture,
  VirtualPointsCapon,
  Specials,
  Social,
  SocialOwn,
  BlastCaptures,
  ActivityFeed,
  EntriesFeed,
  PhotosFeed,
  Captures,
  Credits,
  Deployed,
  Friends,
  ZeeQRewStatus,
  MaintenanceMode,
  PhotoGallery,
  Referral,
  Create,
  Kennel,
  UserProfileSettings,
  DiscoveredCoins,
  OwnCoins,
  RedeemCodePage,
  KennelTransport,
  ArchivedPage,
  UndeploysPage,
  BatchPrint,
  MapPage,
  Munzees,
  MunzeesSocial,
  Clans,
  ViewMessagesPage,
  EventIndicatorMap,
  Points,
  Players,
  Types,
  EventIndicatorPage,
  ProfilePage,
  DiscoveredRequest,
  Rovers,
  EventPage,
  BadgesPage,
  PlayerDay,
  MunzeeActivityPage,
  MunzeeEditPage,
  PlacesPage,
  SpecialsPage,
  GardensPage,
  EmbedPage,
  MunzeeLocationEditPage,
  MunzeeConvertPage,
  StatzeeMunzeePage,
} from "../screens";
import PublicRoute from "./public-route";
import BatchPrintQrcode from "../screens/BatchPrintQrcode";
import MunzeePrint from "../screens/MunzeePrint";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <PublicRoute component={PublicLayout} />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgotpassword",
          element: <ForgotPassword />,
        },
        {
          path: "download",
          element: <Download />,
        },
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "game",
          element: <Game />,
        },
        {
          path: "retail",
          element: <AuthorizedRetail />,
        },
        {
          path: "terms",
          element: <TermsOfService />,
        },
        {
          path: "company/about",
          element: <CompanyAboutPage />,
        },
        {
          path: "company/team",
          element: <CompanyTeamPage />,
        },
        {
          path: "company/contact",
          element: <CompanyContactPage />,
        },
        {
          path: "playsafe",
          element: <PlaySafe />,
        },
        {
          path: "privacy",
          element: <PrivacyPolicy />,
        },
        {
          path: "referral",
          element: <Referral />,
        },
        {
          path: "settings",
          element: <UserProfileSettings />,
        },
        {
          path: "redeem",
          element: <RedeemCodePage />,
        },
        {
          path: "clans",
          element: <Clans />,
        },
        {
          path: "types",
          element: <Types />,
        },
        {
          path: "places",
          element: <PlacesPage />,
        },
        {
          path: "embed",
          element: <EmbedPage />,
        },
        {
          path: "gardens",
          element: <GardensPage />,
        },
        {
          path: "specials",
          element: <SpecialsPage />,
        },
        {
          path: "player/day/:date",
          element: <PlayerDay />,
        },
        {
          path: "m/some-event/event-id",
          element: <EventPage />,
        },
        {
          path: "m",
          element: <PublicRoute component={HomePageLoggedInLayout} />,
          children: [
            {
              path: ":id",
              element: <ProfilePage />,
            },
            {
              path: "EventIndicator",
              element: <EventIndicatorPage />,
            },
            {
              path: ":id/feed",
              element: <ActivityFeed />,
            },
            {
              path: ":id/entries",
              element: <EntriesFeed />,
            },
            {
              path: ":id/photos",
              element: <PhotosFeed />,
            },
            {
              path: ":id/specials",
              element: <Specials />,
            },
            {
              path: ":id/socials",
              element: <Social />,
            },
            {
              path: ":id/socials/own",
              element: <SocialOwn />,
            },
            {
              path: ":id/blasts",
              element: <BlastCaptures />,
            },
            {
              path: ":id/zeeqrew",
              element: <ZeeQRewStatus />,
            },
            {
              path: ":id/maintenance",
              element: <MaintenanceMode />,
            },
            {
              path: ":id/gallery",
              element: <PhotoGallery />,
            },
            {
              path: ":id/captures",
              element: <Captures />,
            },
            {
              path: ":id/deploys",
              element: <Deployed />,
            },
            {
              path: ":id/kennel",
              element: <Kennel />,
            },
            {
              path: ":id/kennel/transported",
              element: <KennelTransport />,
            },
            {
              path: ":id/coins",
              element: <OwnCoins />,
            },
            {
              path: ":id/coins/discovered",
              element: <DiscoveredCoins />,
            },
            {
              path: ":id/coins/requests",
              element: <DiscoveredRequest />,
            },
            {
              path: ":id/archived",
              element: <ArchivedPage />,
            },
            {
              path: ":id/undeploys/:page?/type?/:type?",
              element: <UndeploysPage />,
            },
            {
              path: ":id/:munzeeId/:code?",
              element: <MunzeeActivityPage />,
            },
            {
              path: ":id/:munzeeId/admin/print",
              element: <MunzeePrint />,
            },
            {
              path: ":id/:munzeeId/admin",
              element: <MunzeeEditPage />,
            },
            {
              path: ":id/:munzeeId/admin/map",
              element: <MunzeeLocationEditPage />,
            },
            {
              path: ":id/:munzeeId/admin/convert",
              element: <MunzeeConvertPage />,
            },
            {
              path: ":id/badges",
              element: <BadgesPage />,
            },
          ],
        },
        {
          path: "m/EventIndicator/map/deploys/",
          element: <EventIndicatorMap />,
        },
        {
          path: "print",
          element: <BatchPrint />,
        },
        {
          path: "credits",
          element: <Credits />,
        },
        {
          path: "friends",
          element: <Friends />,
        },
        {
          path: "create",
          element: <Create />,
        },
        {
          path: "map",
          element: <MapPage />,
        },
        {
          path: "statzee",
          element: <StatzeeMunzeePage />,
        },
        {
          path: "leaderboard/rovers",
          element: <Rovers />,
        },
        {
          path: "leaderboard/referral",
          children: [
            {
              path: "points",
              element: <Points />,
            },
            {
              path: "players",
              element: <Players />,
            },
          ],
        },
        {
          path: "/leaderboard/munzees/",
          children: [
            { path: "", element: <Munzees /> },
            {
              path: "social",
              element: <MunzeesSocial />,
            },
          ],
        },
        {
          path: "flows",
          element: <ViewMessagesPage />,
        },
        {
          path: "/leaderboard/players",
          children: [
            {
              path: "all/total",
              element: <AllPointsTotal />,
            },
            {
              path: "all/capture",
              element: <AllPointsCapture />,
            },
            {
              path: "all/deploy",
              element: <AllPointsDeploy />,
            },
            {
              path: "all/capon",
              element: <AllPointsCapon />,
            },
            {
              path: "physical/total",
              element: <PhysicalPointsTotal />,
            },
            {
              path: "physical/capture",
              element: <PhysicalPointsCapture />,
            },
            {
              path: "physical/deploy",
              element: <PhysicalPointsDeploy />,
            },
            {
              path: "physical/capon",
              element: <PhysicalPointsCapon />,
            },
            {
              path: "virtual/total",
              element: <VirtualPointsTotal />,
            },
            {
              path: "virtual/capture",
              element: <VirtualPointsCapture />,
            },
            {
              path: "virtual/deploy",
              element: <VirtualPointsDeploy />,
            },
            {
              path: "virtual/capon",
              element: <VirtualPointsCapon />,
            },
          ],
        },
      ],
    },
    { path: "404", element: <Error404 /> },
    { path: "print/code", element: <BatchPrintQrcode /> },
    {
      path: "*",
      element: <Navigate to="/404" />,
    },
  ]);
};

export default Routes;
