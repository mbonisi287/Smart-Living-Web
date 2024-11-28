import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import { AddReaction, Article, AttachMoney, EngineeringTwoTone, Handshake, HolidayVillage, HouseTwoTone, HowToRegTwoTone, PeopleAltRounded, PeopleTwoTone, ReportProblem } from '@mui/icons-material';
 
export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        icon: <AttachMoney/>,
        text: "Rentals",
        link: "Rentals/rentals"
    },
    {
        id: 2,
        icon: <HomeIcon/>,
        text: "Apartments",
        link: "Apartments/apartmentDescription"
    },
    {
        id: 3,
        icon: <HolidayVillage/>,
        text: "Allocated Units",
        link: "Apartments/allocatedUnits"

    },
    {
        id: 4,
        icon: <Handshake/>,
        text: "Lease Agreements",
        link: "LeaseAgreement/leaseAgreement"
    }, 
    {
        id: 5,
        icon: <HowToRegTwoTone/>,
        text: "Credit Applications",
        link: "CreditApplications/creditapplications"
    },
    {
        id: 6,
        icon: <AddReaction/>,
        text: "New Applicants",
        link: "Tenant/newtenant"
    },
    {
        id: 7,
        icon: <EngineeringTwoTone/>,
        text: "Maintenance Jobs",
        link: "Maintenance/maintenance"
    },
    {
        id: 8,
        icon: <HouseTwoTone/>,
        text: "Club House",
        link: "Clubhouse/clubhouse"
    }, 
    {
        id: 9,
        icon: <ReportProblem/>,
        text: "Complaints",
        link: "Complaints/complaints"
    },
    {
        id: 10,
        icon: <PeopleTwoTone/>,
        text: "Visitor Reports",
        link: "Visitors/visitors"
    },
    {
        id: 11,
        icon: <PeopleAltRounded/>,
        text: "Profile",
        link: "UserProfile/profileDetails"
    }
]