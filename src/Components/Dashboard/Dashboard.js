import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import './Dashboard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';




class Dashboard extends Component {
    constructor(props) {
        super(props)


        this.state = {


            userInfo: [],
            userPic: [],
            first_name: '',
            last_name: '',
            Ugender: '',
            hair_color: '',
            eye_color: '',
            hobby: '',
            birthday_day: '',
            birthday_month: '',
            birthday_year: '',
            picture: '',
            allUsers: [],
            id: '',
            filtered: '',
            noRecomm: 'No Recommendations',

        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
    }

    componentDidMount() {
        axios.get('/api/user').then(res => {
            this.setState({
                userInfo: res.data,
                first_name: res.data[0].first_name,
                last_name: res.data[0].last_name,
                id: res.data[0].id,
                Ugender: res.data[0].gender,
                hair_color: res.data[0].hair_color,
                eye_color: res.data[0].eye_color,
                hobby: res.data[0].hobby,
                birthday_day: res.data[0].birthday_day,
                birthday_month: res.data[0].birthday_month,
                birthday_year: res.data[0].birthday_year,
                

            })
            console.log(this.state.userInfo)



            const { id } = this.state

            const body = {

                id,
            }

            console.log(body)

            axios.post(`/api/allUsers`, body).then(res => {
                this.setState({
                    allUsers: res.data
                })
                console.log(this.state.allUsers)
            })

            console.log(this.state.userInfo)
            console.log(this.state.id)
        })

        axios.get('/api/userPic').then(res => {
            this.setState({
                userPic: res.data[0].picture
            })
            console.log(res.data)

        })

    }

    handleChange(event) {


        this.setState({

            filtered: event.target.value,

        })


        console.log(event.target.value)

        const { id } = this.state

        const body = {

            id,
        }

        axios.post('/api/allRecommended', body).then(res => {

            this.setState({

                allUsers: res.data
    
            })

            const { Ugender, allUsers, userInfo, filtered, first_name, last_name, hair_color, eye_color, hobby, birthday_day, birthday_month, birthday_year } = this.state


            let genderFilter = allUsers.filter(function (item) {
                return item[filtered] === Ugender
            });

            let firstNameFilter = allUsers.filter(function (item) {
                return item[filtered] === first_name
            });

            let lastNameFilter = allUsers.filter(function (item) {
                return item[filtered] === last_name
            });

            let hairColorFilter = allUsers.filter(function (item) {
                return item[filtered] === hair_color
            });

            let eyeColorFilter = allUsers.filter(function (item) {
                return item[filtered] === eye_color
            });

            let hobbyFilter = allUsers.filter(function (item) {
                return item[filtered] === hobby
            });

            let birthdayDayFilter = allUsers.filter(function (item) {
                return item[filtered] === birthday_day
            }); 

            let birthdayMonthFilter = allUsers.filter(function (item) {
                return item[filtered] === birthday_month
            });

            let birthdayYearFilter = allUsers.filter(function (item) {
                return item[filtered] === birthday_year
            });


            if (filtered === 'gender') {
                if (userInfo[0].gender === Ugender) {
                    return this.setState({ allUsers: genderFilter })
                }
            } else if (filtered === 'first_name') {
                if (userInfo[0].first_name === first_name) {
                    return this.setState({ allUsers: firstNameFilter})   
                } else {
                    return 'No Recommendations'
                }
            } else if (filtered === 'last_name') {
                if (userInfo[0].last_name === last_name) {
                    return this.setState({ allUsers: lastNameFilter })
                }
            } else if (filtered === 'hair_color') {
                if (userInfo[0].hair_color === hair_color) {
                    return this.setState({ allUsers: hairColorFilter })
                }
            } else if (filtered === 'eye_color') {
                if (userInfo[0].eye_color === eye_color) {
                    return this.setState({ allUsers: eyeColorFilter })
                }
            } else if (filtered === 'hobby') {
                if (userInfo[0].hobby === hobby) {
                    return this.setState({ allUsers: hobbyFilter })
                }
            } else if (filtered === 'birthday_day') {
                if (userInfo[0].birthday_day === birthday_day) {
                    return this.setState({ allUsers: birthdayDayFilter })
                }
            } else if (filtered === 'birthday_month') {
                if (userInfo[0].birthday_month === birthday_month) {
                    return this.setState({ allUsers: birthdayMonthFilter })
                }
            } else if (filtered === 'birthday_year') {
                if (userInfo[0].birthday_year === birthday_year) {
                    return this.setState({ allUsers: birthdayYearFilter })
                }
            } 

            
            console.log(this.state.allUsers)
        


        })

    }

    handleAddFriend (first_name, last_name, id) {

        console.log(this.state.friend_fn)

        const body ={first_name, last_name, id};

        axios.post('/api/addFriend', body).then(res => {

        })

        this.setState({addRemove: 'Remove Friend'})

        this.componentDidMount()
    }
    

render() {
    
    
        const users = this.state.allUsers.map(el => {

            
            console.log(this.state.userInfo)
            return (
                <div className='userCard' key={el.id}>
                    <div className='nameAndPic'>
                        <div className='userPic3'>

                            <img src={el.picture} alt="" className='truePic3' />

                        </div>

                        <div className='fullName2'>

                            <h5 className='firstName1'>{el.first_name}</h5>
                            <h5 className='lastName1'>{el.last_name}</h5>

                        </div>

                    </div>

                    <div className='btnBox'>
                        <button className='AddFriend' onClick={() => this.handleAddFriend(el.first_name, el.last_name, el.id)}>Add Friend</button>
                    </div>
                </div>
            )
        }) 
               
    

        return (
            <div className='grayBackGround'>

                <Nav />

                <div className='allBoxes'>

                    <div className='userPageInfo'>

                        <div className='userInfoBox'>

                            <div className='userPic'>
                                <img
                                    src={this.state.userPic}
                                    alt=""
                                    className='truePic' />
                            </div>

                            <div>
                                <h3 className='userName'>{this.state.first_name}</h3>
                                <h3 className='userName'>{this.state.last_name}</h3>
                                <Link to='/Profile_View'><button
                                    className='editProfBtn'
                                >

                                    Edit Profile

                                    </button></Link>
                            </div>

                        </div>

                        <div className='pageInfoBox'>
                            <p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
                        </div>

                    </div>

                    <div className='recommendedFriBox'>

                        <div className='recommended'>

                            <h3>Recommended Friends</h3>

                            <div className='filterSelector'>

                                <h5>Sorted by</h5>

                                <select
                                    name='filtered'
                                    id="" className='select'
                                    onChange={this.handleChange}
                                    value={this.state.filtered}>

                                    <option value='select'>Select</option>
                                    <option value="first_name" >First Name</option>
                                    <option value="last_name" >Last Name</option>
                                    <option value="gender" >Gender</option>
                                    <option value="hair_color" >Hair Color</option>
                                    <option value="eye_color" >Eye Color</option>
                                    <option value="hobby" >Hobby</option>
                                    <option value="birthday_day" >Birth Day</option>
                                    <option value="birthday_month" >Birth Month</option>
                                    <option value="birthday_year" >Birth Year</option>

                                </select>

                            </div>

                        </div>

                        <div className='recommendedResults'>
                           {users} 
                            
                        </div>

                    </div>

                </div>

            </div>
        )
    }
}

export default Dashboard;