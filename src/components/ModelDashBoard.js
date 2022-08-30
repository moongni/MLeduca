import React from 'react'
import { Link } from 'react-router-dom';
import ParamBoard from './ModelDashBoard/LayerBoard';
import CompileBoard from './ModelDashBoard/CompileBoard';
import LayerBoard from './ModelDashBoard/LayerBoard';

export const ModelDashBoard = (props) => {
    

  return (
    <div className={`fixed top-0 right-0 h-full ${props.isDashboardOpen? 'w-[16.25rem]':'right-[-16.25rem] opacity-0 pointer-events-none'}
    max-w-[16.25rem] py-16 m-0 shadow-sm shadow-slate-200 ease-in-out duration-300
    bg-slate-200 border-soild table`}
    >
        <div className='table-row w-full h-5/6'>
            <h1 className='mt-2 text-lg text-center font-semibold border-b-2 border-slate-400'>Model Info</h1>
            <div className='ml-4'>
                <LayerBoard
                    link="/setting"/>
                <CompileBoard
                    link="/setting"/>
                <ParamBoard
                    link="/setting"/>
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