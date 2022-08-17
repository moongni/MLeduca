import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import sidebars from '../data/sidebarData.json';

export const ModelDashBoard = (props) => {
    const compile = useSelector((state) => state.compile);
    const parameter = useSelector((state) => state.parameter.info);
    const layers = useSelector((state) => state.layers.info);
    
    const Content = ({props}) => {
        const getData = (name) => {
            switch(name) {
                case "Parameters":
                    return parameter;
                case "Compile":
                    return compile;
                default:
                    return {};
            }
        }
        switch(props.name){
            case "Layers":
                return(
                    <ul className='mb-2'>
                        <Link to={props.link}>
                        <li className='text-lg font-medium '>Layers</li>
                        {
                            layers.map((layer) => {
                                return (
                                <li className='pl-2'>
                                    <p className='break-all'>{layer.idx} Layer</p>
                                    {
                                        Object.entries(layer.info).map(item => {
                                            return (
                                                <p className='break-all'>{item[0]}&nbsp; &nbsp;{item[1]}</p>
                                            )
                                        })
                                    }
                                </li>
                                )
                            })
                        }
                        </Link>
                    </ul>
                )
            case "Compile":
                return (
                    <ul className='mb-2'>
                        <Link to={props.link}>
                        <li className=' text-lg font-medium'>
                            {props.name}</li>
                        {
                            Object.entries(compile).map(setting => {
                                if (setting[0] === "optimizer" && Object.keys(setting[1]).length > 0){
                                    return (
                                        <li className='pl-2'>
                                            <p className='break-all'>{setting[0]}:&nbsp; &nbsp;{setting[1].title}</p>
                                            {
                                                Object.entries(setting[1].value).map(item => {
                                                    return (
                                                        <p className='pl-8 break-all'>{item[0]}&nbsp; &nbsp;{item[1]}</p>
                                                    )
                                                })
                                            }
                                        </li>  
                                    )
                                }
                                if (setting[0] === "loss" && setting[1] !== ''){
                                    return (
                                        <li className='pl-2'><p className='break-all'>{setting[0]}:&nbsp; &nbsp;{setting[1]}</p></li>
                                    )
                                }
                            })
                        }
                        </Link>
                    </ul>
                )
            default:
                return (
                    <ul className='mb-2'>
                        <Link to={props.link}>
                        <li className=' text-lg font-medium'>
                            {props.name}</li>
                        {
                            Object.entries(getData(props.name)).map(setting => {
                                return (
                                    <li className='pl-2'><p className='break-all'>{setting[0]}:&nbsp; &nbsp;{setting[1]}</p></li>
                                )
                            })
                        }
                        </Link>
                    </ul>
                )
        }
    }

  return (
    <div className={`fixed top-0 right-0 h-full ${props.isDashboardOpen? 'w-[16.25rem]':'right-[-16.25rem] opacity-0 pointer-events-none'}
    max-w-[16.25rem] py-16 m-0 shadow-sm shadow-slate-200 ease-in-out duration-300
    bg-slate-200 border-soild table`}
    style={{'width':`}`}}>
        <div className='table-row w-full h-5/6'>
            <h1 className='mt-2 text-lg text-center font-semibold border-b-2 border-slate-400'>Model Info</h1>
            <div className='ml-4'>
                {
                    sidebars.ModelDashBoard.map(items => {
                        return <Content props={items}/>
                    })
                }
            </div>
        </div>
        <div className='table-row h-14'>
            <div className='flex mt-2 items-center justify-center'>
                <Link to='/tfjs_test/'>
                <button className="w-24 h-10 text-center text-lg font-medium 
                cursor-pointer bg-green-300 rounded-lg hover:bg-green-400 ">fit</button>
                </Link>
            </div>
        </div>
    </div>
  )
}