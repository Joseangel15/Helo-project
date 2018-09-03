import React, { Component } from 'react';
import './Search_Nav.css'


class Search_Nav extends Component {




    render() {

        return (
            <div className='navBox'>

                <div className='helHomFin'>
                    <div>
                        <h2 className='heloNav'>Helo</h2>
                    </div>

                    <div className='homeFin'>
                        <button className='homeBtn'></button>
                        <button className='findBtn'></button>
                    </div>
                </div>

                <div>
                    <h4 className='dashH4'>  Search  </h4>
                </div>

                <div>
                    <h4>Logout</h4>
                </div>

            </div>
        )
    }
}


export default Search_Nav;