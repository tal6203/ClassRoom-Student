import React, { Component } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import createClassImg from './img/createClassImg.png'
import { connect } from 'react-redux';
import { AddClassroom } from './action'


class createClass extends Component {
  state = {
    class_from_input: {
      number_of_students: 0,
      class_avg: 0,
      type_class: ""
    }
  }


  handleChange = (e) => {
    this.setState({
      class_from_input: {
        ...this.state.class_from_input,
        [e.target.name]: e.target.value
      }
    })

  }


  handleSubmit = (e) => {
    e.preventDefault();
    /// make ajax & sweet alert
    axios.post('http://localhost:8050/api/classroom', this.state.class_from_input).then((res) => {
      Swal.fire(
        'Good job!',
        'The class is created',
        'success'
      )
      this.props.add_classRoom(res.data);


    })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong!',
          text: `${error}`,
        })
      });


    this.setState({
      class_from_input: {
        number_of_students: 0,
        class_avg: 0,
        type_class: ""
      }
    })
  }

  render() {
    return (
      <div className="container">
        <h4 className="center" style={{ textDecoration: 'underline', fontSize: '36px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Create Class</h4>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card hoverable" style={{ background: `url(${createClassImg}) `, backgroundPosition: 'center', backgroundSize: 'cover', border: ' 5px solid #333', maxWidth: '700px' }}>
            <div className="card-content black-text">
              <form className="col s12 m8 offset-m2" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="input-field col s12 m6">
                    <b>Number of Students:</b>
                    <input
                      style={{ textAlign: 'center' }}
                      className="validate"
                      name="number_of_students"
                      id="number_of_students"
                      type="number"
                      min={0}
                      max={0}
                      onChange={this.handleChange}
                      value={this.state.class_from_input.number_of_students}
                      required
                    />
                  </div>
                  <div className="input-field col s12 m6">
                    <b>Class Average:</b>
                    <input
                      style={{ textAlign: 'center' }}
                      className="validate"
                      name="class_avg"
                      id="class_avg"
                      type="number"
                      min={0}
                      max={0}
                      onChange={this.handleChange}
                      value={this.state.class_from_input.class_avg}
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <b>Class Type:</b>
                    <select
                      className="browser-default blue darken-3t"
                      style={{ textAlign: 'center' }}
                      name="type_class"
                      id="type_class"
                      onChange={this.handleChange}
                      value={this.state.class_from_input.type_class}
                      required
                    >
                      <option value="">Choose a class type...</option>
                      <option value="EXTERNAL">EXTERNAL</option>
                      <option value="REGULAR">REGULAR</option>
                    </select>
                  </div>
                </div>
                <button className="btn waves-effect blue darken-3t" type="submit">Create Class <i className="material-icons right">send</i></button>
              </form>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
const mapStateToProps = (store_state, current_props) => {
  return {
    ...current_props, student_classroom: store_state.studentClassRoom
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    add_classRoom: (class_room) => dispatch(AddClassroom(class_room))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(createClass)



