import React, {useEffect, useState} from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import {Link} from 'react-router-dom';
import { Row, Col } from 'reactstrap';


export default function State(props){
    const [loading, setLoading] = useState(false);
    const [district_cases, setCases] = useState([{}])
    const [data, setData] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect( () => {
      fetchData();
    },[])

    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/");
      const result = await response.json();
      setData(result.raw_data);
      var districts = [...new Set(result.raw_data.map ((row) =>  {return ( row.detectedstate === props.match.params.state_name ? row.detecteddistrict : null);} ) )];
      setDistricts(districts);
      setLoading(false);
  }


    useEffect ( () => {
    getDistrictCounts();
    },[data, districts])

    const getDistrictCounts = () => {
      var district_counts = [];
      for (let i = 1; i < districts.length ;i++){
          let counts = 0;
          let row = {};
          data.forEach ( (row) => {
              if(row.detecteddistrict === districts[i]){
                counts+=parseInt(row.numcases);
              }
          })
          row = {
              district_name : districts[i],
              active_cases : counts
          }
          district_counts.push(row);
      }
      setCases(district_counts);
  }

  // function CustomTooltip({label}) {
  //   var district_name ='';
  //   data.forEach ((district) => {
  //   if(state.statecode === label){
  //       state_name = state.detectedstate
  //   }
  //   });
  //   var state_case;
  //   state_cases.forEach( (state) => {
  //       if (state.state === state_name){
  //           state_case = parseInt(state.active_cases)
  //       }
  //   })
  //   return <div>
  //       <h4><b>{`State : ${state_name}`}</b></h4>
  //       <h4>{`Cases : ${state_case}`}</h4>
  //       </div>;
  //   }

    return (
    <div className="state">
      <Row>
        <Col sm="5" style={{marginLeft : "20%", marginTop : "50px"}}>
        <h4>State - {props.match.params.state_name}</h4>
        <h4>Total Active Cases - {props.match.params.total_cases}</h4>
        </Col>
        <Col sm="2"></Col>
        <Col sm="5" style={{marginLeft : "-5%", marginTop:"50px"}}>
        <Link to='/country'>
        <button type="button" className="btn btn-primary">Country Chart</button>
        </Link>
        </Col>
      </Row>
      <Row>
        <BarChart
        width={1900}
        height={750}
        data={district_cases}
        margin={{
          top: 75, right: 0, left: 30, bottom: 5,
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