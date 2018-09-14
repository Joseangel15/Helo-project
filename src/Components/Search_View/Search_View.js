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
            idNew: '',
            usersPage: 16,
            btns: [],
            users: [],
            moreUsers: [],
            page: ''

        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleFilteredSearch = this.handleFilteredSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAddFriend = this.handleAddFriend.bind(this);
        this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
        this.showPage = this.showPage.bind(this);
    }

    componentDidMount() {

        //Mounts the user into the id state
        axios.get('/api/user').then(res => {
            this.setState({
                idNew: res.data[0].id

            })

            const { idNew } = this.state;

            const body = { idNew }

            //Mounts all users into the allusers state
            axios.post(`/api/allSearchedUsers`, body).then(res => {

                let newArray = [];

                for (let i = 0; i < 16; i++) {
                    newArray.push(res.data[i])
                }

                let numBtns = Math.ceil(res.data.length / 16);

                let Btns = [];

                for (var i = 2; i < numBtns + 1; i++) {
                    Btns.push(i)
                }

                this.setState({
                    allUsers: newArray,
                    btns: Btns,
                    users: newArray
                })

            })

            axios.post(`/api/allSearchedUsers`, body).then(res => {
                this.setState({
                    moreUsers: res.data
                })
            })

            this.showPage(1)
        })
    }

    handleFilter() {

        if (this.state.filter === 'first_name') {

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

        const { filter, nameInput, moreUsers } = this.state;

        let newArray3 = [];

        console.log(moreUsers)
        if (nameInput === '') {
            return
        }

        else if (filter === 'first_name') {

            for (var i = 0; i < moreUsers.length; i++) {

                if (moreUsers[i].first_name === nameInput) {

                    newArray3.push(moreUsers[i])

                }
            }
        } else if (filter === 'last_name') {

            for (var i = 0; i < moreUsers.length; i++) {

                if (moreUsers[i].last_name === nameInput) {

                    newArray3.push(moreUsers[i])

                }
            }
        }

        if (newArray3.length >= 16) {

            let newArray = [];

            for (let i = 0; i < 16; i++) {
                newArray.push(newArray3[i])
            }

            newArray3 = newArray;

            let numBtns = Math.ceil(newArray3.length / 16);

            let Btns = [];

            for (let i = 2; i < numBtns + 1; i++) {
                Btns.push(i)
            }

            this.setState({
                btns: Btns,
                allUsers: newArray3
            })
        } else {

            let numBtns = Math.ceil(newArray3.length / 16);

            let Btns = [];

            for (let i = 2; i < numBtns + 1; i++) {
                Btns.push(i)
            }

            this.setState({
                btns: Btns,
                allUsers: newArray3
            })
        }

    }

    handleAddFriend(first_name, last_name, id) {


        console.log(this.state.friend_fn)

        const body = { first_name, last_name, id };

        const { idNew } = this.state;

        const newBody = { idNew }

        if (first_name === this.state.nameInput || last_name === this.state.nameInput) {
            axios.post('/api/addFriend', body).then(res => {

                axios.post(`/api/allSearchedUsers`, newBody).then(res => {
                    console.log(res.data)
                    this.setState({
                        moreUsers: res.data
                    })
                    this.handleSearch()
                })
            })

        }

        else {
            axios.post('/api/addFriend', body).then(res => {

                axios.post(`/api/allSearchedUsers`, newBody).then(res => {
                    console.log(res.data)
                    this.setState({
                        moreUsers: res.data
                    })
                    console.log(this.state.page)
                    this.showPage(this.state.page)
                })

            })
        }
    }

    handleRemoveFriend(first_name, last_name) {

        const body = {
            first_name,
            last_name
        }

        const { idNew } = this.state;

        const newBody = { idNew }

        if (first_name === this.state.nameInput || last_name === this.state.nameInput ) {

            axios.post(`/api/deleteFriend`, body).then(res => {

                axios.post(`/api/allSearchedUsers`, newBody).then(res => {
                    console.log(res.data)
                    this.setState({
                        moreUsers: res.data
                    })
                    this.handleSearch()
                })
            })

        } else {

            axios.post(`/api/deleteFriend`, body).then(res => {

                axios.post(`/api/allSearchedUsers`, newBody).then(res => {
                    console.log(res.data)
                    this.setState({
                        moreUsers: res.data
                    })
                    console.log(this.state.page)
                    this.showPage(this.state.page)
                })
            })
        }

    }

    showPage(value) {

        let newArray2 = [];
        console.log(value)
        for (var i = ((value - 1) * 16); i < (value * 16); i++) {

            if (i < this.state.moreUsers.length) {
                newArray2.push(this.state.moreUsers[i]);
            }
        }

        this.setState({
            allUsers: newArray2,
            page: value
        })
    }

    render() {

        let page = this.state.btns.map((el, i) => {
            return (
                <div key={el + i} className='littleBtns'>
                    <button onClick={() => { this.showPage(el) }}>{el}</button>
                </div>
            )
        })


        const searches = this.state.allUsers.map(el => {
            console.log(this.state.allUsers[0].id)
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


                        {el.friendship === true ?
                            <button className='RemoveFriend' onClick={() => this.handleRemoveFriend(el.first_name, el.last_name, el.id)}>Remove Friend</button> :
                            <button className='AddFriend' onClick={() => this.handleAddFriend(el.first_name, el.last_name, el.id)}>Add Friend</button>}
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

                            <button className='pageBtn' onClick={() => this.showPage(1)}>Page 1</button>

                            <div className='allPageBtns'>
                                {page}
                            </div>

                        </div>

                        <div className='bottom'></div>

                    </div>

                </div>


            </div>
        )
    }
}

export default Search_View;
