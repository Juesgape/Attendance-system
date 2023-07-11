import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import db from "../Pages/Firebase";
import { UserAuth } from "./AuthContext";

const CourseContext = createContext()

const CoursesContextProvider = ({children}) => {
    //User data
    const { user } = UserAuth()

    //We'll store all of our courses here
    const [courses, setCourses] = useState([])
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
    //Display deleting course widow
    const [wantToDeleteCourse, setWantToDeleteCourse] = useState(false)
    const [courseToDelete, setCourseToDelete] = useState({})
    //state that will help us save our data consistently
    const [save, setSave] = useState(false)

    const saveData = () => {
        setSave(!save)
    }
    
    useEffect(() => {
        if(courses.length > 0 && user) {
            const saveDataInDb = async () => {
                try {  
                    const courseDocRef = doc(db, 'users', user.uid, 'courses', 'documentId')
                    await setDoc(courseDocRef, { courses: [...courses] }, { merge: true })
                    /* console.log('Courses were saved correctly'); */
                } catch(err) {
                    console.error('There was an error saving the courses', err)
                    throw err
                }
            }
            //Calling saveData Async function
            saveDataInDb()
        }
    }, [courses, db, save])
    

    return(
        <CourseContext.Provider
            value={{
                courses,
                setCourses,
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
                setWantToAddNewStudent,
                wantToDeleteCourse,
                setWantToDeleteCourse,
                courseToDelete,
                setCourseToDelete,
                saveData
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