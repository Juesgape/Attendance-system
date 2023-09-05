import { useEffect, useState } from "react"
import { CoursesContext } from "../../context/CoursesContext"
import { HiOutlinePresentationChartBar, HiUser, HiCheckCircle, HiXCircle, HiCheck } from "react-icons/hi"

const GeneralReport = () => {
    const { 
            seeGeneralReport, 
            setSeeGeneralReport,
            currentCourse
        } = CoursesContext()

    const [selectedMonth, setSelectedMonth] = useState('')
    const [thereAreAbsences, setThereAreAbsences] = useState(false)

    const checkIfThereAreAbsences = (course, selectedMonth) => {
        /* console.log(selectedMonth); */
        //This checks if there is at least one student who satisfice the condition
        //If there is, then the some() function will return true, if not, it will return false
        const isItTrue = course.students.some((student) =>
            Object.keys(student['totalAbsences']).includes(selectedMonth)
        );

        setThereAreAbsences(isItTrue)
    };

    useEffect(() => {
        checkIfThereAreAbsences(currentCourse, selectedMonth)
    }, [selectedMonth])

    return(
        <div className={`${seeGeneralReport ? 'visible' : 'invisible'} absolute flex flex-col justify-center z-10 items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black w-[95%] h-[95vh] p-2 rounded-lg">
                <div className="pt-2 h-full">
                    <div className="relative flex justify-center items-center border-b-2">
                        <p className="font-light text-2xl mr-4 mb-4"><span className="font-semibold">REPORTE GENERAL</span></p>
                        
                        <div className="absolute left-0 bottom-4 w-[7rem] h-[2rem] bg-red-400 rounded-lg flex items-center justify-center text-white hover:text-black">
                            <button onClick={() => setSeeGeneralReport(false)} className="w-full p-4">Salir</button>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                        <h3 className="text-xl">Curso: <span className="font-semibold text-lg">{currentCourse.name}</span></h3>
                        <div>
                            <label  className="text-xl font-semibold" htmlFor="selectMonth">Selecciona el mes</label>

                            <select 
                                name="month" 
                                id="selectMonth"
                                className="m-4 text-lg h-[2.5rem] w-[9rem] border border-black rounded-[4px] focus:outline-none"
                                onChange={(event) => {
                                    setSelectedMonth(event.target.value)
                                }}
                            >
                                <option value="none" hidden>Mes</option>
                                <option value="ene">Enero</option>
                                <option value="feb">Febrero</option>
                                <option value="mar">Marzo</option>
                                <option value="abr">Abril</option>
                                <option value="may">Mayo</option>
                                <option value="jun">Junio</option>
                                <option value="jul">Julio</option>
                                <option value="ago">Agosto</option>
                                <option value="sept">Septiembre</option>
                                <option value="oct">Octubre</option>
                                <option value="nov">Noviembre</option>
                                <option value="dic">Diciembre</option>
                            </select>
                        </div>
                    </div>

                    {
                        selectedMonth == '' ? (
                            <div className="h-full w-full">
                                <div className="h-[80%] flex flex-col justify-center items-center">
                                    <HiOutlinePresentationChartBar className="w-[20rem] h-[20rem]"/>
                                    <p className="font-light text-lg">Selecciona el mes del que quieres el reporte</p>
                                </div>
                            </div>
                        ) : (
                            <div className="max-h-[450px] overflow-y-auto">
                                <div className="w-full flex justify-center">
                                    <h3 className="text-xl">Fallas del mes de <span className="font-bold text-blue-400">{selectedMonth.toUpperCase()}</span></h3>
                                </div>

                                <div className="mx-auto flex justify-center">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                                        {
                                            thereAreAbsences ? (
                                                
                                                currentCourse.students.map((student, index) => {
                                                    if(Object.keys(student.totalAbsences).includes(selectedMonth)) {
                                                        return (
                                                            <div key={index} className="relative flex items-center border-4 border-red-400 p-4 overflow-auto cursor-pointer hover:bg-red-200">
                                                                <HiUser className="w-8 h-8"/>
                                                                <p>{student.name}</p>
                                                                <p className="font-bold">: {student.totalAbsences[selectedMonth].length}</p>
                                                            </div>
                                                        )
                                                    }}
                                                )
                                            ) : (
                                                <div className="w-full flex flex-col justify-center items-center col-start-2 pt-8">
                                                    <HiCheckCircle className="w-[20rem] h-[20rem]"/>
                                                    <p className="font-light">No hay fallas para este mes</p>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export {GeneralReport}