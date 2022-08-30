import React, { useState } from "react";
import { ModelDashBoard } from "../components/ModelDashBoard/ModelDashBoard";
import { MainSidebar } from "../components/MainSideBar/MainSidebar"

const MainLayout = () => {
    const [isOpen, setMenu] = useState(false);
    const [isDashboardOpen, setDashboard] = useState(false);
  
    return (
        <>
            <MainSidebar
                isOpen={isOpen} 
                setMenu={setMenu} 
                isDashboardOpen={isDashboardOpen} 
                setDashboard={setDashboard}
            />
            <ModelDashBoard
                isDashboardOpen={isDashboardOpen}
            />
        </>
    )
}

export default MainLayout;