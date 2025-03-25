import { Calendar, Home, IceCreamCone, IceCreamConeIcon, Inbox, Search, Settings, SprayCanIcon, SquareActivityIcon, User2Icon } from "lucide-react"
import {useState,useEffect} from "react"
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
  const [currentUrl,setCurrentUrl]=useState("");

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
      url: "/dashboard",
      icon: SprayCanIcon,
      state: Tab_Type.MY_TASK
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
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings,
    // },
    {
      title: "Profile",
      url: "/profile",
      icon: User2Icon,
      state: Tab_Type.PROFILE
    },
  ]


  const sayHello=()=>{

  } 

  const renderComponent = (item) => {
    if(item?.url)router.push(item?.url);
    
    // switch (tabType) {
    //   case Tab_Type.ALL_PROJECTS:{
    //     router.push("/projects")
    //     return ;
    //   }
    //   case Tab_Type.PROFILE:{
    //     router.push("/profile")
    //     break ;
    //   }
    //   case Tab_Type.MY_TASK:{
    //     router.push("/dashboard")
    //     break ;
    //   }
    //   default:
    //     router.push("/dashboard")
    //     break ;
        
    // }
  };

  useEffect(()=>{
    setCurrentUrl(window.location.pathname||""); 
  },[])

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Raft</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="cursor-pointer">
              {items.map((item,index) => (
                <SidebarMenuItem key={item.title} style={{
                  color:currentUrl== item?.url?"white":"black",
                  backgroundColor:currentUrl== item?.url?"black":"white"
                  }} onClick={()=>renderComponent(item)}>
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
