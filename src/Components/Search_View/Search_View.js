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
            addRemove: 'Remove Friend'

        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleFilteredSearch = this.handleFilteredSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handleAtClick = this.handleAtClick.bind(this);
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    }

    componentDidMount() {


        axios.get('/api/user').then(res => {
            this.setState({
                id: res.data[0].id

            })

            const { id } = this.state;

            console.log(this.state.id)

            const body = {

                id,
            }

            axios.post(`/api/allSearchedUsers`, body).then(res => {
                this.setState({
                    allUsers: res.data,


                })
                console.log(this.state.allUsers)

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

        const { filter, nameInput, id } = this.state;

        if (!nameInput) { return }

        const body = {

            id,
            nameInput,


        }
        console.log(body)


        if (filter === 'first_name') {
            axios.post('/api/getByFirstName', body).then(res => {
                this.setState({
                    allUsers: res.data
                })
                console.log(res.data)
            })

        } else if (filter === 'last_name') {
            axios.post('/api/getByLastName', body).then(res => {
                this.setState({
                    allUsers: res.data
                })
                console.log(res.data)
            })

        }


    }

    handleAddFriend (first_name, last_name) {

        
        console.log(this.state.friend_fn)

        const { id } = this.state;

        const body ={first_name, last_name, id};

        axios.post('/api/addFriend', body).then(res => {

        })

        this.setState({addRemove: 'Remove Friend'})


    }

    handleRemoveFriend (first_name, last_name) {

        const body = {
            first_name,
            last_name
        }

        axios.post(`/api/deleteFriend`, body).then(res => {

        })
    }

    handleAtClick  (first_name, last_name) {

        if (this.state.addRemove === 'Add Friend') {
            this.handleAddFriend(first_name, last_name)
        } else {
            this.handleRemoveFriend(first_name, last_name);
        }
    }

    render() {

        

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
                        <button 
                            className={this.state.addRemove}
                            onClick={() => this.handleAtClick(el.first_name, el.last_name, el.id)}
                            >
                            
                            {this.state.addRemove}
                            
                        </button>
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
