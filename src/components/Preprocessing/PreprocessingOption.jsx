import React, { useCallback, useState } from "react";
import { isEmptyArray } from "../Common/package";
import { PreprocessingSelect } from "./PreprocessingSelect";
import "../Common/table/scrollStyle.css";
import Title from "../Common/title/title";
import style from "../Common/table/table.module.css"

export const PreprocessingOptions = ({children,  ...props}) => {
  const [hovering, setHovering] = useState(false);

  const handleMouseOver = useCallback(() => {
    !hovering &&
    setHovering(true);
  }, [hovering]);

  const handleMouseOut = useCallback(() => {
    !!hovering &&
    setHovering(false);
  }, [hovering]);

  return (
    <>
      { !isEmptyArray(props.columns) &&
        <div 
          className={`${hovering? "scrollhost":"disViable"}`}
          style={{"marginTop":"1.25rem"}}
          onMouseLeave={handleMouseOut}
          onMouseEnter={handleMouseOver}
        >
          <Title title={`${props.title} Preprocessing`}/>
          <table style={{"width":"100%",
                         "marginTop":"1.25rem"}}>
            <thead>
              <tr key={"preprocessing"}>
                { props.columns.map((column) => (
                    <th className={style.th}>
                        {column}
                    </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                { props.columns.map((column) => (
                    <th className={style.td}>
                      <PreprocessingSelect
                        column={column}/>
                    </th>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      }
    </>
  )
}