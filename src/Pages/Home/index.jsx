import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { doc, collection, getDocs } from "firebase/firestore"
import db from "../Firebase"
import { UserAuth } from "../../context/AuthContext"
import { GradesMenu } from "../../Components/GradesMenu"
import { GradeCard } from "../../Components/GradeCard"
import { CoursesContext } from "../../context/CoursesContext"
import { DeleteCourseWindow } from "../../Components/DeleteCourseWindow"
import { LoadingScreen } from "../../Components/LoadingScreen"
import Layout from "../../Components/Layout/index"

//Fetching courses data from database since we can't put this inside a hook
const fetchCoursesData = async (user) => {
    try {
        if (user) {
            const coursesQuerySnapshot = await getDocs(collection(db, 'users', user.uid, 'courses'));
            const coursesData = []
            coursesQuerySnapshot.forEach((doc) => {
                const courseData = doc.data().courses// Obtaining course data
                coursesData.push(courseData)
            })
            return coursesData
        }
        return []; // Return an empty array if user is not authenticated

    } catch(err) {
        console.error('Error fetching courses data:', err);
        throw err;
    }
}

function Home() {
    const {courses, setCourses, wantToDeleteCourse} = CoursesContext()
    const [readyToCreateCards, setReadyToCreateCards] = useState(false)

    const { user, logOut } = UserAuth()

    const navigate = useNavigate()

    const handleGoogleSignOut = async () => {
        try {
            await logOut()
        } catch(err) {
            throw new Error(err)
        }
    }

    /* console.log(courses); */

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesDataDb = await fetchCoursesData(user)
                /* console.log('Courses after fetching', coursesDataDb.flat()); */
                setCourses(coursesDataDb.flat())
                setReadyToCreateCards(true)
                /* console.log('courses in db', coursesDataDb); */
            } catch(err) {
                console.error('Error setting courses data:', err)
            }
        }

        if(Object.keys(user).length > 0) {
            fetchData()
        }

    }, [user, setCourses])

    return (
        <Layout>
            <div className="h-full w-full flex flex-col items-center transition">
                <div className="relative w-full flex justify-center items-center">
                    <h1 className="text-4xl font-bold">Tus cursos</h1>
                    <div className="absolute top-3 right-0 cursor-pointer hover:font-semibold hover:text-blue-600">
                        <h4>
                            <button 
                                onClick={() => {
                                    handleGoogleSignOut()
                                    navigate('/signin')
                                }}    
                            >Cerrar sesión</button>
                        </h4>
                    </div>
                </div>

                {readyToCreateCards ? (
                    <GradesMenu className={`${wantToDeleteCourse ? 'blur-sm' : 'blur-none'}`}>
                        {courses.map((course, index) => (
                            <GradeCard
                                key={index}
                                id={course.id}
                                gradeName={course.name}
                                teacher={course.teacher}
                            ></GradeCard>
                        ))}
                    </GradesMenu>
                    ) : (

                        <div className="h-full flex justify-center items-center">
                            <LoadingScreen/>
                        </div>
                )}

                <DeleteCourseWindow></DeleteCourseWindow>
            </div>
        </Layout>
    )
}

export default Home