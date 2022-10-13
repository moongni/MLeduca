import React, { useCallback, useState } from "react";
import { isEmptyArray } from "../Common/package";
import tableStyle from "../Common/table/table.module.css";
import { PreprocessingSelect } from "./PreprocessingSelect";

export const PreprocessingOptions = ({children, process, ...props}) => {
  const [ hovering, setHovering ] = useState(false);
  
  const handleMouseOver = useCallback(() => {
    !hovering &&
    setHovering(true);
  }, [hovering]);

  const handleMouseOut = useCallback(() => {
    !!hovering &&
    setHovering(false);
  }, [hovering]);

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
                  <th className={tableStyle.th}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {props.columns.map((column) => (
                  <th className={tableStyle.td}
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
    </div>

  )
}

