import React, { Component } from 'react'
import axios from '../config/axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Home extends Component {
   state = {
      tasks: []
   }

   getTask = () => {
      // Get tasks
      axios.get(
         '/tasks/' + this.props.id
      ).then(res => {
         this.setState({ tasks: res.data })
      })
   }

   addTask = (userid) => {
      const description = this.task.value
      console.log(description)

      // Post task baru
      axios.post(
         '/tasks/' + userid,
         {
            description
         }

      ).then(() => {
         this.getTask()
      })

   }


   deleteTask = (task) => {
      axios.delete(
         '/tasks/' + task._id

      ).then(() => {
         this.getTask()
         console.log(task)
      })

   }

   finishTask = (task) => {
      const completed = !(task.completed)
      console.log(completed)

      axios.patch(
         '/tasks/' + this.props.id + '/' + task._id,
         {
            completed: true
         }

      ).then(() => {
         this.getTask()
      })

   }

   cancelTask = (task) => {
      const cancel = !(task.completed)
      console.log(cancel)

      axios.patch(
         '/tasks/' + this.props.id + '/' + task._id,
         {
            completed: false
         }

      ).then(() => {
         this.getTask()
      })

   }
   componentDidMount() {
      // Get Tasks
      this.getTask()
   }

   renderTasks = () => {

      const done = require('../image/checked.png')
      const clear = require('../image/clear.png')
      const reload = require('../image/reload.png')

      return this.state.tasks.map(item => {
         // Item belum selesai
         if (!item.completed) {
            return (
               <li className='list-group-item d-flex justify-content-between'>
                  <span>{item.description}</span>
                  <span>
                     <button onClick={() => this.finishTask(item)} className='btn btn-outline-primary'>
                        Done
                     </button>

                     <img
                        onClick={() => this.deleteTask(item)}
                        src={clear}
                        height={'10px'}
                        alt=''
                        className='ml-3 mb-4' />

                  </span>

               </li>
            )
         }

         // Item sudah selesai
         return (
            <li className='list-group-item d-flex justify-content-between '>
               <span>{item.description}</span>
               <span>
                  <img onDoubleClick={() => this.cancelTask(item)}
                     src={done}
                     height={'30px'}
                     alt='' />
                  <img
                     onClick={() => this.deleteTask(item)}
                     src={clear}
                     height={'10px'}
                     alt=''
                     className='ml-3 mb-4' />
               </span>
            </li>
         )
      })
   }

   render() {
      // Jika user sudah login
      if (this.props.id) {
         return (
            <div className="container" style={{ marginTop: '100px' }}>
               <h1 className="display-4 text-center animated bounce delay-1s">List Tasks</h1>
               <form className="form-group mt-5">
                  <input type="text" className="form-control" placeholder="What do you want to do ?" ref={input => this.task = input} />
               </form>
               <button type="submit" className="btn btn-block btn-primary mt-3" onClick={() => this.addTask(this.props.id)}>Up !</button>

               <ul className="list-group list-group-flush mb-5">
                  {this.renderTasks()}
               </ul>
            </div>
         )
      }

      return <Redirect to='/login' />

   }
}

const mps = state => {
   return {
      id: state.auth.id
   }
}

export default connect(mps)(Home)