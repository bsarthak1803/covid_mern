import React, {useEffect, useState} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import {Link} from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';


export default function State(props){
    const [district_cases, setCases] = useState([{}])

    //get state from store
    const state = useSelector ( (state) => state);

    //extract data and states from store state
    const { data, states } = state;

    useEffect ( () => {
    //get cases for each district
    const getDistrictCounts = () => {
      var districts_array = [...new Set(data.map ((row) =>  {return ( row.detectedstate === props.match.params.state_name ? row.detecteddistrict : null);} ) )];
      var district_counts = [];
      for (let i = 1; i < districts_array.length ;i++){
          let counts = 0;
          let row = {};
          data.forEach ( (row) => {
              if(row.detecteddistrict === districts_array[i]){
                counts+=parseInt(row.numcases);
              }
          })
          row = {
              district_name : districts_array[i],
              active_cases : counts
          }
          district_counts.push(row);
      }
      setCases(district_counts);
  }
    getDistrictCounts();
    },[data, props.match.params.state_name])

    return (
    <div className="state">
      <Row>
        <div className="card rounded" style={{marginLeft:"35%", marginTop:"3%", width:"510px", height:"100px",boxShadow:"black"}}>
        <div className="card-body">
          <Row>
            <Col sm="8">
            <h4 className="card-text" style={{marginTop:"20px"}}>State - {props.match.params.state_name}</h4>
            <h4 className="card-text">Active Cases - {props.match.params.total_cases}</h4>
            </Col>
            <Col sm="4">
            <Link to='/country'>
            <button type="button" className="btn btn-primary" style={{marginLeft:"5%", marginTop:"8px"}}>Country Chart</button>
            </Link>
            <Link to='/'>
            <button type="button" className="btn btn-primary" style={{marginLeft:"22%", marginTop:"10px"}}>Home</button>
            </Link>
            </Col>
          </Row>
        </div>
        </div>
      </Row>
      <Row>
        <BarChart
        width={1900}
        height={750}
        data={district_cases}
        margin={{
          top: 40, right: 0, left: 30, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="district_name" />
        <YAxis dataKey=""/>
        <Tooltip />
        <Legend />
        <Bar dataKey="active_cases" fill="#8884d8" />
      </BarChart>
      </Row>
    </div>
    )
}