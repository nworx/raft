"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Home, Inbox, Search,  Settings, User, Menu, X, } from "lucide-react"; // Using Lucide Icons
// import { Cube } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Ensure you have a utility function for classnames

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/common/app-sidebar"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Tab_Type } from "@/constants/tab_type";
import AllProjectsMain from "../projectList/AllProjectsMain";

const LeftNavbar = ({children}) => {
  //const [isCollapsed, setIsCollapsed] = useState(false);
    const [tabType,setTabType] = useState(Tab_Type.ALL_PROJECTS||"");

    const renderComponent = () => {
      switch (tabType) {
        case Tab_Type.ALL_PROJECTS:{
          console.log("rajjjjjj")
          return <AllProjectsMain/>;
        }
        case "tab2":
          return <TabTwoComponent />;
          break;
        default:
          return <DefaultComponent />; // Fallback component
      }
    };

  

  return (
    <SidebarProvider>
      <AppSidebar setTabType={setTabType} />
      <main style={{width:"100%"}}>
        <SidebarTrigger />
        {
          children?
          children
          :
          renderComponent()
        }
        
      </main>
    </SidebarProvider>
  );
};

export default LeftNavbar;

