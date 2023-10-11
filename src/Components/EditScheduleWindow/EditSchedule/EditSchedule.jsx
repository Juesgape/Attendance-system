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
            <div className="w-[7rem] h-[2rem] bg-red-400 rounded-lg flex items-center justify-center text-white hover:text-black">
                <button onClick={() => props.setWantToEdit(!props.wantToEdit)} className="w-full p-4">Salir</button>
            </div>

            <div className="flex justify-around">
                
                <div className="grid justify-center">
                    <label  className="text-xl font-semibold" htmlFor="selectMonth">Selecciona el día</label>
                    <select 
                        name="day" 
                        id="selectDay"
                        onChange={(opt) => setSelectedDay(opt.target.value)}
                        className="m-4 text-lg h-[2.5rem] w-[9rem] border border-black rounded-[4px] focus:outline-none text-center"
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
                    <label  className="text-xl font-semibold" htmlFor="selectSubject">Selecciona asignatura</label>
                    <select 
                        name="subject" 
                        id="selectSubject"
                        className="m-4 text-lg h-[2.5rem] w-[9rem] border border-black rounded-[4px] focus:outline-none text-center"
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
                    <label  className="text-xl font-semibold" htmlFor="selectSubject">Selecciona curso</label>
                    <select 
                        name="subject" 
                        id="selectSubject"
                        className="m-4 text-lg h-[2.5rem] w-[9rem] border border-black rounded-[4px] focus:outline-none text-center"
                    >
                        <option value="none" hidden>Curso</option>
                        {
                            courses ? (
                                courses.map((course) => {
                                    return <option value={course}>{course.name}</option>
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
                        <p><span>{selectedDay}</span> <span> {user.subjects}</span></p>
                        
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