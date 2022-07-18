import React, {useState} from 'react'
// import { Container } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { IoMdAnalytics } from "react-icons/io";
import { FiGrid } from "react-icons/fi"
import { BsCollection } from "react-icons/bs"
import { AiFillCaretDown, AiOutlineLineChart, AiOutlineMenu } from "react-icons/ai"
import { FaFileExport } from "react-icons/fa"
import { RiComputerLine } from "react-icons/ri"
import { Link, NavLink } from 'react-router-dom';

import './MainSidebar.css'

const MainSidebar = (props) => {
    const [isShowMenu1, setShowMenu1] = useState(false);
    const [isShowMenu2, setShowMenu2] = useState(false);

    return (
        <div >
            <div className={`${props.isOpen? "sidebar": "sidebar close"} border-solid border-r-2 border-slate-200 ease-in-out duration-300`}>
                <div className='logo-details cursor-pointer'>
                    <i className=''><RiComputerLine/></i>
                    <span className='logo_name'>Deep learning</span>
                </div>
                <ul className='nav-links'>
                    <li>
                        <a href='#'>
                            <i ><FiGrid/></i>
                            <span className='link-name'>Model Selection</span>
                        </a>
                        <ul className='sub-menu blank'>
                            <li><a className='submenu-name' href='#'>Model Selection</a></li>
                        </ul>
                    </li>
                    <li className={isShowMenu1? "showMenu":""} onClick={()=> setShowMenu1(!isShowMenu1)}>
                        <div className='icon-link' >
                            <a href='#'>
                                <i ><BsCollection /></i>
                                <span className='link-name'>Category</span>
                                <i className='down ml-auto'><AiFillCaretDown /></i>
                            </a>
                        </div>
                        <ul className='sub-menu'>
                            <li><a className='submenu-name' href='#'>Category</a></li>
                            <li><a href='#'>Machine learing setting1</a></li>
                            <li><a href='#'>Machine learing setting2</a></li>
                            <li><a href='#'>Machine learing setting3</a></li>
                        </ul>
                    </li>
                    <li className={isShowMenu2? "showMenu":""} onClick={()=> setShowMenu2(!isShowMenu2)}>
                        <div className='icon-link'>
                            <a href='#'>
                                <i ><BsCollection /></i>
                                <span className='link-name'>Category2</span>
                                <i className='down ml-auto'><AiFillCaretDown /></i>
                            </a>
                        </div>
                        <ul className='sub-menu'>
                            <li><a className='submenu-name' href='#'>Category2</a></li>
                            <li><a href='#'>Deep learing setting1</a></li>
                            <li><a href='#'>Deep learing setting2</a></li>
                            <li><a href='#'>Deep learing setting3</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href='#'>
                            <i ><IoMdAnalytics/></i>
                            <span className='link-name'>Analytic</span>
                        </a>
                        <ul className='sub-menu blank'>
                            <li><a className='submenu-name' href='#'>Analytic</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href='#'>
                            <i ><AiOutlineLineChart/></i>
                            <span className='link-name'>Predict</span>
                        </a>
                        <ul className='sub-menu blank'>
                            <li><a className='submenu-name' href='#'>Predict</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href='#'>
                            <i ><FaFileExport/></i>
                            <span className='link-name'>Download</span>
                        </a>
                        <ul className='sub-menu blank'>
                            <li><a className='submenu-name' href='#'>Download</a></li>
                        </ul>
                    </li>
                </ul>
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
