import { useEffect, useState } from "react"
import { UserAuth } from "../../context/AuthContext"
import { HiChevronDown } from "react-icons/hi"
import { CoursesContext } from "../../context/CoursesContext"
import { EditSchedule } from "./EditSchedule/EditSchedule"

const EditScheduleWindow = () => {
    const { user } = UserAuth()

    const [wantToEdit, setWantToEdit] = useState(false)


    //Days of the week, start in 0 and end in 6
    const days = {
        0: 'Domingo', 
        1: 'Lunes', 
        2: 'Martes', 
        3: 'Miércoles', 
        4: 'jueves', 
        5: 'Viernes',
        6: 'Sábado'
    }

    const {wantToEditSchedule, setWantToEditSchedule} = CoursesContext()

    return (
        <div className={`${true ? 'visible' : 'invisible'} absolute flex flex-col justify-center z-10 items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black w-[95%] h-[95vh] p-2 rounded-lg relative">
                <div className="pt-2 h-full">
                    <div className="relative flex justify-between text-center border-b-2">
                        
                        <div className="w-[7rem] h-[2rem] bg-red-400 rounded-lg flex items-center justify-center text-white hover:text-black">
                            <button onClick={() => setWantToEditSchedule(!wantToEditSchedule)} className="w-full p-4">Salir</button>
                        </div>

                        <p className="font-light text-2xl mr-4 mb-4"><span className="font-semibold">GESTIÓN DE HORARIO</span></p>

                        <div>
                            <h3 className="text-xl">Docente: <span className="font-semibold text-lg">{user?.displayName}</span></h3>
                        </div>
                    </div>

                    <div className="text-center space-y-4 pt-4">
                        <div>
                            <div className="flex w-[80%] m-auto justify-center items-center border-b border-black">
                                <h4>Lunes</h4>
                                <HiChevronDown/>
                            </div>
                            
                            <div className="flex flex-wrap mr-4 ml-4 mt-4">
                                <div className="border mb-2 min-w-[300px] border-black rounded bg-blue-300">
                                    <p><span className="font-bold">Castellano</span></p>
                                    <span>Cursos: </span>

                                    <span>2B, </span>
                                    <span>5A, </span>
                                    <span>6J, </span>
                                    <span>6B  </span>
                                </div>

                                
                            </div>

                        </div>

                        <div className="space-x-4">
                            <button 
                                className="bg-green-400 border border-black w-[100px] p-2 rounded-lg font-bold hover:text-white"
                                onClick={() => setWantToEdit(!wantToEdit)}
                            >
                                Editar
                            </button>

                        </div>

                    
                    </div>
                </div>
            </div>

            {
                wantToEdit ? (
                    <EditSchedule 
                        wantToEdit = {wantToEdit}
                        setWantToEdit = {setWantToEdit}
                    />
                ) : (
                    <div></div>
                )
            }

        </div>
    )
}

export {
    EditScheduleWindow
}