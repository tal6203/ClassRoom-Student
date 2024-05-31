export function setClasses(classes, requestTime) {
  return {
    type: 'SAVE_CLASSES',
    payload: { classes, requestTime }
  };
}

export function removeClasses(classId) {
  return {
    type: 'REMOVE_CLASS',
    payload: classId
  }
}

export function setStudentsClassRoom(studentClassRoom) {
  return {
    type: 'SAVE_STUDENTS',
    payload: studentClassRoom
  };
}

export function filterSearch(search) {
  return {
    type: 'SEARCH',
    payload: {
      searchOption: search.searchOption,
      searchTerm: search.searchTerm
    }
  }
}

export const AddClassroom = (class_room) => {
  return {
    type: "ADD_CLASSROOM",
    payload: class_room
  };
}

export const AddStudentsClassRoom = (student_classroom) => {
  return {
    type: "ADD_STUDENT",
    payload: student_classroom
  };
}

export const remove_student = (studentId) => {
  return {
    type: "REMOVE_STUDENT",
    payload: studentId
  }
}


export const start_update = (studentId) => {
  return {
    type: 'START_UPDATE',
    payload: studentId
  };
};

export const finish_update = (student) => {
  return {
    type: 'FINISH_UPDATE',
    payload: student
  };
};

