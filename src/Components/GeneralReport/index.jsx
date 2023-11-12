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
    const [selectedSubject, setSelectedSubject] = useState('')
    const [thereAreAbsences, setThereAreAbsences] = useState(false)
    const [thereAreAbsencesInSubject, setThereAreAbsencesInSubject] = useState(false)

    const checkIfThereAreAbsences = (course, selectedMonth) => {
        /* console.log(selectedMonth); */
        //This checks if there is at least one student who satisfice the condition
        //If there is, then the some() function will return true, if not, it will return false
        const isItTrue = course.students.some((student) =>
            Object.keys(student['totalAbsences']).includes(selectedMonth)
        );

        setThereAreAbsences(isItTrue)
    };

    const checkIfThereAreAbsencesInSubject = (() => {
        const isItTrue = currentCourse.students.some((student) => {
            return student?.absences?.[selectedSubject]?.[selectedMonth]
        })

        setThereAreAbsencesInSubject(isItTrue)
    })

    useEffect(() => {
        checkIfThereAreAbsences(currentCourse, selectedMonth)
    }, [selectedMonth])

    useEffect(() => {
        checkIfThereAreAbsencesInSubject()
    }, [selectedSubject])

    return(
        <div className={`${seeGeneralReport ? 'visible' : 'invisible'} absolute flex flex-col justify-center z-10 items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black w-[95%] h-[95vh] p-2 rounded-lg">
                <div className="pt-2 h-full">
                    <div className="relative flex justify-center items-center border-b-2">
                        <p className="font-light text-xl sm:text-2xl mr-4 mb-4"><span className="font-semibold">REPORTE GENERAL</span></p>
                        
                        <div className="absolute left-0 bottom-4 sm:w-[7rem] h-[2rem] bg-red-400 rounded-lg flex items-center justify-center text-white hover:text-black">
                            <button onClick={() => setSeeGeneralReport(false)} className="w-full p-4">Salir</button>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                        <h3 className="text-lg lg:text-lg  pr-8">Curso: <span className="font-semibold lg:text-lg">{currentCourse.name}</span></h3>
                        <div className="text-center">
                            <label  className="text-sm sm:text-xl font-semibold" htmlFor="selectMonth">Selecciona el mes</label>

                            <select 
                                name="month" 
                                id="selectMonth"
                                className="m-4 text-lg w-[6rem] h-[2.5rem] sm:w-[9rem] border border-black rounded-[4px] focus:outline-none"
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

                        <div className="text-center">
                            <label  className="text-sm sm:text-xl font-semibold" htmlFor="selectMonth">Selecciona la asignatura</label>

                            <select 
                                name="subject" 
                                id="selectedSubject"
                                className="m-4 text-lg w-[7rem] h-[2.5rem] sm:w-[9rem] border border-black rounded-[4px] focus:outline-none"
                                onChange={(event) => {
                                    setSelectedSubject(event.target.value)
                                }}
                            >
                                <option value="none" hidden>Materia</option>
                                <option value="">Ninguna</option>

                                {
                                    currentCourse?.subjects?.length > 0 ? (
                                        currentCourse.subjects.map((subject, index) =>
                                            <option 
                                                key={index}
                                                value={subject}
                                            >
                                                    {subject}
                                            </option>
                                        )
                                    ) : (
                                        <option>No tienes cursos</option>
                                    )
                                }
                                
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
                            <div className="max-h-[400px] mt-4 overflow-y-auto">
                                <div className="w-full flex justify-center">
                                    <h3 className="text-xl">Fallas del mes de <span className="font-bold text-blue-400">{selectedMonth.toUpperCase()}</span></h3>
                                </div>

                                <div className="mx-auto flex justify-center">

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

                                        {
                                            selectedSubject.length > 1 && thereAreAbsencesInSubject == true ? (
                                                currentCourse.students.map((student, index) => {
                                                    if(student?.absences?.[selectedSubject]?.[selectedMonth]) {
                                                        return (
                                                            <div key={index} className="relative flex items-center border-4 border-red-400 p-4 overflow-auto cursor-pointer hover:bg-red-200">
                                                                <HiUser className="w-8 h-8"/>
                                                                <p>{student.name}</p>
                                                                <p className="font-bold">: {student?.absences?.[selectedSubject]?.[selectedMonth].length}</p>
                                                            </div>
                                                        )
                                                }})

                                            ) : (
                                                ''
                                            )
                                        }

                                        {
                                            thereAreAbsences == true && selectedSubject.length === 0 ? (
                                                
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
                                                
                                                ''
                                            )}

                                            {
                                                selectedMonth.length > 1 && thereAreAbsences && selectedSubject.length > 1 && !thereAreAbsencesInSubject || selectedMonth.length > 1 && !thereAreAbsences  ?   (
                                                    <div className="w-full flex flex-col justify-center items-center col-start-2">
                                                        <HiCheckCircle className="w-[20rem] h-[20rem]"/>
                                                        <p className="font-light">No hay fallas para este mes</p>
                                                    </div>
                                                ) : (
                                                    ''
                                                )
                                                
                                            }

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