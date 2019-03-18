import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class Default extends Component {
  render() {
    return (
      <div className="container">
    <div className="row">
        <div className="col-md-12">
            <div className="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div className="error-details">
                    Sorry, an error has occured, Requested page not found!
                </div>
                <div className="error-actions">
                <Link to="/">
                  <button 
                    className="btn btn-outline-danger text-uppercase px-7 py-2"  
                    type="button">
                    <span className="mx-2"><i className="fas fa-home"></i></span> Take Me Home
                  </button>
                </Link>
                          
                </div>
            </div>
        </div>
    </div>
</div>
     
    )
  }
}
