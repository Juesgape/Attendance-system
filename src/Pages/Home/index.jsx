import { GradesMenu } from "../../Components/GradesMenu"
import { GradeCard } from "../../Components/GradeCard"
import { useContext } from "react"
import { CoursesContext } from "../../context/CoursesContext"


function Home() {
    const {courses} = CoursesContext()

    return (
        <div>
            <div>
                <h1 className='text-center text-3xl font-bold py-8'>Inicio</h1>
            </div>

            <GradesMenu>
                {courses.map((course, index) => 
                    <GradeCard 
                        key={index}
                        id={course.id}
                        gradeName={course.name}
                        teacher={course.mainTeacher}
                    ></GradeCard>
            )}
            </GradesMenu>

        </div>
    )
}

export default Home