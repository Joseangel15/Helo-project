import React, {Component} from 'react';
import './Search_View.css';
import SearchNav from '../Nav/Search_Nav';


class Search_View extends Component {



    render() {
        return(
            <div>


                <div className='grayBackGround'>
                
                    <SearchNav />

                    <div className='searchBox'>

                        <div className='searchBtns'>

                            <select name="Search Options" id="">
                                <option value="First Name">First Name</option>
                                <option value="Last Name">Last Name</option>
                                <option value="Gender">Gender</option>
                                <option value="Hair Color">Hair Color</option>
                                <option value="Eye Color">Eye Color</option>
                                <option value="Hobby">Hobby</option>
                                <option value="Birthday Day">Birthday Day</option>
                                <option value="Birthday Month">Birthday Month</option>
                                <option value="Birthday Year">Birthday Year</option>
                            </select>

                            <input type="text" className='searchInput'/>

                            <button className='searchBtn'>Search</button>

                            <button className='resetBtn'>Reset</button>

                        </div>

                        <div>

                        </div>

                    </div>

                </div>


            </div>
        )    
    }
}

export default Search_View;
