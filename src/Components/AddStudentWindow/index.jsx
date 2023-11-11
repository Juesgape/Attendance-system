import { useState } from "react"
import { CoursesContext } from "../../context/CoursesContext"
import { sortStudentsListByName } from "../../Utils"
import { HiMicrophone, HiOutlineMicrophone, HiQrcode } from "react-icons/hi"
import QRcode from 'react-qr-code'

const AddStudentWindow = () => {
    const { wantToAddNewStudent, 
            setWantToAddNewStudent,
            currentCourse
        } = CoursesContext()
        
    /* const qrData = 'https://attendance-system-01-13a6e.web.app/enter-name' */
    const [showQr, setShowQr] = useState(false)
    const [talking, setTalking] = useState(false)
    const [newStudent, setNewStudent] = useState('')
    
    let CurrentMicrophone = !talking ? HiOutlineMicrophone : HiMicrophone

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

    const speechToText = () => {
        let speech = true
        window.SpeechRecognition = window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()
        recognition.interimResults = true

        recognition.addEventListener('start', () => {
            setTalking(true)
        });
    
        recognition.addEventListener('end', () => {
            setTalking(false)
        });

        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)

            setNewStudent(transcript.toString())
        })

        if(speech === true) {
            recognition.start()
        }
    }

    return(
        <div className={`${wantToAddNewStudent ? 'visible' : 'invisible'} absolute flex flex-col justify-center items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black w-[350px] sm:min-w-[500px] min-h-[200px] p-2 rounded-lg">
                <div className="pt-2 h-full">
                    <div className="flex justify-center items-center border-b-2">
                        <p className="font-light text-xl mr-4 mb-4"><span className="font-semibold">Añadir estudiante</span></p>
                    </div>

                        {!showQr ? (
                            <div className="w-full h-full">

                            <div className="flex flex-col justify-center text-center items-center pt-8 font-light">
                                <label htmlFor="newStudentName" className="pb-4">
                                    <p className="">Escribe el nombre del estudiante siguiendo el formato</p>
                                    <span className="font-bold">APELLIDO NOMBRE</span>
                                </label>

                                <div className="relative">
                                    <input 
                                        id="newStudentName"
                                        type="text"
                                        placeholder="Nombre del estudiante..."
                                        className="border border-black rounded-lg w-[16rem] p-2 pr-10 "    
                                        onChange={(event) =>  event.target.value.length > 50 ? '' : setNewStudent(event.target.value)}
                                        value={newStudent}
                                    />

                                    <div 
                                        className="absolute top-2 right-2 cursor-pointer"
                                        onClick={() => speechToText()}
                                    >
                                        <CurrentMicrophone className={`${talking ? 'text-red-400' : ''} w-6 h-6`}/>
                                    </div>
                                </div>

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
                        ) : (
                            <div>

                                <div className="flex justify-center pt-6">
                                    <QRcode
                                        title="Registrate"
                                        value={qrData}
                                        bgColor="white"
                                    >

                                    </QRcode>
                                </div>

                                <div className="flex justify-center pt-6">
                                    <button 
                                        className="bg-red-400 p-3 w-[9rem] rounded-lg hover:text-white"
                                        onClick={() => {
                                            setShowQr(false)
                                        }}
                                        >Volver atrás
                                    </button>
                                </div>

                            </div>
                        )
                    
                    }


                </div>
            </div>
        </div>
    )
}

export {
    AddStudentWindow
}