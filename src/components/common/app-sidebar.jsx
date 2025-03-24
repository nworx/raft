import { Calendar, Home, IceCreamCone, IceCreamConeIcon, Inbox, Search, Settings, SprayCanIcon, SquareActivityIcon, User2Icon } from "lucide-react"
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
import { Tab_Type } from "@/constant/tabTypes"
import { useRouter } from "next/navigation";
// import { Tab_Type } from "@/constants/tab_type"





 

// Menu items.


export function AppSidebar({setTabType}) {

  const router=useRouter();

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
    {
      title: "Profile",
      url: "/profile",
      icon: User2Icon,
      state: Tab_Type.PROFILE
    },
  ]


  const sayHello=()=>{

  } 

  const renderComponent = (tabType) => {
    switch (tabType) {
      case Tab_Type.ALL_PROJECTS:{
        router.push("/projects")
        return ;
      }
      case Tab_Type.PROFILE:{
        router.push("/profile")
        break ;
      }
      default:
        return <DefaultComponent />; // Fallback component
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Raft</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="cursor-pointer">
              {items.map((item,index) => (
                <SidebarMenuItem key={item.title} onClick={()=>renderComponent(item?.state)}>
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
