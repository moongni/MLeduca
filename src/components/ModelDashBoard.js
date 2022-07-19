import React from 'react'
import data from '../data/data.json';


export const ModelDashBoard = () => {

  return (
    <div className='fixed top-16 mt-2.5 mr-2.5 w-72
    bg-slate-200 rounded-xl border-soild border-slate-200 
    table'
    style={{'height': '600px', 'left':'calc(100% - 300px)'}}>
        <div className='table-row w-full h-5/6 overflow-auto'>
            <h1 className='mt-2 text-lg text-center font-medium border-b-2 border-slate-400'>Model Info</h1>
            <div className='ml-4'>
                <li ><a href='#'>model : {}</a></li>
                <ul><li>Hyper Param</li>
                    {data.modelSelection.map(selection => {
                        return <li className=''><a href='#'>{selection.id} : </a></li>
                    })}
                </ul>
            </div>
            
        </div>
        <div className='table-row h-14'>
            <form className='flex mt-2 items-center justify-center'>
                <input className="w-24 h-10 text-center text-lg font-medium 
                cursor-pointer bg-green-300 rounded-lg hover:bg-green-400 " type={'button'} value="fit"></input>
            </form>
        </div>
    </div>
  )
}
