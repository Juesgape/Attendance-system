import { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext()

const CoursesContextProvider = ({children}) => {
    //We'll store all of our courses here
    const [courses, setCourses] = useState([])
    //this will put an id for every new course based on the length of the 'courses' variable
    const [idCourses, setIdCourses] = useState(0)
    //This currentCourse will help us to navigate throgh the different student's list that we have
    const [currentCourse, setCurrentCourse] = useState({})

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
                setCurrentCourse
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