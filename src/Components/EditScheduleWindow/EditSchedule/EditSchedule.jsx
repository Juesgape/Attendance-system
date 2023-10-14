import { useState } from "react"
import { UserAuth } from "../../../context/AuthContext"
import { CoursesContext } from "../../../context/CoursesContext"

const EditSchedule = (props) => {
    const { user } = UserAuth()
    const { courses } = CoursesContext()
    
    const [selectedDay, setSelectedDay] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [selectedCourse, setSelectedCourse] = useState({})

    return(
        <div className="absolute w-[95%] h-[95vh] bg-white border-black border p-2 rounded-lg">
            <div className="w-[7rem] h-[2rem] bg-red-400 rounded-lg flex items-center justify-center text-white hover:text-black mb-8">
                <button onClick={() => props.setWantToEdit(!props.wantToEdit)} className="w-full p-4">Salir</button>
            </div>

            <div className="flex justify-around">
                
                <div className="grid justify-center">
                    <label  className="sm:text-xl text-center text-sm font-semibold" htmlFor="selectMonth">Selecciona el día</label>
                    <select 
                        name="day" 
                        id="selectDay"
                        onChange={(opt) => setSelectedDay(opt.target.value)}
                        className="m-4 text-sm sm:text-lg h-[2.5rem] sm:w-[9rem] border border-black rounded-[4px] focus:outline-none text-center"
                    >

                        <option value="none" hidden>Día</option>
                        <option value="1">Lunes</option>
                        <option value="2">Martes</option>
                        <option value="3">Miércoles</option>
                        <option value="4">Jueves</option>
                        <option value="5">Viernes</option>
                        <option value="6">Sábado</option>
                        <option value="0">Domingo</option>

                    </select>
                </div>

                <div className="grid justify-center">
                    <label  className="sm:text-xl text-sm text-center font-semibold" htmlFor="selectSubject">Selecciona asignatura</label>
                    <select 
                        name="subject" 
                        id="selectSubject"
                        onChange={(opt) => setSelectedSubject(opt.target.value)}
                        className="m-4 text-sm sm:text-lg h-[2.5rem] sm:w-[9rem] border border-black rounded-[4px] focus:outline-none text-center"
                    >
                        <option value="none" hidden>Asignatura</option>
                        {
                            user.subjects ? (
                                user.subjects.map((subject) => {
                                    return <option value={subject}>{subject}</option>
                                })
                            ) : (
                                ''
                            )
                        }
                        <option value="add">Añadir otra</option>
                    </select>
                
                </div>

                <div className="grid justify-center">
                    <label  className="sm:text-xl text-center text-sm font-semibold" htmlFor="selectSubject">Selecciona curso</label>
                    <select 
                        name="subject" 
                        id="selectSubject"
                        onChange={(opt) => setSelectedCourse(opt.target.value)}
                        className="m-4 text-sm sm:text-lg h-[2.5rem] sm:w-[9rem] border border-black rounded-[4px] focus:outline-none text-center"
                    >
                        <option value="none" hidden>Curso</option>
                        {
                            courses ? (
                                courses.map((course) => {
                                    return <option value={course.id}>{course.name}</option>
                                })
                            ) : (
                                ''
                            )
                        }
                        <option value="add">Añadir otro</option>
                    </select>
                
                </div>

            </div>

            <div>
                {
                    selectedDay !== '' ? (
                        <p>Quieres dar la asignatura <span> {selectedSubject} </span> El día <span> {selectedDay} </span> al curso {selectedCourse} </p>
                        
                    ) : (
                        <p>Sin asignaturas para este día</p>
                    )
                }
            </div>

        </div>
    )
}

export {
    EditSchedule
}