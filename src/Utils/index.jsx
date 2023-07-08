const updateTotalAbsences = (student) => {
    //The totalAbsences is an attribute that is an object and will store the date as the name of the month (key) 
    //and this name of the month will store an object of the days of the month in which the stutend didn't attend class
    const date = new Date()
    const monthName = date.toLocaleDateString(undefined, {month: 'short'})
    const monthIn_DDMMYY = date.toLocaleDateString()
    //Creating new absence with month name attribute
    if(!student.totalAbsences[monthName]) {
        //Since it's the first time that we create an attribute in the object  we add the day in which the student didn't attend to class
        student.totalAbsences[monthName] = [monthIn_DDMMYY]
        //Adding first absence to the month
        student.absencesThisMonth = student.totalAbsences[monthName].length
        /* console.log(student); */
        return ''
    }

    if(student.totalAbsences[monthName].includes(monthIn_DDMMYY)) {
        const newMonthAbsences = student.totalAbsences[monthName].filter(elem => elem !== monthIn_DDMMYY)
        student.totalAbsences[monthName] = newMonthAbsences
        student.absencesThisMonth = student.totalAbsences[monthName].length
    } else {
        student.totalAbsences[monthName].push(monthIn_DDMMYY)
        student.absencesThisMonth = student.totalAbsences[monthName].length
    }

    if(student.totalAbsences[monthName].length === 0) {
        delete student.totalAbsences[monthName]
        student.absencesThisMonth = 0
        return ''
    }
}

const getTodaysDate = () => {
    const date = new Date().toLocaleDateString()
    return date
}

const checkTodaysAbsence = (student) => {
    const date = new Date()
    const monthName = date.toLocaleDateString(undefined, {month: 'short'})
    const monthIn_DDMMYY = date.toLocaleDateString()

    if(!student.totalAbsences[monthName]) {
        return false
    }

    if(student.totalAbsences[monthName].includes(monthIn_DDMMYY)) {
        return true
    }
}

//Check if the student already has an excuse for today
const checkTodaysExcuse = (student) => {
    const date = new Date()
    const monthName = date.toLocaleDateString(undefined, {month: 'short'})
    const monthIn_DDMMYY = date.toLocaleDateString()

    if(!student.excuses[monthName]) {
        return ''
    }

    if(student.excuses[monthName].hasOwnProperty(monthIn_DDMMYY)) {
        return student.excuses[monthName][monthIn_DDMMYY]
    }
}

const setStudentExcuse = (excuse, student) => {
    const date = new Date()
    const monthName = date.toLocaleDateString(undefined, {month: 'short'})
    const monthIn_DDMMYY = date.toLocaleDateString()

    if(!student.excuses[monthName]) {
        student.excuses[monthName] = {[monthIn_DDMMYY]: excuse}
        /* console.log(student); */
        return ''
    }
    
    if(student.excuses[monthName]) {
        //If the excuse exist in the monthDay, we want to update it
        student.excuses[monthName][monthIn_DDMMYY] = excuse
        
        //If the teacher removed the excuse (is equal to ''), then we delete it from the object 
        if(student.excuses[monthName][monthIn_DDMMYY] === '') {
            delete student.excuses[monthName][monthIn_DDMMYY]
        }

        //If the month is left out without any excuses, we want to delete it
        if(Object.keys(student.excuses[monthName]).length === 0) {
            delete student.excuses[monthName]
        }
    }
}

//Sort students list by name
const sortStudentsListByName = (course) => {
    course.students.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1; // a should be sorted before b
        }
        if (nameA > nameB) {
          return 1; // a should be sorted after b
        }
        return 0; // names are equal, no sorting needed
    })

    for(let i = 0; i < course.students.length; i++) {
        course.students[i].id = i
    }
    return course.students
}

export {
    updateTotalAbsences,
    getTodaysDate,
    checkTodaysAbsence,
    setStudentExcuse,
    checkTodaysExcuse,
    sortStudentsListByName
}