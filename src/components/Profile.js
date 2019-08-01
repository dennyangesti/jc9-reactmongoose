import React, { Component } from 'react'
import axios from '../config/axios';
import { Jumbotron } from 'reactstrap';
import { connect } from 'react-redux'

class Profile extends Component {
   state = {
      data: undefined
   }


   componentDidMount() {
      // Get Profile
      axios.get('/users/' + this.props.data_id)
         .then(res => {
            this.setState({ data: res.data });

         })
   }


   render() {
      if (this.state.data) {
         return (
            <div className="container" style={{ marginTop: '80px' }}>
               <Jumbotron >
                  <div className='d-flex justify-content-center'>
                     <img
                        src={'https://dennyreactmongoose.herokuapp.com/users/' + this.state.data._id + '/avatar'}
                        alt="Please choose your avatar"
                        key={new Date()}
                        className='img-thumbnail' />

                  </div>
                  <div className='d-flex justify-content-center'>
                     <h1 className="display-3">Hello, {this.props.data_name}!</h1>
                     <p className="lead"></p>
                  </div>
               </Jumbotron>
            </div>
         )
      }

      return <h1>Loading</h1>
   }
}

const mps = state => {
   return {
      data_id: state.auth.id,
      data_name: state.auth.name

   }
}

export default connect(mps)(Profile)