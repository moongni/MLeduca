import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { preprocessingActions } from "../../reducers/preprocessingSlice";
import { toArray, toOption } from "../Common/package";
import Select from "react-select";

export const PreprocessingSelect = ({children, preprocess, ...props}) => {
    const dispatch = useDispatch();

    const [ selectedValue, setSeletedValue ] = useState([]);
    
    var numericDisable = false;
    var fillNullDisable = false;
    var categoryDisable = false;

    useEffect(()=> {
      setSeletedValue(toOption(preprocess[props.column]))
    }, [])
  
    useEffect(() => {
      var curProcess = toArray(selectedValue);
      
      dispatch(preprocessingActions.setProcess({
        title: props.title,
        column: props.column,
        preprocess: curProcess,
        kind: props.kind
      }));

      selectedValue.map(value => {

        if ( groupOptions.filter( option => option.label == "numeric")[0].options.includes(value) ){
          numericDisable = true;
        }
        if ( groupOptions.filter( option => option.label == "fillNull")[0].options.includes(value) ){
          fillNullDisable = true;
        }
        if ( groupOptions.filter( option => option.label == "category")[0].options.includes(value) ){
          categoryDisable = true;
        }

      })

    }, [selectedValue])
    
    const groupOptions = [
      {
        label: "numeric",
        options: [
          {value: "stardardScale", label: "Standard Scale", isDisable: numericDisable},
          {value: "normalize", label: "Normalize", isDisable: numericDisable},
        ]
      },
      {
        label: "fillNull",
        options: [
          {value: "fillMean", label: "Fill Mean", isDisable: fillNullDisable},
          {value: "fillMedian", label: "Fill Median", isDisable: fillNullDisable},
          {value: "fillMostFrequnce", label: "Fill Most Frequnce", isDisable: fillNullDisable},
        ]
      },
      {
        label: "category",
        options: [
          {value: "oneHotEncoding", label: "One Hot Encoding", isDisable: categoryDisable},
          {value: "labelEncoding", label: "Label Encoding", isDisable: categoryDisable}
        ]
      },
      {
        label: "etc",
        options: [
          {value: "dropNull", label: "Drop Null Value"},
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
            container: (provided, state) => ({
              ...provided,
              width: 149
            }),
            menu: (provided, state) => ({
              ...provided,
              marginTop: 0,
              fontSize: 15,
            }),
            menuList: (provided, state) => ({
              ...provided,
              overflow: "scroll",
              height: 200
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
            dropdownIndicator: (provided, state) => ({
              ...provided,
              display: "none"
            }),
            indicatorSeparator: (provided, state) => ({
              display: "none"
            }),
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