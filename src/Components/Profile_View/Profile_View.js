import React, { Component } from 'react';
import ProfileNav from '../Nav/Profile_Nav';
import './Profile_View.css';
import axios from 'axios';
// import {Link} from 'react-router-dom';



class Profile_View extends Component {
    constructor(props){
        super(props)


        this.state = {

            allUserInfo: [],
            first_name: '',
            last_name: '',
            gender: '',
            hair_color: '',
            eye_color: '',
            hobby: '',
            birthday_day: '',
            birthday_month: '',
            birthday_year: '',
            picture: '',
            first_name2: '',
            last_name2: '',
            id: ''
        }


        this.handleUserInfoEdit = this.handleUserInfoEdit.bind(this);
        this.handleChangeInfo = this.handleChangeInfo.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount () {
        axios.get('/api/user').then(res => {
            this.setState({
                allUserInfo: res.data,
                first_name: res.data[0].first_name,
                last_name: res.data[0].last_name,
                gender: res.data[0].gender,
                hair_color: res.data[0].hair_color,
                eye_color: res.data[0].eye_color,
                hobby: res.data[0].hobby,
                birthday_day: res.data[0].birthday_day,
                birthday_month: res.data[0].birthday_month,
                birthday_year: res.data[0].birthday_year,
                picture: res.data[0].picture,
                first_name2: res.data[0].first_name,
                last_name2: res.data[0].last_name,
                id: res.data[0].id
                
            })
            console.log(this.state.allUserInfo)
            console.log(this.state.id)
        })
    }

    handleUserInfoEdit () {
        
        const { first_name, last_name, gender, hair_color, eye_color, hobby, birthday_day, birthday_month, birthday_year, id } = this.state;

        const body = {

            first_name,
            last_name,
            gender,
            hair_color,
            eye_color,
            hobby,
            birthday_day,
            birthday_month,
            birthday_year
        }

        axios.put(`/api/updateUser/${id}`, body).then(user => {

        });

        alert('Your profile has been updated');
    }

    handleChangeInfo  (event) {
        this.setState({  

            [event.target.name]: event.target.value

        })
        console.log(event.target.value)
    }


    render() {



        return (
            
            <div className='grayBackGround'>

                <ProfileNav />

                <div className='allBoxes'>

                    <div className='userAndBtns'>

                        <div className='nameAndPic'>

                            <div className='userPicProf'>

                                <img 
                                        src={this.state.picture} 
                                        alt=""
                                        className='truePic'/>

                            </div>

                            <div>

                                <h3 className='fullName'>{this.state.first_name2}</h3>

                                <h3 className='fullName'>{this.state.last_name2}</h3>

                            </div>

                        </div>

                        <div className='profileBtns'>

                            <button 
                                className='profUpdateBtn'
                                onClick={this.handleUserInfoEdit}
                                >
                                
                                Update
                                
                            </button>

                            <button 
                                className='profCancelBtn'
                                onClick={this.componentDidMount}>
                                
                                Cancel
                                
                                </button>

                        </div>

                    </div>

                    <div className='inputMania'>

                        <div>

                            <h6 className='h6Names'>First Name</h6>
                                <input 
                                    type="text" 
                                    className='profileInputs' 
                                    value={this.state.first_name}
                                    name='first_name'
                                    onChange={this.handleChangeInfo}/>

                            <h6 className='h6Names'>Last Name</h6>
                                <input 
                                        type="text" 
                                        className='profileInputs' 
                                        value={this.state.last_name}
                                        name='last_name'
                                        onChange={this.handleChangeInfo}/>

                            <h6 className='h6Names'>Gender</h6>
                                <select 
                                    id="" 
                                    className='profileSelects'
                                    name='gender'
                                    value={this.state.gender}
                                    onChange={this.handleChangeInfo}>

                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                            <h6 className='h6Names'>Hair Color</h6>
                                <select 
                                    name="hair_color" 
                                    id="" 
                                    className='profileSelects'
                                    onChange={this.handleChangeInfo}
                                    value={this.state.hair_color}>

                                    <option value="select">select</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Black">Black</option>
                                    <option value="Blonde">Blonde</option>
                                    <option value="Red">Red</option>
                                    <option value="White">White</option>

                                </select>

                            <h6 className='h6Names'>Eye Color</h6>
                                <select 
                                    name="eye_color" 
                                    id="" 
                                    className='profileSelects'
                                    onChange={this.handleChangeInfo}
                                    value={this.state.eye_color}>

                                    <option value="select">select</option>
                                    <option value="Brown">Brown</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Black">Black</option>
                                    <option value="Green">Green</option>
                                    <option value="Amber">Amber</option>
                                    <option value="Hazel">Hazel</option>

                                </select>

                        </div>

                        <div>

                            <h6 className='h6Names'>Hobby</h6>
                                <select 
                                    name="hobby" 
                                    id="" 
                                    className='profileSelects'
                                    onChange={this.handleChangeInfo}
                                    value={this.state.hobby}>

                                    <option value="select">select</option>
                                    <option value="Video Games">Video Games</option>
                                    <option value="Reading">Reading</option>
                                    <option value="Traveling">Traveling</option>
                                    <option value="Fishing">Fishing</option>
                                    <option value="Crafts">Crafts</option>
                                    <option value="Television">Television</option>
                                    <option value="Music">Music</option>
                                    <option value="Gardening">Gardening</option>

                                </select>

                            <h6 className='h6Names'>Birthday Day</h6>
                                <select 
                                    name="birthday_day"
                                    id="" 
                                    className='profileSelects'
                                    onChange={this.handleChangeInfo}
                                    value={this.state.birthday_day}>

                                    <option value="select">select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>

                                </select>

                            <h6 className='h6Names'>Birthday Month</h6>
                                <select 
                                    name="birthday_month" 
                                    id="" 
                                    className='profileSelects'
                                    onChange={this.handleChangeInfo}
                                    value={this.state.birthday_month}>

                                    <option value="select">select</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>

                                </select>

                            <h6 className='h6Names'>Birthday Year</h6>
                                <select 
                                    name="birthday_year" 
                                    id="" 
                                    className='profileSelects'
                                    onChange={this.handleChangeInfo}
                                    value={this.state.birthday_year}>

                                    <option value="select">select</option>
                                    <option value="2013">2013</option>
                                    <option value="2012">2012</option>
                                    <option value="2011">2011</option>
                                    <option value="2010">2010</option>
                                    <option value="2009">2009</option>
                                    <option value="2008">2008</option>
                                    <option value="2007">2007</option>
                                    <option value="2006">2006</option>
                                    <option value="2005">2005</option>
                                    <option value="2004">2004</option>
                                    <option value="2003">2003</option>
                                    <option value="2002">2002</option>
                                    <option value="2001">2001</option>
                                    <option value="2000">2000</option>
                                    <option value="1999">1999</option>
                                    <option value="1998">1998</option>
                                    <option value="1997">1997</option>
                                    <option value="1996">1996</option>
                                    <option value="1995">1995</option>
                                    <option value="1994">1994</option>
                                    <option value="1993">1993</option>
                                    <option value="1992">1992</option>
                                    <option value="1991">1991</option>
                                    <option value="1990">1990</option>
                                    <option value="1989">1989</option>
                                    <option value="1988">1988</option>
                                    <option value="1987">1987</option>
                                    <option value="1986">1986</option>
                                    <option value="1985">1985</option>
                                    <option value="1984">1984</option>
                                    <option value="1983">1983</option>
                                    <option value="1982">1982</option>
                                    <option value="1981">1981</option>
                                    <option value="1980">1980</option>
                                    <option value="1979">1979</option>
                                    <option value="1978">1978</option>
                                    <option value="1977">1977</option>
                                    <option value="1976">1976</option>
                                    <option value="1975">1975</option>
                                    <option value="1974">1974</option>
                                    <option value="1973">1973</option>
                                    <option value="1972">1972</option>
                                    <option value="1971">1971</option>
                                    <option value="1970">1970</option>
                                    <option value="1969">1969</option>
                                    <option value="1968">1968</option>
                                    <option value="1967">1967</option>
                                    <option value="1966">1966</option>
                                    <option value="1965">1965</option>
                                    <option value="1964">1964</option>
                                    <option value="1963">1963</option>
                                    <option value="1962">1962</option>
                                    <option value="1961">1961</option>
                                    <option value="1960">1960</option>
                                    <option value="1959">1959</option>
                                    <option value="1958">1958</option>
                                    <option value="1957">1957</option>
                                    <option value="1956">1956</option>
                                    <option value="1955">1955</option>
                                    <option value="1954">1954</option>
                                    <option value="1953">1953</option>
                                    <option value="1952">1952</option>
                                    <option value="1951">1951</option>
                                    <option value="1950">1950</option>
                                    <option value="1949">1949</option>
                                    <option value="1948">1948</option>
                                    <option value="1947">1947</option>
                                    <option value="1946">1946</option>
                                    <option value="1945">1945</option>
                                    <option value="1944">1944</option>
                                    <option value="1943">1943</option>
                                    <option value="1942">1942</option>
                                    <option value="1941">1941</option>
                                    <option value="1940">1940</option>
                                    <option value="1939">1939</option>
                                    <option value="1938">1938</option>
                                    <option value="1937">1937</option>
                                    <option value="1936">1936</option>
                                    <option value="1935">1935</option>
                                    <option value="1934">1934</option>
                                    <option value="1933">1933</option>
                                    <option value="1932">1932</option>
                                    <option value="1931">1931</option>
                                    <option value="1930">1930</option>
                                    <option value="1929">1929</option>
                                    <option value="1928">1928</option>
                                    <option value="1927">1927</option>
                                    <option value="1926">1926</option>
                                    <option value="1925">1925</option>
                                    <option value="1924">1924</option>
                                    <option value="1923">1923</option>
                                    <option value="1922">1922</option>
                                    <option value="1921">1921</option>
                                    <option value="1920">1920</option>
                                    <option value="1919">1919</option>
                                    <option value="1918">1918</option>
                                    <option value="1917">1917</option>
                                    <option value="1916">1916</option>
                                    <option value="1915">1915</option>
                                    <option value="1914">1914</option>
                                    <option value="1913">1913</option>
                                    <option value="1912">1912</option>
                                    <option value="1911">1911</option>
                                    <option value="1910">1910</option>
                                    <option value="1909">1909</option>
                                    <option value="1908">1908</option>
                                    <option value="1907">1907</option>
                                    <option value="1906">1906</option>
                                    <option value="1905">1905</option>

                                </select>

                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Profile_View;
