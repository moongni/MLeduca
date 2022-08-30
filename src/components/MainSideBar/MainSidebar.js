import React, { useState } from 'react';
import { IoMdAnalytics } from "react-icons/io";
import { AiFillCaretDown, AiOutlineLineChart, AiOutlineMenu, AiOutlineArrowLeft, AiOutlineControl } from "react-icons/ai"
import { FaFileExport } from "react-icons/fa"
import { RiComputerLine } from "react-icons/ri"
import { FiDatabase } from "react-icons/fi";
import { GoTriangleRight } from "react-icons/go"
import { MdOutlineToc } from "react-icons/md"
import { Link } from 'react-router-dom';
import sidebars from '../../data/sidebarData.json';
import './MainSidebar.css';

export const MainSidebar = (props) => {
    const [isShowMenu1, setShowMenu1] = useState(false);
    const [isShowMenu2, setShowMenu2] = useState(false);

    const Icon = props => {
        switch (props.icon){
            case 'IoMdAnalytics': return <IoMdAnalytics/>
            case 'AiOutlineLineChart': return <AiOutlineLineChart/>
            case 'FaFileExport': return <FaFileExport/>
            case 'GoTriangleRight': return <GoTriangleRight/>
            case 'AiOutlineControl': return <AiOutlineControl/>
            case 'FiDatabase': return <FiDatabase/>
            case 'MdOutlineToc': return <MdOutlineToc/>
            default: return null
        }
    };

    const isShowMenu = props => {
        switch (props){
            case "isShowMenu1": return isShowMenu1
            case "isShowMenu2": return isShowMenu2
            default: return null
        }
    };
    
    const setShowMenu = props => {
        switch (props) {
            case "isShowMenu1": return setShowMenu1(!isShowMenu1)
            case "isShowMenu2": return setShowMenu2(!isShowMenu2)
            default: return ()=>{}
        }
    }
    return (
        <div className='p-0 m-0 box-border'>
            <div className={`${props.isOpen? "sidebar": "sidebar close"} fixed top-0 left-0 h-full 
            bg-white border-solid border-r-2 shadow-sm shadow-slate-200 ease-in-out duration-300 z-30`}
            >
                <Link className="logo-details cursor-pointer" to='/'>
                    <i ><RiComputerLine/></i>
                    <span className='logo_name'>Deep learning</span>
                </Link>
                <ul className='nav-links'>
                    {sidebars.sidebarLinkName
                        .map(sidebar => {
                            const clsName = sidebar.subLinkName.length > 0? isShowMenu(sidebar.clsName): true;
                            return (
                                <li className={clsName? "showMenu" : ""}>
                                    <div className='icon-link'>
                                        <Link to={sidebar.link}
                                        onClick={()=> setShowMenu(sidebar.clsName)}>
                                            <i><Icon icon={sidebar.icon}></Icon></i>
                                            <span className='link-name'>{sidebar.name}</span>
                                            {sidebar.subLinkName.length > 0 && <i className='down ml-auto'><AiFillCaretDown /></i>}
                                        </Link>
                                    </div>
                                    <ui className='sub-menu'>
                                        <li>
                                            <Link className='submenu-name' to={sidebar.link}>{sidebar.name}</Link>
                                        </li>
                                        {sidebar.subLinkName.map(sub => {
                                            return (
                                                <li><Link to={sub.link}>{sub.name}</Link></li>
                                            )
                                        })}
                                    </ui>
                                </li>
                    )})}
                </ul>
            </div>
            <section className='home-section border-solid border-b-2 shadow-sm shadow-slate-200 ease-in-out duration-300'>
                <div className='home-content'>
                    <i className="cursor-pointer" onClick={()=> props.setMenu(!props.isOpen)}><AiOutlineMenu/></i>
                    <i className={`cursor-pointer ${props.isDashboardOpen? "":"rotate-180"} ease-in-out duration-300`} onClick={()=> props.setDashboard(!props.isDashboardOpen)}><AiOutlineArrowLeft/></i>
                </div>    
            </section>
        </div>
    )
}