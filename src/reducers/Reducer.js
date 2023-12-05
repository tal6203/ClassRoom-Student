
function reducer(state = { studentClassRoom: [], classes: [] }, action) {
    switch (action.type) {
        case 'SAVE_STUDENTS':
            return { ...state, studentClassRoom: action.payload };
        case 'SAVE_CLASSES':
            return { ...state, classes: action.payload.classes, requestTime: action.payload.requestTime };
        case 'SEARCH':
            const { searchOption, searchTerm } = action.payload;
            let filteredClasses = searchTerm !== '' ? state.classes.filter(class_room => {
                if (searchOption === "id") {
                    return class_room.id === parseInt(searchTerm);
                } else if (searchOption === "number_of_students") {
                    return class_room.number_of_students <= parseFloat(searchTerm);
                } else if (searchOption === "class_avg") {
                    return class_room.class_avg >= parseInt(searchTerm);
                } else if (searchOption === "class_type") {
                    return class_room.type_class.toLowerCase() === searchTerm.toLowerCase();
                }
                return true;
            }) : state.classes;
            return {
                ...state,
                filterclasses: filteredClasses
            };
        case 'ADD_STUDENT':
            return {
                ...state, studentClassRoom: {
                    ...state.studentClassRoom,
                    classRoom: { ...action.payload.classRoom },
                    studentList: [...action.payload.studentList]
                }
            };
        case 'ADD_CLASSROOM':
            return {
                ...state,
                classes: [...state.classes, action.payload],
                filterclasses: [...state.classes, action.payload]
            }
        case 'REMOVE_CLASS':
            console.log(action.payload)
            const updatedClassroomList = state.classes.filter(class_room => class_room.id !== action.payload)
            const updatedFilterClassroomList = state.classes.filter(class_room => class_room.id !== action.payload);
            return {
                ...state,
                classes: updatedClassroomList,
                filterclasses: updatedFilterClassroomList
            }
        case 'REMOVE_STUDENT':
            const updatedStudentList = state.studentClassRoom.studentList.filter(student => student.id !== action.payload)
            return {
                ...state,
                studentClassRoom: {
                    ...state.studentClassRoom,
                    studentList: updatedStudentList
                }
            };
        case 'START_UPDATE':
            const studentToUpdate = state.studentClassRoom.studentList.find((student) => student.id === action.payload);
            const updatedStudent = {
                ...studentToUpdate,
                isEditing: true
            };
            const updatedStudentListWithEdit = state.studentClassRoom.studentList.map((student) => {
                if (student.id === action.payload.id) {
                    return updatedStudent;
                }
                return student;
            });
            const updatedClassroom = {
                ...state.studentClassRoom,
                studentList: updatedStudentListWithEdit
            };
            return {
                ...state,
                studentClassRoom: updatedClassroom
            };

        case 'FINISH_UPDATE':
            const updatedStudentListWithoutEdit = state.studentClassRoom.studentList.map((student) => {
                if (student.id === action.payload.id) {
                    return {
                        ...action.payload,
                        isEditing: false
                    };
                }
                return student;
            });
            const updatedClassroomWithoutEdit = {
                ...state.studentClassRoom,
                studentList: updatedStudentListWithoutEdit
            };
            return {
                ...state,
                studentClassRoom: updatedClassroomWithoutEdit
            };

        default:
            return state;
    }

}


export default reducer