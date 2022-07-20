import React, {useState} from 'react';
import { IoMdAnalytics } from "react-icons/io";
import { FiGrid } from "react-icons/fi"
import { BsCollection } from "react-icons/bs"
import { AiFillCaretDown, AiOutlineLineChart, AiOutlineMenu } from "react-icons/ai"
import { FaFileExport } from "react-icons/fa"
import { RiComputerLine } from "react-icons/ri"
import { Link } from 'react-router-dom';
import sidebars from '../data/sidebarData.json';
// import data from '../data/data.json';
import './MainSidebar.css';

const MainSidebar = (props) => {
    const [isShowMenu, setShowMenu] = useState(false);
    const [isShowMenu2, setShowMenu2] = useState(false);
    const Icon = props => {
        switch (props.icon){
            case 'BsCollection': return <BsCollection/>
            case 'FiGrid': return <FiGrid/>
            case 'IoMdAnalytics': return <IoMdAnalytics/>
            case 'AiOutlineLineChart': return <AiOutlineLineChart/>
            case 'FaFileExport': return <FaFileExport/>
            default: return null
        }
    };
    return (
        <div className='p-0 m-0 box-border'>
            <div className={`${props.isOpen? "sidebar": "sidebar close"} fixed top-0 left-0 h-full 
            bg-white border-solid border-r-2 border-slate-200 ease-in-out duration-300 z-30`}>
                <Link className="logo-details cursor-pointer" to='/'>
                    <i ><RiComputerLine/></i>
                    <span className='logo_name'>Machine learning</span>
                </Link>
                <ul className='nav-links'>
                    {sidebars.sidebarLinkName.map(sidebar => {

                        return (
                            <li className={sidebar.subLinkName.length > 0? isShowMenu? "showMenu":"" : "showMenu"}
                            onClick={() => sidebar.subLinkName.length > 0? setShowMenu(!isShowMenu): ()=>{}}>
                                <div className='icon-link'>
                                    <Link to={sidebar.link}>
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
                        )
                    })}
                </ul>

{/* 
                    <li className="showMenu">
                        <div className='icon-link'>
                            <Link to="#">
                                <i ><FiGrid/></i>
                                <span className='link-name'>Model Selection</span>
                            </Link>
                        </div>
                        <ul className='sub-menu'>
                            <li><Link className='submenu-name' to='#'>Model Selection</Link></li>
                            {data.modelSelection.map((category) => {
                                return (<li><Link to={`/${category.id}/`}>{category.id}</Link></li>)
                            })}
                        </ul>
                    </li>
                    <li className={isShowMenu1? "showMenu":""} onClick={()=> setShowMenu1(!isShowMenu1)}>
                        <div className='icon-link' >
                            <Link to='#'>
                                <i ><BsCollection /></i>
                                <span className='link-name'>Layers</span>
                                <i className='down ml-auto'><AiFillCaretDown /></i>
                            </Link>
                        </div>
                        <ul className='sub-menu'>
                            <li><Link className='submenu-name' to='#'>Layers</Link></li>
                            <li><Link to='#'>Machine learing setting1</Link></li>
                            <li><Link to='#'>Machine learing setting2</Link></li>
                            <li><Link to='#'>Machine learing setting3</Link></li>
                        </ul>
                    </li>
                    <li className={isShowMenu2? "showMenu":""} onClick={()=> setShowMenu2(!isShowMenu2)}>
                        <div className='icon-link'>
                            <Link to='#'>
                                <i ><BsCollection /></i>
                                <span className='link-name'>Category2</span>
                                <i className='down ml-auto'><AiFillCaretDown /></i>
                            </Link>
                        </div>
                        <ul className='sub-menu'>
                            <li><Link className='submenu-name' to='#'>Category2</Link></li>
                            <li><Link to='#'>Deep learing setting1</Link></li>
                            <li><Link to='#'>Deep learing setting2</Link></li>
                            <li><Link to='#'>Deep learing setting3</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to='#'>
                            <i ><IoMdAnalytics/></i>
                            <span className='link-name'>Analytic</span>
                        </Link>
                        <ul className='sub-menu blank'>
                            <li><Link className='submenu-name' to='#'>Analytic</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to='#'>
                            <i ><AiOutlineLineChart/></i>
                            <span className='link-name'>Predict</span>
                        </Link>
                        <ul className='sub-menu blank'>
                            <li><Link className='submenu-name' to='#'>Predict</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link to='#'>
                            <i ><FaFileExport/></i>
                            <span className='link-name'>Download</span>
                        </Link>
                        <ul className='sub-menu blank'>
                            <li><Link className='submenu-name' to='#'>Download</Link></li>
                        </ul>
                    </li>
                </ul> */}
            </div>
            <section className='home-section border-solid border-b-2 border-slate-200'>
                <div className='home-content '>
                    <i className="cursor-pointer" onClick={()=> props.setMenu(!props.isOpen)}><AiOutlineMenu/></i>
                    {/* <span className='text'>Drop Down Sidebar</span> */}
                </div>    
            </section>
        </div>
    )
}

export default MainSidebar
