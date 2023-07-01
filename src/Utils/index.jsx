const updateTotalAbsences = (student) => {
    //The totalAbsences is an attribute that is an object and will store the date (key) and the absence of the day (value)
    //Therefore, we just have to increment one, and decrement which, in this case will be deleting the absence parcially
    const date = new Date().toLocaleDateString()
    //Creating new absence
    if(!student.totalAbsences[date]) {
        student.totalAbsences[date] = 1
        //Adding first absence
        student.absences += 1
        console.log(student);
        return ''
    }
    delete student.totalAbsences[date]
    //removing absence
    student.absences -= 1
    console.log(student);
}

const addExcuse = (student, excuse) => {
    const date = new Date().toLocaleDateString()
    //Creating new absence
    if(!student.totalAbsences[date]) {
        student.totalAbsences[date] = excuse
        return
    }
    //The student only can have one absences perday lol
    if(excuse === '') {
        delete student.totalAbsences[date]
    } else {
        student.totalAbsences[date] = excuse
    }
}

export {
    updateTotalAbsences,
    addExcuse
}