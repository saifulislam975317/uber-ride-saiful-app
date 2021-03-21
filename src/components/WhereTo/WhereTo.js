import React from 'react';
import './WhereTo.css'
import map from '../../images/Map.png'

const WhereTo = () => {

  return (

    <div className="form-containers">
      <div className="form-details">

        <form className="form" >
          <label htmlFor="">pick from</label>
          <input type="text" name="from" placeholder='Pick From' />
          <label htmlFor="">pick to</label>
          <input type="text" name="to" placeholder='Pick To' />
          <input className="search-button" type="button" value="search"/>


        </form>
      </div>



      <div className="map-div">
        <img src={map} alt="" />
      </div>
    </div>
  )
}

export default WhereTo;