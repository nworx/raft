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
// import { Tab_Type } from "@/constants/tab_type";
import AllProjectsMain from "../projectList/AllProjectsMain";
import { useRouter } from "next/navigation";
import { Tab_Type } from "@/constant/tabTypes";

const LeftNavbar = ({children}) => {
  //const [isCollapsed, setIsCollapsed] = useState(false);
    const [tabType,setTabType] = useState(Tab_Type.ALL_PROJECTS||"");

    

  

  return (
    <SidebarProvider>
      <AppSidebar  />
      <main style={{width:"100%"}}>
        <SidebarTrigger />
        {
          children
        }
        
      </main>
    </SidebarProvider>
  );
};

export default LeftNavbar;

