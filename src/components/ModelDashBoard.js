import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import sidebars from '../data/sidebarData.json';

export const ModelDashBoard = (props) => {
    const compile = useSelector((state) => state.compile.info);
    const parameter = useSelector((state) => state.parameter.info);
    console.log("p",parameter);
    console.log("c",compile);

    const sequenceLayers = useSelector((state) => state.sequenceLayers.info);

  return (
    <div className={`fixed top-0 right-0 h-full ${props.isDashboardOpen? 'w-[16.25rem]':'right-[-16.25rem] opacity-0 pointer-events-none'}
    max-w-[16.25rem] py-16 m-0 border-l-2 border-slate-200 ease-in-out duration-300 
    bg-slate-200 border-soild table`}
    style={{'width':`}`}}>
        <div className='table-row w-full h-5/6'>
            <h1 className='mt-2 text-lg text-center font-semibold border-b-2 border-slate-400'>Model Info</h1>
            <div className='ml-4'>
                <ul className='mb-2'>
                    <li className='text-lg font-medium '><Link to='#'>Layers</Link></li>
                    {
                        sequenceLayers.map(layer => {
                            return (
                            <li className='pl-2'>
                                <Link to="/layers/"><p className='break-all'>{layer.idx} Layer {JSON.stringify(layer.info)}</p></Link>
                            </li>)
                        })
                    }
                </ul>
                <ul className='mb-2'>
                    <li className=' text-lg font-medium'><Link to='#'>Compile</Link></li>
                    {
                        sidebars.ModelDashBoard.filter(title => title.name === "Compile")[0].subLinkName.map(params => {
                            return (
                                <li className='pl-2'><Link to={params.link}><p className='break-all'>{params.name}:&nbsp; &nbsp;{compile.map(v => {return v.title == params.name? v.name: ""})}</p></Link></li>
                            )
                        })
                    }
                </ul>
                <ul className='mb-2'>
                    <li className=' text-lg font-medium'><Link to='#'>Parameters</Link></li>
                    {
                        sidebars.ModelDashBoard.filter(title => title.name === "Parameters")[0].subLinkName.map(params => {
                            return (
                                <li className='pl-2'><Link to={params.link}><p className='break-all'>{params.name}:&nbsp; &nbsp;{parameter.map(v => {return v.title == params.name? v.name: ""})}</p></Link></li>
                            )
                        })
                    }
                </ul>

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

// top-16 mt-2.5 mr-2.5 w-72