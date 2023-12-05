import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { setClasses, removeClasses } from './action';
import classImg from './img/class.jpeg';

class Classes extends Component {
    state = {
        deletedClassId: null,
    };

    componentDidMount() {
        const { classes } = this.props;
        if (classes.length === 0) {
            this.fetchData();
        }

    }

    fetchData() {
        const requestTime = new Date();
        axios.get('http://localhost:8050/api/classroom')
            .then((res) => {
                this.props.save_classes(res.data, formatDateTime(requestTime));

            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'AJAX request failed',
                    text: `${error}`,
                });
            });

        function formatDateTime(date) {
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            return date.toLocaleString('en-GB', options);
        }
    }


    handleDelete = (classId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure you want to delete this Class Room?!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        })
            .then((res) => {
                if (res.isConfirmed) {
                    axios.delete(`http://localhost:8050/api/classroom/${classId}`)
                        .then((res) => {
                            Swal.fire(
                                'Class Room deleted successfully',
                                'success',
                                'success'
                            );
                            this.props.remove_classes(classId);
                            this.setState({ deletedClassId: classId });
                            console.log('ClassRoom deleted successfully');
                            this.fetchData();

                        })
                        .catch((error) => {
                            console.log(error)
                            Swal.fire({
                                icon: 'error',
                                title: "Error",
                                text: `It is not possible to delete a class that contains students`
                            })
                        });
                }
            })
    };

    render() {
        const classes = this.props.classes;
        const filterClassesList = this.props.filterclasses;
        const result =
            filterClassesList && filterClassesList.length !== classes.length
                ? filterClassesList
                : classes;
        const classList = result && result.length ? (
            result.map((class_room) => {
                return (
                    <div className="col s12 m6 l4" key={class_room.id}>
                        <div className="card hoverable" style={{border:'4px solid black'}}>
                            <div className="card-image" style={{borderBottom:'4px solid black'}}>
                                <img src={classImg} alt="Class" />
                            </div>
                            <div className="card-content">
                                <span className="card-title" style={{fontWeight:'bold'}}>ID Class Room: {class_room.id}</span>
                                <p>Number of Students: {class_room.number_of_students}</p>
                                <p>Average: {class_room.class_avg}</p>
                                <p>Class Type: {class_room.type_class}</p>
                            </div>
                            <div className="card-action">
                                <Link to={`/class/${class_room.id}`} className="btn waves-effect blue">
                                    <i className="material-icons left">add</i> Details
                                </Link>
                                &nbsp;
                                <button
                                    className="btn waves-effect red"
                                    onClick={() => this.handleDelete(class_room.id)}
                                >
                                    <i className="material-icons right">delete</i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })
        ) : (
            <div className="center">
                <h1 className="white-text text-darken-2">No classes to show...</h1>
            </div>
        );

        return (
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <button
                            className="btn waves-effect"
                            onClick={() => this.fetchData()}
                            style={{
                                backgroundColor: '#e3bd28',
                                color: 'black',
                                fontWeight: 'bold',
                                fontFamily: 'Exo-2',
                                marginTop:'10px'
                            }}
                        >
                            <i className="material-icons left">refresh</i> Fresh, you should update the information
                        </button>
                        <br />
                        <br />
                        <span
                            className="yellow darken-1 black-text"
                            style={{
                                fontWeight: 'bold',
                                fontFamily: 'Exo-2',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                marginTop: '10px',
                            }}
                        >
                            The information about the classes is current: {this.props.requestTime}
                        </span>
                    </div>
                </div>

                <div className="row">{classList}</div>
            </div>
        );
    }
}

const mapStateToProps = (store_state, current_props) => {
    return {
        ...current_props,
        classes: store_state.classes,
        requestTime: store_state.requestTime,
        filterclasses: store_state.filterclasses
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        save_classes: (classes, requestTime) => dispatch(setClasses(classes, requestTime)),
        remove_classes: (classId) => dispatch(removeClasses(classId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Classes);