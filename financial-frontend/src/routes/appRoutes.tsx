import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import { RouteType } from "./config";
import DashboardPageLayout from "../modules/pages/dashboard/DashboardPageLayout";
import DashboardIndex from "../modules/pages/dashboard/DashboardIndex";

import ComponentPageLayout from "../modules/pages/component/ComponentPageLayout";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import SearchPageLayout from "../modules/pages/search/SearchPageLayout";
import PersonScreen from "../modules/pages/search/PersonScreen";
import ReportScreen from "../modules/pages/reports/searchReport";
import AddReportScreen from "../modules/pages/reports/addReport";
import ReportRulesScreen from "../modules/pages/reports/searchReport/rules";
import CatagoryScreen from "../modules/pages/catagory";
import AddPerson from "../modules/pages/person/add";
import { PersonInitialData } from "../utils/personUtils";
import HomeboardPageLayout from "../modules/pages/dashboard/HomeboardPageLayout";
import AdminScreen from "../modules/pages/admin";
import SpecialReportScreen from "../modules/pages/reports/searchReport/special";
import TrainingReportScreen from "../modules/pages/reports/searchReport/training";
import ArchiveReportScreen from "../modules/pages/reports/searchReport/archive";
import NewsPaperScreen from "../modules/pages/reports/searchReport/newspaper";
import GalleryScreen from "../modules/pages/gallery";
import {
  ArchiveOutlined,
  PhotoAlbum,
  PostAddOutlined,
} from "@mui/icons-material";
import GallaryPreviewScreen from "../modules/pages/gallery/gallaryPreview";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/reducer";
import { User } from "../../typings/structures";
import { bolToRole } from "../utils/convertions";

const AppRoutesData = () => {
  const user = useSelector((state: RootState) => state.currentUser.user);
  const appRoutes = makeRoute(user);

  useEffect(() => {}, []);
  return { appRoutes };
};

export default AppRoutesData;

const makeRoute = (user: User | null) => {
  const role = bolToRole(user);
  let routeList: RouteType[] = [
    {
      index: true,
      element: <HomeboardPageLayout />,
      state: "home",
    },
    {
      path: "/dashboard",
      element: <DashboardIndex />,
      state: "dashboard",
      sidebarProps: {
        displayText: "Dashboard",
        icon: <DashboardOutlinedIcon />,
      },
    },
    {
      path: "/search",
      element: <SearchPageLayout />,
      state: "search",
      sidebarProps: {
        displayText: "Search",
        icon: <SearchOutlinedIcon />,
      },
      child: [
        {
          index: true,
          element: <DashboardIndex />,
          state: "search.index",
        },
        {
          path: "/search/person",
          element: <PersonScreen />,
          state: "search.person",
          sidebarProps: {
            displayText: "Person",
          },
        },
        {
          path: "/search/reports",
          element: <ReportScreen catagory="Simple Report" />,
          state: "search.reports",
          sidebarProps: {
            displayText: "Simple Reports",
          },
        },
        {
          path: "/search/specialreport",
          element: <SpecialReportScreen catagory="Special Report" />,
          state: "search.specialreport",
          sidebarProps: {
            displayText: "Special Report",
          },
        },
      ],
    },
    {
      path: "/portal",
      element: <ComponentPageLayout />,
      state: "portal",
      sidebarProps: {
        displayText: "Knowledge portal",
        icon: <AddReactionOutlinedIcon />,
      },
      child: [
        {
          path: "/portal/training",
          element: <TrainingReportScreen catagory="Training" />,
          state: "portal.training",
          sidebarProps: {
            displayText: "Training",
          },
        },
        {
          path: "/portal/rules_laws",
          element: <ReportRulesScreen catagory="Rules and laws" />,
          state: "portal.rules_laws",
          sidebarProps: {
            displayText: "Rules and laws",
          },
        },
        {
          path: "/portal/newspaper",
          element: <NewsPaperScreen catagory="Newspaper" />,
          state: "portal.newspaper",
          sidebarProps: {
            displayText: "Newspaper",
          },
        },
      ],
    },
    {
      path: "/photo_gallery",
      element: <GallaryPreviewScreen />,
      state: "photo_gallery",
      sidebarProps: {
        displayText: "Photo gallery",
        icon: <PhotoAlbum />,
      },
    },
    {
      path: "/archive",
      element: <ArchiveReportScreen catagory="Archive" />,
      state: "archive",
      sidebarProps: {
        displayText: "Archive",
        icon: <ArchiveOutlined />,
      },
    },
    {
      path: "/entryforms",
      element: <DashboardPageLayout />,
      state: "entryforms",
      sidebarProps: {
        displayText: "Entryforms",
        icon: <PostAddOutlined />,
      },
      child: [
        {
          index: true,
          element: <DashboardIndex />,
          state: "entryforms.index",
        },
        {
          path: "/entryforms/person",
          element: (
            <AddPerson
              reRender={() => {}}
              state={1}
              keyData={PersonInitialData}
              updateIds={null}
            />
          ),
          state: "entryforms.person",
          sidebarProps: {
            displayText: "Person",
          },
        },
        {
          path: "/entryforms/reports",
          element: <AddReportScreen />,
          state: "entryforms.report",
          sidebarProps: {
            displayText: "Report",
          },
        },
        {
          path: "/entryforms/catagory",
          element: <CatagoryScreen />,
          state: "entryforms.catagory",
          sidebarProps: {
            displayText: "Catagory",
          },
        },
        {
          path: "/entryforms/gallary",
          element: <GalleryScreen />,
          state: "entryforms.gallary",
          sidebarProps: {
            displayText: "Gallary",
          },
        },
      ],
    },
    {
      path: "/access",
      element: <AdminScreen />,
      state: "admin",
      sidebarProps: {
        displayText: "Admin",
        icon: <SupervisorAccountOutlinedIcon />,
      },
    },
  ];

  if (role < 7) {
    if (routeList[7]) {
      delete routeList[7];
    }
  }
  if (role === 5) {
    if (routeList[2].child) {
      delete routeList[2].child[3];
    }
  }
  return routeList;
};
