import { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext()

const CoursesContextProvider = ({children}) => {
    //We'll store all of our courses here
    const [courses, setCourses] = useState([])
    //this will put an id for every new course based on the length of the 'courses' variable
    const [idCourses, setIdCourses] = useState(0)
    //This currentCourse will help us to navigate though the different student's list that we have
    const [currentCourse, setCurrentCourse] = useState({})
    //Display the student data when the teacher clicks on one
    const [displayStudentStatistics, setDisplayStudentsStatistics] = useState(false)
    //This will helps us show the data of the student that we click on in our different lists
    const [displayCurrentStudent, setDisplayCurrentStudent] = useState({})
    //We want to know when the teacher needs to edit a list, you know, add and remove students
    const [wantToEditList, setWantToEditList] = useState(false)
    //State for the delete student window warner
    const [wantToDeleteStudent, setWantToDeleteStudent] = useState(false)
    //State to show the window for editing the student
    const [wantToEditStudent, setWantToEditStudent] = useState(false)
    //Display AddStudent window
    const [wantToAddNewStudent, setWantToAddNewStudent] = useState(false)
    

    //Check if courses exist to that id have the corresponding id
    useEffect(() => {
        setIdCourses(courses.length)
    },[])

    return(
        <CourseContext.Provider
            value={{
                courses,
                setCourses,
                idCourses,
                setIdCourses,
                currentCourse,
                setCurrentCourse,
                displayStudentStatistics,
                setDisplayStudentsStatistics,
                displayCurrentStudent, 
                setDisplayCurrentStudent,
                wantToEditList,
                setWantToEditList,
                wantToDeleteStudent,
                setWantToDeleteStudent,
                wantToEditStudent,
                setWantToEditStudent,
                wantToAddNewStudent, 
                setWantToAddNewStudent
            }}
        >
            {children}
        </CourseContext.Provider>
    )
}

const CoursesContext = () => {
    return useContext(CourseContext)
}

export {
    CoursesContextProvider,
    CoursesContext
}