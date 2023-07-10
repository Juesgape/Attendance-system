import { GradesMenu } from "../../Components/GradesMenu"
import { GradeCard } from "../../Components/GradeCard"
import { CoursesContext } from "../../context/CoursesContext"
import { DeleteCourseWindow } from "../../Components/DeleteCourseWindow"


function Home() {
    const {courses, wantToDeleteCourse} = CoursesContext()

    return (
        <div className="h-full w-full flex flex-col items-center">
            <div>
                <h1 className="text-center text-3xl font-bold mt-8">Tus cursos</h1>
            </div>

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

            <DeleteCourseWindow></DeleteCourseWindow>
        </div>

    )
}

export default Home