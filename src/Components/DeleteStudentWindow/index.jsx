import { CoursesContext } from "../../context/CoursesContext"

const DeleteWindow = () => {

    const { wantToDeleteStudent,
            setWantToDeleteStudent,
            displayCurrentStudent,
            currentCourse
        } = CoursesContext()

    const removeStudentFromList = (student) => {
        const updatedStudentsList = currentCourse.students.filter((pupil) => pupil !== student)
        //Updating students Id after deleteing a student from the list
        for(let i = 0; i < updatedStudentsList.length; i++) {
            updatedStudentsList[i].id = i
        }
        currentCourse.students = updatedStudentsList
        currentCourse.totalStudents = currentCourse.students.length
    }

    return (
        <div className={`${wantToDeleteStudent ? 'visible' : 'invisible'} absolute flex flex-col justify-center items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black min-w-[400px] min-h-[200px] p-2 rounded-lg">
                <div className="pt-2 h-full">
                    <div className="flex justify-center items-center border-b-2">
                        <p className="font-light text-xl mr-4 mb-4"><span className="font-semibold">ADVERTENCIA</span></p>
                    </div>
                        <div className="w-full h-full">
                            <div className="flex pt-4">
                                <p>Estas a punto de eliminar al estudiante:</p>
                                <p className="pl-2"><span className="font-semibold">{displayCurrentStudent.name}</span> de tu lista.</p>
                            </div>
                            
                            <p>Esta acción no se puede revertir y perderás acceso a sus <span className="font-bold">excusas</span> y <span className="font-bold">fallas</span>.</p>

                            <div className="text-center pt-4 text-lg font-bold">
                                <p>¿Deseas eliminar de todos modos?</p>
                            </div>
                            
                            <div className="flex justify-evenly pt-8 pb-4">
                                <button 
                                    className="bg-red-400 p-3 rounded-lg hover:text-white"
                                    onClick={() => setWantToDeleteStudent(false)}
                                    >Cancelar
                                
                                </button>
                                
                                <button 
                                    className="bg-blue-400 p-3 rounded-lg hover:text-white"
                                    onClick={() => {
                                        removeStudentFromList(displayCurrentStudent)
                                        setWantToDeleteStudent(false)
                                    }}
                                    >
                                        Eliminar
                                </button>

                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export {
    DeleteWindow
}