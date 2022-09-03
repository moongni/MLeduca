import React, {
    useEffect,
    useState 
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { preprocessingActions } from "../../reducers/preprocessingSlice";
import { toArray, toOption } from "../Common/package";

const PreprocessingSelect = ({children, ...props}) => {
    const dispatch = useDispatch();
    const preprocess = useSelector(state => state.preprocess.info);
    const [selectedValue, setSeletedValue] = useState([]);
    
    useEffect(
        ()=> {
            setSeletedValue(toOption(preprocess[props.column]))
        }
    , [])

    useEffect(
        () => {
            var curProcess = toArray(selectedValue);
            dispatch(preprocessingActions.setProcess({
                column: props.column,
                preprocess: curProcess
            }));
        }
    , [selectedValue])

    const options = [
        {value: "stardardScale", label: "Standard Scale"},
        {value: "normalize", label: "Normalize"},
        {value: "fillMean", label: "Fill Mean"},
        {value: "fillMedian", label: "Fill Median"},
        {value: "fillMostFrequnce", label: "Fill Most Frequnce"},
        {value: "oneHotEncoding", label: "OneHot Encoding"}
    ];

    return (
        <div>
            <Select
                styles={{
                    menu: (provided, state) => ({
                    ...provided,
                    position: "sticky",
                    top: 0,
                    width: "fit-content",
                    marginTop: 0,
                    fontSize: 15
                    }),
                    menuList: (provided, state) => ({
                    ...provided,
                    overflow: "scroll",
                    height: 120
                    }),
                    dropdownIndicator: (provided, state) => ({
                    ...provided,
                    display: "none"
                    }),
                    multiValue: (provided, state) => ({
                    ...provided,
                    fontSize: 20,
                    width: "100%",
                    justifyContent: "space-between",
                    wordBreak: "break-all"
                    }),
                    clearIndicator: (provided, state) => ({
                    display: "none"
                    }),
                    container: (provided, state) => ({
                        ...provided,
                        maxWidth: 151
                    })
                }}
                closeMenuOnSelect={false}
                isMulti
                placeholder="Select..."
                options={options}
                value={selectedValue}
                onChange={(e) => {
                    setSeletedValue(e);
                }}
                />
        </div>
    )
}

export default  PreprocessingSelect