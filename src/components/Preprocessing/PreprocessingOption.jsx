import React, { useCallback, useState } from "react";
import { isEmptyArray } from "../Common/package";
import PreprocessingSelect from "./PreprocessingSelect";

const PreprocessingOptions = ({children, ...props}) => {

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
        <div className={`${hovering? "scrollhost":"disViable"} w-full max-h-fit overflow-auto`}
            onMouseLeave={handleMouseOut}
            onMouseEnter={handleMouseOver}>
          <span className="text-left p-3">Preprocessing</span>
          <table className="w-full">
            <thead>
              <tr key={"preprocessing"}>
                { props.columns.map((column) => (
                    <th className="text-left p-3 border-b-2 border-slate-100">
                        {column}
                    </th>
                ))}
              </tr>
            </thead>
          <tbody>
            <tr>
              {
                props.columns.map((column) => (
                  <th className="mx-1 py-2 border-b-2 border-slate-100">
                    <PreprocessingSelect
                      column={column}
                      width={props.width}/>
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