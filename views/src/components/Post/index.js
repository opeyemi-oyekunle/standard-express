import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPosts} from '../../actions/posts'

class Post extends Component{
  componentWillMount(){
    this.props.getPosts()
  }
  render(){
    console.log(this.props);
    return(
      <div>Post</div>
    )
  }
}

const mapStateToProps = (state)=>{
  return state
}

export default connect(mapStateToProps, {getPosts})(Post)
