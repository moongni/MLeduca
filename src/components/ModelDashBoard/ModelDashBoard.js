import React from 'react'
import { Link } from 'react-router-dom';
import ParamBoard from './ParamBoard';
import CompileBoard from './CompileBoard';
import LayerBoard from './LayerBoard';
import style from './ModelDashBoard.module.css';

export const ModelDashBoard = (props) => {
    const listStyle = {
        "fontSize":"1.125rem",
        "lineHeight":"1.75rem",
        "fontWeight":"500"
    }

    return (
        <div className={[`${props.isDashboardOpen? style.open:style.close}`, style.container].join(' ')}
        >
            <div className={style.modelInfo}>
                <h1 className={style.h1}>Model Info</h1>
                <div style={{"marginLeft": "1rem"}}>
                    <LayerBoard
                        style={listStyle}
                        link="/setting"/>
                    <CompileBoard
                        style={listStyle}
                        link="/setting"/>
                    <ParamBoard
                        style={listStyle}
                        link="/setting"/>
                </div>
            </div>
            <div className={style.modelTrain}>
                <div className={style.div}>
                    <Link to='/tfjs_test/'>
                    <button className={style.button}>fit</button>
                    </Link>
                </div>
            </div>
        </div>
  )
}