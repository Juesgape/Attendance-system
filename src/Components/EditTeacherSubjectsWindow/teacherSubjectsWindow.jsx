import { useEffect, useState } from "react"
import { UserAuth } from "../../context/AuthContext"
import { HiOutlineBookOpen, HiTrash, HiViewGridAdd } from "react-icons/hi"
import { CoursesContext } from "../../context/CoursesContext"

const TeacherSubjectsWindow = () => {
    const { user } = UserAuth()

    const {wantToEditSubjects, setWantToEditSubjects} = CoursesContext()

    const [newSubject, setNewSubject] = useState('')
    const [totalSubjects, setTotalSubjects] = useState(null)

    const createNewSubject = () => {

        if(newSubject === '') {
            return
        }

        if(!user.subjects) {
            user.subjects = [newSubject.toUpperCase()]
            setNewSubject('')
            setTotalSubjects(user.subjects)
            return
        }

        user.subjects.push(newSubject.toUpperCase())
        setNewSubject('')
        setTotalSubjects(user.subjects)
    }

    const deleteSubject = (index) => {
        const newTotalSubjects = user.subjects.splice(index, 1)
        setTotalSubjects(newTotalSubjects)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            createNewSubject()
        }
    }

    return (
        <div className={`${true ? 'visible' : 'invisible'} absolute flex flex-col justify-center z-10 items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black w-[95%] h-[95vh] p-2 rounded-lg">
                <div className="pt-2 h-full">
                    <div className="relative flex justify-between text-center border-b-2">
                        
                        <div className="w-[7rem] h-[2rem] bg-red-400 rounded-lg flex items-center justify-center text-white hover:text-black">
                            <button onClick={() => setWantToEditSubjects(!wantToEditSubjects)} className="w-full p-4">Salir</button>
                        </div>

                        <p className="font-light text-2xl mr-4 mb-4"><span className="font-semibold">GESTIÓN DE ASIGNATURAS</span></p>

                        <div>
                            <h3 className="text-xl">Docente: <span className="font-semibold text-lg">{user?.displayName}</span></h3>
                        </div>

                    </div>

                    <div className="text-center pt-8">
                        <div>
                            <label htmlFor="newSubjectName">Añade una nueva asignatura</label>
                        </div>

                        <div className="pt-2">
                            <input
                                type="text"
                                placeholder="Nombre de la materia"
                                id="newSubjectName"
                                value={newSubject}
                                onChange={(event) => setNewSubject(event.target.value)}
                                className="border text-center p-2 min-w-[300px] border-black rounded-sm focus:outline-none focus:border-green-400 focus:border"
                                autoComplete="off"
                                onKeyUp={handleKeyPress}
                            />

                            <div>
                        </div>

                        <div className="pt-6">
                            <button
                                className="bg-green-400 border border-black p-2 rounded-lg font-bold hover:text-white"
                                onClick={() => {
                                    createNewSubject();
                                }}
                            >
                                Añadir asignatura
                            </button>
                        </div>

                        </div>
                    </div>

                    <div className="pt-5">
                        <div>
                            <h4 className="text-lg">Tus cursos:</h4>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                            {
                                user?.subjects?.length > 0 ? (
                                    user.subjects.map((subject, index) => {
                                        return(
                                            <div key={index} className="flex relative justify-center items-center border-4 border-blue-400 p-4 overflow-auto cursor-pointer hover:bg-blue-200">
                                                <div 
                                                    className="absolute top-0 right-0 hover:text-red-600"
                                                    onClick={() => deleteSubject(index)}
                                                >
                                                    <HiTrash className="w-4 h-4 text"/>
                                                </div>
                                                <HiOutlineBookOpen className="w-8 h-8 text"/>
                                                <p>{subject}</p>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div className="grid col-span-3 justify-center items-center w-full">
                                        <div className="w-full flex justify-center">
                                            <HiViewGridAdd className="w-[10rem] h-[10rem]"/>
                                        </div>
                                        <p className="font-light">Añade tu primer asignatura</p>
                                    </div>
                                )
                            }
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export {
    TeacherSubjectsWindow
}