import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json"

const initialState = { info: {} };

const sequence = createSlice({
    name: 'sequence',
    initialState,

    reducers: {
        onChangeState(state, action) {
            console.log("onchange 호출");
            const { name, value } = action.payload;
            state.info = {
                ...state.info,
                [name]: value
            }
        },
        initialize(state, action){
            console.log('initailize 호출');
            state.info = initialState;
            console.log(state.info);
            data.modelCreate[0].info[0].params.map( param => {
                console.log(param.title);
                console.log(param.default);
                this.onChangeState({
                    name: param.title,
                    value: param.default
                });
            })
        }
    }
})

export const seqActions = sequence.actions;

export default sequence;