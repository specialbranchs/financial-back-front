import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { RouteType } from './config';
import DashboardPageLayout from '../modules/pages/dashboard/DashboardPageLayout';
import DashboardIndex from '../modules/pages/dashboard/DashboardIndex';

import ComponentPageLayout from '../modules/pages/component/ComponentPageLayout';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import BrowserUpdatedOutlinedIcon from '@mui/icons-material/BrowserUpdatedOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import SearchPageLayout from '../modules/pages/search/SearchPageLayout';
import PersonScreen from '../modules/pages/search/PersonScreen';
import ReportScreen from '../modules/pages/reports/searchReport';
import AddReportScreen from '../modules/pages/reports/addReport';
import ReportRulesScreen from '../modules/pages/reports/searchReport/rules';
import CatagoryScreen from '../modules/pages/catagory';
import AddPerson from '../modules/pages/person/add';
import { PersonInitialData } from '../utils/personUtils';
import HomeboardPageLayout from '../modules/pages/dashboard/HomeboardPageLayout';
import AdminScreen from '../modules/pages/admin';
import { AccessUser } from '../utils/directUser';
import SpecialReportScreen from '../modules/pages/reports/searchReport/special';
import TrainingReportScreen from '../modules/pages/reports/searchReport/training';
import ArchiveReportScreen from '../modules/pages/reports/searchReport/archive';

const user=AccessUser()
const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomeboardPageLayout />,
    state: "home"
  },
  {
    path: "/dashboard",
    element: <DashboardIndex />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardOutlinedIcon />
    }
  },
  {
    path: "/search",
    element: <SearchPageLayout />,
    state: "search",
    sidebarProps: {
      displayText: "Search",
      icon: <SearchOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "search.index"
      },
      {
        path: "/search/person",
        element: <PersonScreen />,
        state: "search.person",
        sidebarProps: {
          displayText: "Person"
        },
      },
      {
        path: "/search/reports",
        element: <ReportScreen catagory="Simple Report"/>,
        state: "search.reports",
        sidebarProps: {
          displayText: "Simple Reports"
        }
      },
      {
        path: "/search/specialreport",
        element: <SpecialReportScreen catagory="Special Report"/>,
        state: "search.specialreport",
        sidebarProps: {
          displayText: "Special Report"
        }
      }
    ]
  },
  {
    path: "/portal",
    element: <ComponentPageLayout />,
    state: "portal",
    sidebarProps: {
      displayText: "Knowledge portal",
      icon: <AddReactionOutlinedIcon />
    },
    child: [
      
      {
        path: "/portal/training",
        element: <TrainingReportScreen catagory="Training"/>,
        state: "portal.training",
        sidebarProps: {
          displayText: "Training"
        },
      },
      {
        path: "/portal/rules_laws",
        element: <ReportRulesScreen catagory="Rules and laws"/>,
        state: "portal.rules_laws",
        sidebarProps: {
          displayText: "Rules and laws"
        }
      }
    ]
  },
  {
    path: "/archive",
    element: <ArchiveReportScreen catagory="Archive"/>,
    state: "archive",
    sidebarProps: {
      displayText: "Archive",
      icon: <BrowserUpdatedOutlinedIcon />
    }
  },
  {
    path: "/entryforms",
    element: <DashboardPageLayout />,
    state: "entryforms",
    sidebarProps: {
      displayText: "Entryforms",
      icon: <DrawOutlinedIcon />
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: "entryforms.index"
      },
      {
        path: "/entryforms/person",
        element: <AddPerson reRender={()=>{}} state={1} keyData={PersonInitialData} updateIds={null}/>,
        state: "entryforms.person",
        sidebarProps: {
          displayText: "Person"
        },
      },
      {
        path: "/entryforms/reports",
        element: <AddReportScreen />,
        state: "entryforms.report",
        sidebarProps: {
          displayText: "Report"
        }
      },
      {
        path: "/entryforms/catagory",
        element: <CatagoryScreen />,
        state: "entryforms.catagory",
        sidebarProps: {
          displayText: "Catagory"
        }
      }
    ]
  },
 {
    path: "/admin",
    element: <AdminScreen />,
    state: "admin",
    sidebarProps: {
      displayText: "Admin",
      icon: <SupervisorAccountOutlinedIcon />
    }
    
  }
];

export default appRoutes;