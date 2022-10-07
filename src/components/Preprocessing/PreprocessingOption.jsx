import React, { useCallback, useState } from "react";
import { isEmptyArray, selectColumn } from "../Common/package";
import { Button } from "../Common/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { preprocessingActions } from "../../reducers/preprocessingSlice";
import style from "../Common/table/table.module.css"
import { preprocess } from "../TF/Preprocess";
import { trainActions } from "../../reducers/trainSlice";
import { PreprocessingSelect } from "./PreprocessingSelect";

export const PreprocessingOptions = ({children, setLoading, ...props}) => {
  const dispatch = useDispatch();
  const process = useSelector(state => state.preprocess);
  const selectedColumn = useSelector(state => state.train[props.title + 's']);
  const data = useSelector(state => state.data.info);

  const [ hovering, setHovering ] = useState(false);
  
  const handleMouseOver = useCallback(() => {
    !hovering &&
    setHovering(true);
  }, [hovering]);

  const handleMouseOut = useCallback(() => {
    !!hovering &&
    setHovering(false);
  }, [hovering]);

  const onClickHandler = async () => {

    try {
    
      setLoading(true);
      
      dispatch(preprocessingActions.updateProcess({
        title: props.title,
        columns: selectedColumn
      }));
      
      const processedData = await preprocess(selectColumn(data, selectedColumn), process[props.title]);

      dispatch(trainActions.setData({
        title: props.title,
        data: processedData
      }))

    } catch (err) {

      console.log(err);
      alert("error : ", err);
    
    }
  
  }

  return (
    <div>
      {!isEmptyArray(props.columns) &&
        <div 
          // className={`${hovering? "scrollhost":"disViable"}`}
          // onMouseLeave={handleMouseOut}
          // onMouseEnter={handleMouseOver}
        >
          <table>
            <thead>
              <tr key={"preprocessing"}>
                {props.columns.map((column) => (
                  <th className={style.th}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {props.columns.map((column) => (
                  <th className={style.td}
                    style={{"verticalAlign":"top"}}>
                    <PreprocessingSelect
                      title={props.title}
                      column={column}
                      preprocess={process[props.title]}/>
                  </th>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      }
      <div style={{"position":"relative",
                  "left":"50%",
                  "display":"flex",
                  "transform":"translateX(-50%)",
                  "justifyContent":"center"}}>
        <Button 
          className="red"
          style={{"width":"8rem",
                  "margin":"0.5rem",
                  "height":"2.5rem"}}
          type="button"
          onClick={() => dispatch(preprocessingActions.initialize())}
        >
          reset
        </Button>
        <Button 
          className="green"
          style={{"width":"8rem",
                  "margin":"0.5rem",
                  "height":"2.5rem"}}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onClickHandler().then( _ => setLoading(false))}}
        >
          apply
        </Button>
      </div>
    </div>

  )
}

