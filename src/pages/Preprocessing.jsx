import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { trainActions } from "../reducers/trainSlice";
import { isEmptyArray, selectColumn } from "../components/Common/package"
import SetColumn  from "../components/Preprocessing/SetColumn";
import ArrayTable from "../components/Common/table/ArrayTable";
import { PreprocessingOptions } from "../components/Preprocessing/PreprocessingOption";
import mainStyle from '../components/Common/component.module.css';
import { MdOutlineToc } from "react-icons/md"
import Title from "../components/Common/title/title";
import { Loader } from "../components/Common/loader/Loader";
import { Button } from "../components/Common/button/Button";
import { preprocessingActions } from "../reducers/preprocessingSlice";
import { preprocess } from "../components/TF/Preprocess";

const Preprocessing = () => {
    const dispatch = useDispatch();

    // redux persist load 
    const labels = useSelector( state => state.train.label );
    const labelData = useSelector( state => state.train.y );
    const features = useSelector( state => state.train.feature );
    const featureData = useSelector( state => state.train.x );
    const process = useSelector( state => state.preprocess );
    const data = useSelector( state => state.data.info );
    const dataColumns = useSelector( state => state.data.columns );
  
    const [ isLoading, setLoading ] = useState(false);

    const onClickHandler = async () => {
        try {

          setLoading(true);
          console.log("apply button call");
          
          dispatch(preprocessingActions.updateProcess({
            title: 'label',
            columns: labels
          }));

          dispatch(preprocessingActions.updateProcess({
            title: 'feature',
            columns: features
          }))

          const { labelData, featureData } = await preprocess(selectColumn(data, labels), selectColumn(data, features), process);

          dispatch(trainActions.setData({
            title: "feature",
            data: featureData
          }))
    
          dispatch(trainActions.setData({
            title: "label",
            data: labelData
          }))
    
        } catch (err) {
            console.log(err);
            alert(err);
            console.log("apply button catch");
            setLoading(false);
        }
      
      }

    const style = {
        btnContainer: {
            "position":"relative",
            "left":"50%",
            "display":"flex",
            "transform":"translateX(-50%)",
            "justifyContent":"center"
        },
        btn: {
            "width":"8rem",
            "margin":"0.5rem",
            "height":"2.5rem"
        }
    }
    
    return (
        <>
            { isLoading && <Loader type="spin" color="black" message="Loading"/>}
            <div className={mainStyle.container}>
                <Title
                    title="Label"
                    icon={<MdOutlineToc/>}
                />
                <div className={mainStyle.subContainer}>
                    <SetColumn 
                        title={"Select Labels"}
                        setData={trainActions.setLabelData}
                        setColumn={trainActions.setLabels}
                        setLoading={setLoading}
                        data={data}
                        dataColumns={dataColumns}
                    />
                </div>
                {!isEmptyArray(labels) &&
                    <>
                        <Title title="Label Data Table"/>
                        <div 
                            className={mainStyle.subContainer}
                            style={{position:"relative",
                                    minHeight:"24rem"}}
                        >
                            <ArrayTable
                                style={{"height":"24rem"}}
                                data={labelData}
                                columns={labels}
                            />
                        </div>
                        <Title title={`Preprocessing`}/>
                        <div className={mainStyle.subContainer}>
                            <PreprocessingOptions
                                title="label"
                                columns={labels}
                                process={process}
                            />
                        </div>
                    </>
                }
                <Title
                    title="Feature"
                    icon={<MdOutlineToc/>}
                />
                <div className={mainStyle.subContainer}>
                    <SetColumn
                        title={"Select Features"}
                        setData={trainActions.setFeatureData}
                        setColumn={trainActions.setFeatures}
                        setLoading={setLoading}
                        data={data}
                        dataColumns={dataColumns}
                    />
                </div >
                {!isEmptyArray(features) &&
                    <>
                        <Title title="Feature Data Table"/>
                        <div
                            className={mainStyle.subContainer} 
                            style={{position:"relative",
                                    minHeight:"24rem"}}
                        >
                            <ArrayTable
                                style={{"height":"24rem"}}
                                data={featureData}
                                columns={features}
                            />
                        </div>
                        <Title title="Preprocessing"/>
                        <div className={mainStyle.subContainer}>
                            <PreprocessingOptions
                                title="feature"
                                columns={features}
                                process={process}
                            />
                        </div>
                    </>
                }
                <div style={style.btnContainer}>
                    <Button 
                        className="red"
                        style={style.btn}
                        type="button"
                        onClick={() => {
                            dispatch(trainActions.initialize());
                            dispatch(preprocessingActions.initialize());
                        }}
                    >
                        reset
                    </Button>
                    <Button 
                        className="green"
                        style={style.btn}
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            onClickHandler().then( _ => {
                                console.log("apply button then");
                                setLoading(false);
                            })}}
                        >
                        apply
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Preprocessing;