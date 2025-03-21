import LeftNavbar from "../common/LeftNavbar";
import KanbanBoard from "../KanbanBoard/KanbanBoard";

const SideNavbarLayout = ({ children }) => {
    return ( <>
       {/* <div className="flex"> */}
        <LeftNavbar>
        {children}
        </LeftNavbar>
        {/* <KanbanBoard/> */}
        {/* <main className="flex-1  h-screen max-h-screen overflow-y-auto transition-all"> */}
        {/* </main> */}
       {/* </div> */}
      </>
       );
  };
  
  export default SideNavbarLayout;