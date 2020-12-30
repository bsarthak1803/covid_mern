import React from 'react';
import {Link} from 'react-router-dom';


export default function Home(){
    return <div style={{alignContent : "center", justifyContent : "center"}}>
        <Link to='/country'>
        <button type="button" className="btn btn-primary" >Country Chart</button>
        </Link>
        <Link to="/state">
        <button type="button" className="btn btn-primary">State Chart</button>
        </Link>
    </div>
}