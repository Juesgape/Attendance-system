import { useState } from "react"
import { CoursesContext } from "../../context/CoursesContext"
import {HiXCircle} from 'react-icons/hi'

const GradesMenu = ({children}) => {
    //Variables from context that we'll use in order to create courses
    const { courses, 
            setCourses,
            idCourses,
            setIdCourses    
    } = CoursesContext()
    const [clickedAddCourseButton, setClickedAddCourseButton] = useState(false)
    const [gradeName, setGradeName] = useState('')
    const [mainTeacherName, setMainTeacherName] = useState('')

    const addNewCourse = (course) => {
        const newCourses = [...courses, course]
        setCourses(newCourses)
    }

    const handleNewCourseCreation = (gradeName, teacherName) => {
        const courseStructure = {
            id: idCourses,
            name: gradeName,
            mainTeacher: teacherName,
            totalStudents: 0,
            lastModified: null
        }

        addNewCourse(courseStructure)
        setIdCourses(idCourses + 1)
    }

    return(
        <div className="relative w-[100%] m-auto">
            <div className={`${clickedAddCourseButton ? 'blur-sm pointer-events-none' : 'blur-none' }`}>
                {
                    courses.length > 0 
                    ?
                    <div>
                        <div>
                            {children}
                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center">
                        <div className="w-full mt-8 pb-[5rem]">
                            <p>Crea tu primer curso :)</p>
                        </div>
                    </div>
                }

                <div className="w-full text-center mt-16">
                    <button 
                        className="bg-green-400 border border-black p-3.5 rounded-xl font-bold hover:"
                        onClick={() => setClickedAddCourseButton(!clickedAddCourseButton)}
                        >Añadir nuevo curso
                    </button>
                </div>
            </div>

            <div className={`${!clickedAddCourseButton ? 'hidden' : ''} absolute top-0 left-[-50%] flex items-center justify-center border border-black bg-white`}>
                <div className="w-[350px]">
                    <p className="text-center text-lg mb-2 mt-4">Nuevo curso</p>

                    <div className="absolute top-2 right-2">
                        <HiXCircle 
                            className="w-7 h-7 cursor-pointer hover:text-blue-400"
                            onClick={() => setClickedAddCourseButton(!clickedAddCourseButton)}
                            />
                    </div>

                    <div className="flex flex-col justify-center items-center m-4">
                        <label className="pb-2" htmlFor="gradeName">Ingresa el nombre del grado</label>
                        <input 
                            type="text" 
                            placeholder="Grado 5A" 
                            id="gradeName" 
                            onChange={(event) => setGradeName(event.target.value)}
                            className='border p-2 border-black rounded-sm focus:outline-none focus:border-green-400 focus:border'
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center m-4">
                        <label className="pb-2" htmlFor="titular">Ingrese titular</label>
                        <input 
                            type="text" 
                            placeholder="Sofia P" 
                            id="titular" 
                            onChange={(event) => setMainTeacherName(event.target.value)}
                            className='border p-2 border-black rounded-sm focus:outline-none focus:border-green-400 focus:border'
                        />
                    </div>

                    <div className="w-full mt-8 mb-4 flex justify-center">
                        <button 
                            className="bg-green-400 border border-black p-2 rounded-lg font-bold hover:"
                            onClick={() => {
                                handleNewCourseCreation(gradeName, mainTeacherName)
                                setClickedAddCourseButton(!clickedAddCourseButton)
                            }}
                            >Crear nuevo curso
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export {
    GradesMenu
}