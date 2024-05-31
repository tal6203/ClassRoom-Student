import React, { Component } from 'react';
import { connect } from 'react-redux';
import { finish_update } from './action';
import axios from 'axios';

class StudentEditForm extends Component {
    constructor(props) {
        super(props);

        const { first_name, last_name, avg_grade, gender } = this.props.student;

        this.state = {
            first_name,
            last_name,
            avg_grade,
            gender,
            isModalOpen: true,
        };
    }

    componentDidMount() {
      if (this.state.isModalOpen && document.getElementById('editModal')) {
        this.modalInstance = window.M.Modal.init(document.getElementById('editModal'));
        this.modalInstance.open();
        // Handle scroll behavior
        document.body.style.overflow = 'hidden';
      }
    }
  
    componentWillUnmount() {
      // Reset scroll behavior when component is unmounted
      document.body.style.overflow = 'auto';
    }
  
    handleCloseModal = () => {
      this.setState({ isModalOpen: false });
      if (this.modalInstance) {
        this.modalInstance.close();
        // Restore scroll behavior when closing modal
        document.body.style.overflow = 'auto';
      }
    };

  
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        e.preventDefault();
        const { student } = this.props;
        const updatedStudent = {
            ...student,
            ...this.state
        };

        axios.put(`http://localhost:8050/api/student/${student.id}`, updatedStudent)
            .then((res) => {
                this.props.finishEdit(updatedStudent);
            })
            .catch((error) => {
                console.log("API error:", error);
            });
        // Reset the form
        this.setState({
            first_name: '',
            last_name: '',
            avg_grade: 0,
            gender: ''
        });
    };

    render() {
        return (
          <div className="modal" id='editModal'>
            <div className="modal-content">
              <h4>Edit Student: {this.props.student.id}</h4>
              <form onSubmit={this.handleSubmit}>
                <div className="input-field">
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="first_name" className="active">First Name</label>
                </div>
                <div className="input-field">
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="last_name" className="active">Last Name</label>
                </div>
                <div className="input-field">
                  <input
                    type="number"
                    step="any"
                    id="avg_grade"
                    name="avg_grade"
                    value={this.state.avg_grade}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="avg_grade" className="active">Average Grade</label>
                </div>
                <div className="input-field">
                  <p>
                    <label>
                      <input
                        name="gender"
                        type="radio"
                        onChange={() => this.handleChange({ target: { name: 'gender', value: 'MALE' } })}
                        checked={this.state.gender === 'MALE'}
                        required
                      />
                      <span>MALE</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input
                        name="gender"
                        type="radio"
                        onChange={() => this.handleChange({ target: { name: 'gender', value: 'FEMALE' } })}
                        checked={this.state.gender === 'FEMALE'}
                      />
                      <span>FEMALE</span>
                    </label>
                  </p>
                </div>
                <div className="modal-footer">
                <div className='center-align'>
                  <button className="btn waves-effect waves-light green" type="submit">
                    Save
                    <i className="material-icons right">done</i>
                  </button>
                   &nbsp;&nbsp;&nbsp;
                  <button className="btn waves-effect waves-light red modal-close" onClick={this.handleCloseModal} type="button">
                    Cancel
                    <i className="material-icons right">close</i>
                  </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        finish_update: (student) => dispatch(finish_update(student))
    };
};

export default connect(null, mapDispatchToProps)(StudentEditForm);