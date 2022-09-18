import React, {
    useEffect,
    useState 
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { preprocessingActions } from "../../reducers/preprocessingSlice";
import { toArray, toOption } from "../Common/package";

export const PreprocessingSelect = ({children, ...props}) => {
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

    const groupOptions = [
        {
            label: "numeric",
            options: [
                {value: "stardardScale", label: "Standard Scale"},
                {value: "normalize", label: "Normalize"},
            ]
        },
        {
            label: "fillNull",
            options: [
                {value: "fillMean", label: "Fill Mean"},
                {value: "fillMedian", label: "Fill Median"},
                {value: "fillMostFrequnce", label: "Fill Most Frequnce"},
            ]
        },
        {
            label: "category",
            options: [
                {value: "oneHotEncoding", label: "One Hot Encoding"},
                {value: "ordinalEncoding", label: "Ordinal Encoding"}
            ]
        },
        {
            label: "etc",
            options: [
                {value: "stripNull", label: "Strip Null Value"},
            ]
        }
    ];
    
    
    const formatGroupLabel = (data) => {
        const style = {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontsize: "1rem",
            lineHeight: "1.25rem"
        };
        return (
            <div style={style}>
                    <span>{data.label}</span>
            </div>
        )
    }

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
                    }),
                    indicatorSeparator: (provided, state) => ({
                        display: "none"
                    })
                }}
                closeMenuOnSelect={false}
                isMulti
                placeholder="Select..."
                options={groupOptions}
                value={selectedValue}
                formatGroupLabel={formatGroupLabel}
                onChange={(e) => {
                    setSeletedValue(e);
                }}
                />
        </div>
    )
}