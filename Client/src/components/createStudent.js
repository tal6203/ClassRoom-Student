import React, { Component } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import createStudentImg from './img/createStudentImg.jpg';
import { connect } from 'react-redux';
import { AddStudentsClassRoom } from './action'


class createStudent extends Component {
    state = {
        student_from_input: {
            first_name: "",
            last_name: "",
            avg_grade: 0,
            gender: "",
            class_id: ""
        },
        option_for_class: []
    }


    handleChange = (e) => {
        this.setState({
            student_from_input: {
                ...this.state.student_from_input,
                [e.target.name]: e.target.value
            }
        })

    }


    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8050/api/classroom/createStudentGetDTO', this.state.student_from_input).then((res) => {
            Swal.fire(
                'Good job!',
                'The student is created',
                'success'
            )
            this.props.add_student(res.data)
        }).catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: `${error}`,
            })
        });
        this.setState({
            student_from_input: {
                first_name: "",
                last_name: "",
                avg_grade: 0,
                gender: "",
                class_id: ""
            },
        })
    }



    render() {

        const options = this.state.option_for_class.map(obj => (
            <option key={obj.id} value={obj.id}>{obj.id}</option>
        ));



        return (

            <div className="container">
                <h4 className="center" style={{ textDecoration: 'underline', fontSize: '36px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Create Student</h4>
                <div style={{display:'flex',justifyContent:"center",alignItems:'center'}}>
                    <div className="card hoverable" style={{ background: `url(${createStudentImg}) `, backgroundPosition: 'center', backgroundSize: 'cover', border: '5px solid #333', padding: '20px', maxWidth: '700px' }}>
                        <div className="card-content black-text">
                            <form className="col s12 m8 offset-m2" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12 m6">
                                        <input className="validate" id="first_name" name="first_name" type="text" onChange={this.handleChange}
                                            value={this.state.student_from_input.first_name} required />
                                        <label htmlFor="first_name" style={{ color: 'black', fontWeight: 'bolder' }}>First Name:</label>
                                    </div>
                                    <div className="input-field col s12 m6">
                                        <input className="validate" id="last_name" name="last_name" type="text" onChange={this.handleChange}
                                            value={this.state.student_from_input.last_name} required />
                                        <label htmlFor="last_name" style={{ color: 'black', fontWeight: 'bolder' }}>Last Name:</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 m6">
                                        <b>Average Grade:</b>
                                        <input
                                            style={{ textAlign: 'center' }}
                                            name="avg_grade"
                                            className="validate"
                                            type="number"
                                            onChange={this.handleChange}
                                            step="any"
                                            value={this.state.student_from_input.avg_grade}
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div className="input-field col s12 m6">
                                        <b>Class ID:</b>
                                        <select
                                            style={{ textAlign: 'center' }}
                                            className="browser-default"
                                            name="class_id"
                                            onChange={this.handleChange}
                                            value={this.state.student_from_input.class_id}
                                            required
                                        >
                                            <option value="">Choose a class...</option>
                                            {options}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <div className="input-field">
                                            <span style={{ color: 'black', fontWeight: 'bolder' }}>gender:</span>
                                            <span>
                                                <label>
                                                    <input name="gender" type="radio" onChange={this.handleChange}
                                                        checked={this.state.student_from_input.gender === 'MALE'}
                                                        value="MALE" required />
                                                    <span style={{ color: 'black', fontWeight: 'bolder' }}>MALE</span>
                                                </label>
                                            </span>
                                            <span>
                                                <label>
                                                    <input name="gender" type="radio" onChange={this.handleChange}
                                                        checked={this.state.student_from_input.gender === 'FEMALE'}
                                                        value="FEMALE" />
                                                    <span style={{ color: 'black', fontWeight: 'bolder' }}>FEMALE</span>
                                                </label>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn waves-effect blue darken-3" type="submit">Create Student<i className="material-icons right">send</i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
    componentDidMount() {
        axios.get('http://localhost:8050/api/classroom')
            .then(res => {
                this.setState({
                    option_for_class: res.data
                });

            })
    }
}

const mapStateToProps = (store_state, current_props) => {
    return {
        ...current_props, student_classroom: store_state.studentClassRoom
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add_student: (student_classroom) => dispatch(AddStudentsClassRoom(student_classroom))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(createStudent)