import { useState } from "react"
import { CoursesContext } from "../../context/CoursesContext"
import { sortStudentsListByName } from "../../Utils"

const AddStudentWindow = () => {
    const { wantToAddNewStudent, 
            setWantToAddNewStudent,
            currentCourse
        } = CoursesContext()

    const [newStudent, setNewStudent] = useState('')

    const addStudent = () => {
        if(newStudent === '') {
            setWantToAddNewStudent(false)
        } else {
            const newId = currentCourse.students.length
            const newStudentObj = {
                id: newId,
                name: newStudent.toUpperCase(),
                totalAbsences: {},
                excuses: {},
                absencesThisMonth: 0
            }
            const courseCopy = {...currentCourse}
            courseCopy.students.push(newStudentObj)
            //Sort the list by name
            const sortedCourseList = sortStudentsListByName(courseCopy)
            //Update the original course
            currentCourse.students = sortedCourseList
            currentCourse.totalStudents = currentCourse.students.length

            //Clear input out
            setNewStudent('')
        }
    }


    const resetInputValue = () => {
        setNewStudent('')
    }

    return(
        <div className={`${wantToAddNewStudent ? 'visible' : 'invisible'} absolute flex flex-col justify-center items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black w-[350px] sm:min-w-[500px] min-h-[200px] p-2 rounded-lg">
                <div className="pt-2 h-full">
                    <div className="flex justify-center items-center border-b-2">
                        <p className="font-light text-xl mr-4 mb-4"><span className="font-semibold">Añadir estudiante</span></p>
                    </div>
                        <div className="w-full h-full">

                            <div className="flex flex-col justify-center text-center items-center pt-8 font-light">
                                <label htmlFor="newStudentName" className="pb-4">
                                    <p className="">Escribe el nombre del estudiante siguiendo el formato</p>
                                    <span className="font-bold">APELLIDO NOMBRE</span>
                                </label>
                                <input 
                                    id="newStudentName"
                                    type="text"
                                    placeholder="Nombre del estudiante..."
                                    className="border border-black rounded-lg w-[16rem] p-2"    
                                    onChange={(event) => setNewStudent(event.target.value)}
                                    value={newStudent}
                                />
                            </div>


                            <div className="flex justify-evenly pt-8 pb-4">
                                <button 
                                    className="bg-red-400 p-3 w-[9rem] rounded-lg hover:text-white"
                                    onClick={() => {
                                        resetInputValue() // Reset input value
                                        setWantToAddNewStudent(false)
                                    }}
                                    >Cancelar
                                </button>

                                <button 
                                    className="bg-blue-400 p-3 rounded-lg hover:text-white"
                                    onClick={() => {
                                        addStudent()
                                        setWantToAddNewStudent(false)
                                    }}
                                    >
                                        Añadir estudiante
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export {
    AddStudentWindow
}