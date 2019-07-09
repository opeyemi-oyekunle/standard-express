import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProfile} from '../../actions/profile'

class Profile extends Component{
  componentWillMount(){
    this.props.getProfile()
  }
  render(){
    if(this.props.profile.length >= 1){
      var profile = this.props.profile.map((item, key) => {
      if (!item.fname) item.fname = 'No first name supplied'
      if (!item.lname) item.lname = 'No last name supplied'
      return (
        <tr key={key}>
          <td>{item.fname}</td>
          <td>{item.lname}</td>
          <td>{item.address}</td>
          <td>{item.state}</td>
          <td>{item.country}</td>
        </tr>
      )
    })
    }
    return(
      <div>
        <h3>PROFILE</h3>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>State</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {profile}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    profile:state.profile
  }
}

export default connect(mapStateToProps, {getProfile})(Profile)
