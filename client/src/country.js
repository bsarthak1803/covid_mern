import React, {useEffect, useState} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  import { useDispatch, useSelector } from 'react-redux';


export default function Country(){
    const [loading, setLoading] = useState(false);
    const [state_cases, setCases] = useState([{}])

    //get state from store
    const state = useSelector ( (state) => state);

    //extract data and states from store state
    const { data, states } = state;

    useEffect (() => {
        getStateCounts();
    },[data, states])

    const getStateCounts = () => {
        var state_counts = [];
        for (let i = 0; i < states.length ;i++){
            let counts = 0;
            let state_code = '';
            let row = {};
            data.forEach ( (row) => {
                if(row.detectedstate === states[i]){
                  counts+=parseInt(row.numcases);
                    state_code = row.statecode;
                }
            })
            row = {
                state : states[i],
                state_code : state_code,
                active_cases : counts
            }
            state_counts.push(row);
        }
        setCases(state_counts);
    }

    const handleClick = (e) =>{
        window.location = `/state/${e.state}/${e.active_cases}`;
    }

    function CustomTooltip({label}) {
        var state_name ='';
        data.forEach ((state) => {
        if(state.statecode === label){
            state_name = state.detectedstate
        }
        });
        var state_case;
        state_cases.forEach( (state) => {
            if (state.state === state_name){
                state_case = parseInt(state.active_cases)
            }
        })
        return <div>
            <h4><b>{`State : ${state_name}`}</b></h4>
            <h4>{`Cases : ${state_case}`}</h4>
            </div>;
        }

    return <div>
        <h4 style={{marginLeft : "44%", marginTop : "20px"}}><b>State Wise Cases</b></h4>
        {loading === true ? <h2>Getting Data...</h2> :
        <BarChart
        width={1900}
        height={750}
        data = {state_cases}
        margin={{
          top: 50, right: 0, left: 30, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="state_code"/>
        <YAxis/>
    <Tooltip content={<CustomTooltip />}/>
        <Legend />
        <Bar dataKey="active_cases" fill="#8884d8" onClick={(e) =>handleClick(e)} />
      </BarChart>}
    </div>
}