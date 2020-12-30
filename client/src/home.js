import React from 'react';
import {Link} from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';


export default function Home(){

    return (
        <div className="card shadow p-3 mb-5 bg-white rounded" style={{marginLeft:"35%", marginTop:"14%", width:"510px", boxShadow:"black"}}>
        <img className="card-img-top" src="./covid-share.jpg" alt="Card cap"/>
        <div className="card-body">
            <h5 className="card-title" style={{marginLeft:"26%", marginTop:"30px", fontSize:"30px", fontFamily:"sans-serif", fontWeight:"bolder"}}>Covid Dashboard</h5>
            <Link to='/country'>
            <button type="button" className="btn btn-primary" style={{marginLeft:"37%", marginTop:"17px", marginBottom:"5px"}}>Country Chart</button>
            </Link>
        </div>
        </div>
    )
}