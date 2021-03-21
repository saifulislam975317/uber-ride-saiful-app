import React from 'react';


const Destination = () => {

  return (

    <div className="form-container">
      <div className="form-details">

        <form className="form" >
          <label htmlFor="">pick from</label>
          <input type="text" name="from" placeholder='Pick From' />
          <label htmlFor="">pick to</label>
          <input type="text" name="to" placeholder='Pick To' />
          <input className="search-button" type="button" value="search"/>


        </form>
      </div>
    </div>
  );
};

export default Destination;