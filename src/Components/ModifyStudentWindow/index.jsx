import { useEffect, useState } from "react"
import { CoursesContext } from "../../context/CoursesContext"

const ModifyStudentWindow = () => {
    const { wantToEditStudent, 
            setWantToEditStudent, 
            displayCurrentStudent, 
            setDisplayCurrentStudent,
            currentCourse
        
        } = CoursesContext()

    const [newStudentName, setNewStudentName] = useState('')

    const updateStudentName = (student) => {
        if(newStudentName === '') {
            setWantToEditStudent(false)
        } else {
            for(let i = 0; i < currentCourse.students.length; i++) {
                if(currentCourse.students[i] === student) {
                    currentCourse.students[i].name = newStudentName.toUpperCase()
                    setNewStudentName(''); // Reinitialize the input value
                    return
                }
            }
        }
    }

    useEffect(() => {
        setNewStudentName('')
    },[displayCurrentStudent])

    const resetInputValue = () => {
        setNewStudentName('')
    }

    return(
        <div className={`${wantToEditStudent ? 'visible' : 'invisible'} absolute flex flex-col justify-center items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black min-w-[400px] min-h-[200px] p-2 rounded-lg">
                <div className="pt-2 h-full">
                    <div className="flex justify-center items-center border-b-2">
                        <p className="font-light text-xl mr-4 mb-4"><span className="font-semibold">Editar estudiante</span></p>
                    </div>
                        <div className="w-full h-full">
                            <div className="flex pt-4">
                                <p>El nombre original del estudiante es: <span className="font-bold">{displayCurrentStudent.name}</span></p>
                            </div>

                            <div className="flex flex-col justify-center items-center pt-8 font-light">
                                <label htmlFor="newStudentName"><p className="pb-2">Escribe el nuevo nombre</p></label>
                                <input 
                                    id="newStudentName"
                                    type="text" 
                                    placeholder="Nombre del estudiante..."
                                    className="border border-black rounded-lg w-[16rem] p-2"    
                                    onChange={(event) => setNewStudentName(event.target.value)}
                                    value={newStudentName}
                                />
                            </div>


                            <div className="flex justify-evenly pt-8 pb-4">
                                <button 
                                    className="bg-red-400 p-3 w-[9rem] rounded-lg hover:text-white"
                                    onClick={() => {
                                        resetInputValue() // Reset input value
                                        setWantToEditStudent(false)
                                    }}
                                    >Cancelar
                                </button>

                                <button 
                                    className="bg-blue-400 p-3 rounded-lg hover:text-white"
                                    onClick={() => {
                                        updateStudentName(displayCurrentStudent)
                                        setWantToEditStudent(false)
                                    }}
                                    >
                                        Guardar cambios
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export {
    ModifyStudentWindow
}