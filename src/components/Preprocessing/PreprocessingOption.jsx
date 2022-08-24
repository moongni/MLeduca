import React from "react";
import { useState } from "react";
import Select from "react-select";

const PreprocessingOptions = ({children, ...props}) => {
    const [value, setValue] = useState([]);
    const options = [
      {value: "stardardScale", label: "Standard Scale"},
      {value: "normalize", label: "Normalize"},
      {value: "fillMean", label: "Fill Mean"},
      {value: "fillMedian", label: "Fill Median"},
      {value: "fillMostFrequnce", label: "Fill Most Frequnce"},
      {value: "oneHotEncoding", label: "OneHot Encoding"}
  ];

    return (
        <>
            <Select
                className="w-full h-full px-3"
                styles={{
                  menu: (provided, state) => ({
                    ...provided,
                    position: "absolute",
                    width: "fit-content",
                    marginTop: 0,
                  }),
                  menuList: (provided, state) => ({
                    ...provided,
                  }),
                  multiValueRemove: (provided, state) => ({
                    ...provided,
                  }),
                  noOptionsMessage: (provided, state) => ({
                    display: "none"
                  })
                }}
                closeMenuOnSelect={false}
                isMulti
                placeholder="Select..."
                options={options}
                />
                
        </>
    )
}

export default  PreprocessingOptions