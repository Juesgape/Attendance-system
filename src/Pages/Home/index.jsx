import { GradesMenu } from "../../Components/GradesMenu"
import { GradeCard } from "../../Components/GradeCard"
import { useContext } from "react"
import { CoursesContext } from "../../context/CoursesContext"


function Home() {
    const {courses} = CoursesContext()

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div>
                <h1 className='text-center text-3xl font-bold mt-8'>Tus cursos</h1>
            </div>

            <GradesMenu>
                {courses.map((course, index) => (
                    <GradeCard 
                        key={index}
                        id={course.id}
                        gradeName={course.name}
                        teacher={course.teacher}
                    ></GradeCard>
            ))}
            </GradesMenu>
        </div>
    )
}

export default Home