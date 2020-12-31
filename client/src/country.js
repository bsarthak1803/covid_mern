import React, {useEffect, useState} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  import { useSelector } from 'react-redux';
  import { Row, Col } from 'reactstrap';
  import { Link } from 'react-router-dom';


export default function Country(){
    // const [loading, setLoading] = useState(false);
    const [state_cases, setCases] = useState([{}])

    //get state from store
    const state = useSelector ( (state) => state);

    //extract data and states from store state
    const { data, states } = state;

    const cases_arr = data.map( (row) => { return ( (!isNaN(parseInt(row.numcases))) ? parseInt(row.numcases) : 0) ; })
    console.log(cases_arr);
    const total_cases = cases_arr.reduce ( (acc, row) => acc + row);

    useEffect (() => {
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
        getStateCounts();
    },[data, states])



    //called on click of state bar
    const handleClick = (e) =>{
        //passing state_name and cases to state route
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

    return (
        <div className="country">
        <Row>
        <div className="card rounded" style={{marginLeft:"35%", marginTop:"3%", width:"510px", boxShadow:"black"}}>
        <div className="card-body">
          <Row>
            <Col sm="8">
            <h4 className="card-text">Country - India</h4>
            <h4 className="card-text">Active Cases - {total_cases}</h4>
            </Col>
            <Col sm="4">
            <Link to='/'>
            <button type="button" className="btn btn-primary" style={{marginLeft:"20%", marginTop:"13px"}}>Home</button>
            </Link>
            </Col>
          </Row>
        </div>
        </div>
        <p style={{marginLeft:"39%"}}>* Click on a state bar to view state chart</p>
      </Row>
      <Row>
        <BarChart
        width={1900}
        height={750}
        data = {state_cases}
        margin={{
          top: 30, right: 0, left: 30, bottom: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="state_code"/>
        <YAxis/>
        <Tooltip content={<CustomTooltip />}/>
        <Legend style={{marginTop : "100px"}}/>
        <Bar dataKey="active_cases" fill="#8884d8" onClick={(e) =>handleClick(e)} />
      </BarChart>
      </Row>
    </div>
    )
}