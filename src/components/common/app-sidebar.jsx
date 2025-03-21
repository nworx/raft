import { Calendar, Home, IceCreamCone, IceCreamConeIcon, Inbox, Search, Settings, SprayCanIcon, SquareActivityIcon } from "lucide-react"
import {useState} from "react"
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
import { Router, useRouter } from "next/router"
import { Tab_Type } from "@/constants/tab_type"





 

// Menu items.


export function AppSidebar({setTabType}) {

  const setTabTypeFunc=(tabType)=>{
    setTabType(tabType);
  }

  const items = [
    {
      title: "Projects",
      url: "/projects",
      icon: SquareActivityIcon,
      state: Tab_Type.ALL_PROJECTS
    },
    {
      title: "My tasks",
      url: "#signIn",
      icon: SprayCanIcon,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]


  const sayHello=()=>{

  } 

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Didimos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item,index) => (
                <SidebarMenuItem key={item.title} onClick={()=>setTabTypeFunc(item?.state)}>
                  <SidebarMenuButton asChild>
                    {/* <a href={item.url}> */}
                    <div>
                      <item.icon />
                      <span>{item.title}</span>
                    </div>
                    {/* </a> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
