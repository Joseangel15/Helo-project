import React, { Component } from 'react';
import './Search_View.css';
import SearchNav from '../Nav/Search_Nav';
import axios from 'axios';


class Search_View extends Component {
    constructor(props) {
        super(props)

        this.state = {

            allUsers: [],
            filter: 'first_name',
            nameInput: '',
            id: '',
            friended: [],
            thisPage: 1,
            usersPage: 16,

        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleFilteredSearch = this.handleFilteredSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    }

    componentDidMount() {

        //Mounts the user into the id state
        axios.get('/api/user').then(res => {
            this.setState({
                id: res.data[0].id

            })

            const { id } = this.state;

            const body = {id} 

            console.log(this.state.id)


            //Mounts all users into the allusers state
            axios.post(`/api/allSearchedUsers`, body).then(res => {
                this.setState({
                    allUsers: res.data,

                })
                console.log(this.state.allUsers)

                //mounts all my current friends into the friended state
                axios.get(`/api/allFriends/${id}`).then(res => {
                    this.setState({
                        friended: res.data
                    })
                    console.log(this.state.friended);
                })
            })
            console.log(this.state.id)
        })


    }

    handleFilter() {

        if(this.state.filter === 'first_name') {
            
            this.setState({
                filter: 'last_name'
            })
        } else {

            this.setState({
                filter: 'first_name'
            })
        }

        console.log(this.state.filter)

    }

    handleFilteredSearch(event) {
        this.setState({

            nameInput: event.target.value

        })
        console.log(event.target.value)

    }

    handleSearch() {

        const { filter, nameInput } = this.state;

        if (!nameInput) { return }

        const body = { filter, nameInput }

        console.log(body)


        if (filter === 'first_name') {
            axios.post('/api/getByName', body).then(res => {
                this.setState({
                    allUsers: res.data
                })
                console.log(res.data)
            })

        } else if (filter === 'last_name') {
            axios.post('/api/getByName', body).then(res => {
                this.setState({
                    allUsers: res.data
                })
                console.log(res.data)
            })

        }


    }

    handleAddFriend (first_name, last_name, id) {

        
        console.log(this.state.friend_fn)

        const body ={first_name, last_name, id};

        axios.post('/api/addFriend', body).then(res => {

        })

        this.setState({addRemove: 'Remove Friend'})

        this.componentDidMount()
    }

    handleRemoveFriend (first_name, last_name) {

        const body = {
            first_name,
            last_name
        }

        axios.post(`/api/deleteFriend`, body).then(res => {

        })

        this.componentDidMount()
    }

    

    render() {

        // let { thisPage, usersPage } = this.state;

        // let indexOfLastUser = currentPage * usersPage;
        // let indexOfFirstUser = indexOfLastUser - usersPage
        // let profiles = allUsers.slice(indexOfFirstUser, indexOfLastUser);
         

        const searches = this.state.allUsers.map(el => {


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
                            
                        
                            {el.friendship === true? 
                            <button className='RemoveFriend' onClick={() => this.handleRemoveFriend(el.first_name, el.last_name, el.id)}>Remove Friend</button> :
                            <button className='AddFriend' onClick={() => this.handleAddFriend(el.first_name, el.last_name, el.id)}>Add Friend</button> }
                    </div>
                </div>
            )
        })

        return (
            <div>

                <div className='NewgrayBackGround'>

                    <SearchNav />

                    <div className='searchBox'>

                        <div className='searchBtns'>

                            <select name="Search Options" id="" onChange={this.handleFilter}>

                                <option value="First Name" onChange={this.handleFilter}>First Name</option>
                                <option value="Last Name" onChange={this.handleFilter}>Last Name</option>

                            </select>

                            <input type="text" className='searchInput' name='nameInput' onChange={this.handleFilteredSearch} />

                            <button className='searchBtn' onClick={this.handleSearch}>Search</button>

                            <button className='resetBtn' onClick={this.componentDidMount}>Reset</button>

                        </div>

                        <div className='searchResults'>
                            {searches}
                        </div>

                        <div className='pagination'>



                        </div>

                    </div>

                </div>


            </div>
        )
    }
}

export default Search_View;
