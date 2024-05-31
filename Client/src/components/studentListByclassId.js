
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { setStudentsClassRoom, remove_student, start_update, finish_update } from './action'
import classImg from './img/class.jpeg'
import studnetImg from './img/student.jpg'
import StudentEditForm from './StudentEditForm'
import Swal from 'sweetalert2';


class studentListByclassId extends Component {
    state = {
        deletedStudentId: null,
        editingStudentId: null
    };
    componentDidMount() {
        const classId = this.props.match.params.class_id;
        if (this.props.student_classroom.length === 0 || parseInt(classId) !== this.props.student_classroom.classRoom.id) {
            this.fetchData();
        }
    }



    handleDelete = (studentId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to delete this student?!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8050/api/student/${studentId}`)
                    .then((res) => {
                        Swal.fire(
                            'Student deleted successfully',
                            'success',
                            'success'
                        );
                        this.props.remove_student(res.data);
                        this.setState({ deletedStudentId: studentId });
                        this.fetchData();

                    })
                    .catch((error) => {
                        console.log('API error:', error);
                    });
            }
        });
    };



    startEdit = (studentId) => {
      if(document.getElementById('editModal')){
        const modalInstance = window.M.Modal.init(document.getElementById('editModal'));
        modalInstance.open();
      }
        this.setState({ editingStudentId: studentId });
    }


    finishEdit = (student) => {
        this.props.finish_update(student);
        this.setState({ editingStudentId: null });
        this.fetchData();
    }

    fetchData = () => {
        const classId = this.props.match.params.class_id;
        axios.get(`http://localhost:8050/api/classroom/getMyDTO/${classId}`)
            .then((res) => {
                this.props.save_data(res.data);
            })
            .catch((error) => {
                console.log('API error:', error);
            });
    };




    render() {

        const class_room = this.props.student_classroom.classRoom != null ? (
            <div className="row center-align">
              <div className="col s12 m4 offset-m4">
                <div
                  className="card hoverable z-depth-5"
                  style={{
                    background: `url(${classImg}) center`,
                    backgroundSize: 'cover',
                    border: '5px solid black',
                  }}
                >
                  <div className="card-content black-text">
                    <span
                      className="card-title"
                      style={{ backgroundColor: 'rgba(227,189,40,0.8)',fontWeight:'normal' }}
                    >
                      ID class: {this.props.student_classroom.classRoom.id}
                    </span>
                    <p
                      className="card-title"
                      style={{ backgroundColor: 'rgba(227,189,40,0.8)',fontWeight:'normal' }}
                    >
                      number of students in the class:{' '}
                      {this.props.student_classroom.classRoom.number_of_students}
                    </p>
                    <p
                      className="card-title"
                      style={{ backgroundColor: 'rgba(227,189,40,0.8)',fontWeight:'normal' }}
                    >
                      Class average:{' '}
                      {this.props.student_classroom.classRoom.class_avg}
                    </p>
                    <p
                      className="card-title"
                      style={{ backgroundColor: 'rgba(227,189,40,0.8)',fontWeight:'normal' }}
                    >
                      Class type:{' '}
                      {this.props.student_classroom.classRoom.type_class}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>Loading Class Room</div>
          );
      
          const { deletedStudentId } = this.state;
          const { student_classroom } = this.props;
          const student_list = student_classroom && student_classroom.studentList;
          const filteredStudentList =
            deletedStudentId && student_list
              ? student_list.filter((student) => student.id !== deletedStudentId)
              : student_list;
      
          const students = filteredStudentList != null ? (
            filteredStudentList.map((student) => {
                return (
                  <div className="col s12 m6 l4" key={student.id}>
                    <div
                      className="card hoverable z-depth-5"
                      style={{
                        background: `url(${studnetImg}) center`,
                        backgroundSize: 'cover',
                        border: '5px solid black',
                        padding: '10px',
                        width: '100%',
                      }}
                    >
                      <div className="card-content black-text">
                        <span
                          className="card-title"
                          style={{ backgroundColor: 'rgba(227,189,40,0.8)' }}
                        >
                          ID student: {student.id}
                        </span>
                        <p
                          style={{
                            backgroundColor: 'rgba(227,189,40,0.8)',
                            fontSize: '18px',
                          }}
                        >
                          Full name: {student.first_name} {student.last_name}
                        </p>
                        <p
                          style={{
                            backgroundColor: 'rgba(227,189,40,0.8)',
                            fontSize: '18px',
                          }}
                        >
                          Gender: {student.gender}
                        </p>
                        <p
                          style={{
                            backgroundColor: 'rgba(227,189,40,0.8)',
                            fontSize: '18px',
                          }}
                        >
                          Average grades: {student.avg_grade}
                        </p>
                        <p
                          style={{
                            backgroundColor: 'rgba(227,189,40,0.8)',
                            fontSize: '18px',
                          }}
                        >
                          Class: {student.class_id}
                        </p>
                      </div>
                      <div className="card-action">
                        <span style={{ display: 'inline-flex', gap: '5px' }}>
                          <button
                            className="btn-floating btn-medium waves-effect yellow"
                            onClick={() => this.startEdit(student.id)}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                          <button
                            className="btn-floating btn-medium waves-effect red"
                            onClick={() => this.handleDelete(student.id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              
            })
          ) : (
            <div style={{display:'flex',justifyContent:'center'}}>
            <div
              style={{
                width:'500px',
                fontSize: '24px',
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(227, 189, 40, 0.8)',
                borderRadius: '10px',
                color: 'black',
                border: '5px solid black',
              }}
            >
              A class without students.....
            </div>
            </div>
          );

          const editingStudent = student_list ? (
            student_list.map((student) => {
              if (student.id === this.state.editingStudentId) {
                return (
                  <div key={student.id} className="col s12 m6">
                    <StudentEditForm student={student} finishEdit={this.finishEdit} />
                  </div>
                );
              } else {
                return null;
              }
            })
          ) : null;
      
          return (
            <div className="container">
              {class_room}
              <div className="row">{students}</div>
              {editingStudent}
            </div>
          );
        }
      }


const mapStateToProps = (store_state, current_props) => {
    return {
        ...current_props, student_classroom: store_state.studentClassRoom
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        save_data: (studentClassRoom) => dispatch(setStudentsClassRoom(studentClassRoom)),
        remove_student: (studentId) => dispatch(remove_student(studentId)),
        start_update: (studentId) => dispatch(start_update(studentId)),
        finish_update: (student) => dispatch(finish_update(student))
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(studentListByclassId)
