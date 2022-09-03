import React, { useCallback, useState } from "react";
import { isEmptyArray } from "../Common/package";
import PreprocessingSelect from "./PreprocessingSelect";
import "../Common/scrollStyle.css";
import { Title } from "../Common/title";

const PreprocessingOptions = ({children,  ...props}) => {
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
          style={{"marginTop":"1rem"}}
          onMouseLeave={handleMouseOut}
          onMouseEnter={handleMouseOver}
        >
          <Title title={`${props.title} Preprocessing`} icon={props.icon}/>
          <table style={{"width":"100%"}}>
            <thead>
              <tr key={"preprocessing"}>
                { props.columns.map((column) => (
                    <th style={{"textAlign":"left",
                                "padding":"0.75rem"}}>
                        {column}
                    </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                { props.columns.map((column) => (
                    <th style={{"margin":"0 4px",
                                "padding":"8px 0"}}>
                      <PreprocessingSelect
                        column={column}/>
                    </th>
                  ))
                }
              </tr>
            </tbody>
          </table>
        </div>
      }
    </>
  )
}

export default  PreprocessingOptions