import { React, useEffect, useState } from "react";
import { 
        updateTotalAbsences, 
        checkTodaysAbsence,
        checkTodaysExcuse, 
        setStudentExcuse,
        isNewMonth
    } from "../../../Utils";

import { CoursesContext } from "../../../context/CoursesContext";
import { HiPencil, HiTrash } from "react-icons/hi";

const absenceForSubject = (student, currentCourse) => {
    if(!currentCourse.subjectsDay) {
        return //Course does not have a schedule
    }

    const date = new Date()
    const day = date.getDay()
    const monthName = date.toLocaleDateString(undefined, {month: 'short'})
    const monthIn_DDMMYY = date.toLocaleDateString()

    currentCourse?.subjectsDay[day].forEach((subjectObj) => {
        if(subjectObj.subject && subjectObj.allCourses.includes(currentCourse.name)) {
            
            //Adding absences attribute in case the student does not have one
            if (!student.absences) {
                student.absences = {};
            }
            
            //Adding the name of the subject as an attribue in case the student does not have one
            if (!student.absences[subjectObj.subject]) {
                student.absences[subjectObj.subject] = {};
            }
            
            if (!student.absences[subjectObj.subject][monthName]) {
                student.absences[subjectObj.subject][monthName] = [];
            }
            
            if(student.absences[subjectObj.subject][monthName].includes(monthIn_DDMMYY)) {
                student.absences[subjectObj.subject][monthName] = student.absences[subjectObj.subject][monthName].filter((monthFormat) => {monthIn_DDMMYY !== monthFormat})
                if(student.absences[subjectObj.subject][monthName].length === 0) {
                    delete student.absences[subjectObj.subject]
                }

            } else {
                student.absences[subjectObj.subject][monthName].push(monthIn_DDMMYY);
            } 
        }
    })
    
}

//Separated cell component so that each X cell is a different absence
const Cell = ({student}) => {
    //Display student data when solicited and set current student
    const { displayStudentStatistics, 
            setDisplayStudentsStatistics, 
            setDisplayCurrentStudent,
            wantToEditList,
            setWantToDeleteStudent,
            setWantToEditStudent,
            saveData,
            showMessageAlert,
            currentCourse,
            courses
        } = CoursesContext()

    const [cellContent, setCellContent] = useState('');
    const [excuse, setExcuse] = useState('')
    const [updateEmptyString, setUpdateEmptyString] = useState(false)
    //Checking if student already has an excuse for today
    const todaysExcuse = checkTodaysExcuse(student) !== undefined ? checkTodaysExcuse(student) : ''
    const showExcuseValueInput = todaysExcuse && todaysExcuse.length === 1 ? '' : todaysExcuse

    const handleCellClick = () => {
        setCellContent(cellContent === '' ? 'X' : '');
    };

    //Check if student already have the absence to put an X in the interface
    useEffect(() => {
        if(checkTodaysAbsence(student)) {
            handleCellClick()
        }
        //Check if it's a new month and change the totalAbsences for the month to zero
        isNewMonth(student)
        
    }, []) 

    //set excuse in case the student already has an excuse for today
    useEffect(() => {
        if(todaysExcuse !== '') {
            setExcuse(todaysExcuse)
        }
    },[])

    useEffect(() => {
        if(!updateEmptyString) {
            setUpdateEmptyString(true)
        } else {
            setStudentExcuse(excuse, student)
        }
    },[excuse])

    useEffect(() => {
        saveData()
    }, [cellContent, excuse])

    return (
        <>  
            <td 
                className={
                            `${wantToEditList === false ?  'relative group border pl-2 border-slate-700 cursor-pointer hover:bg-green-400'
                            : 'relative group border pl-2 border-slate-700 cursor-pointer hover:bg-blue-400'
                        }`}

                onClick={() => {
                    //We don't want to see the statistics if we're editing the list
                    if(wantToEditList === false) {
                        setDisplayStudentsStatistics(!displayStudentStatistics)
                        setDisplayCurrentStudent(student)
                    }
                }}
            >
                <div>
                    <p className={`${wantToEditList == false ? 'group-hover:invisible mr-4' : 'group-hover:visible mr-16'} text-xs sm:text-base `}>{student.name}</p>
                    {
                        wantToEditList == false
                        ? 
                        <div className="invisible text-xs sm:text-sm top-4 font-bold absolute group-hover:visible text-center">VER ESTADÍSTICA</div>
                        :
                        <div className="top-5 right-2 font-bold absolute">
                            <div className="flex justify-end w-full">
                                <HiPencil 
                                    className="w-5 h-5 sm:w-6 sm:h-6 hover:text-white"
                                    onClick={() => {
                                        setDisplayCurrentStudent(student)
                                        setWantToEditStudent(true)
                                    }}
                                />
                                <HiTrash 
                                    className="w-5 h-5 sm:w-6 sm:h-6 hover:text-white" 
                                    onClick={() => {
                                        setDisplayCurrentStudent(student)
                                        setWantToDeleteStudent(true)
                                    }}
                                />
                            </div>
                        </div>
                    }
                </div>
            </td>

            <td
            className='border text-center border-slate-700 cursor-pointer hover:bg-red-400'
            onClick={() => {
                //If the user haven't typed an excuse, then we can put an absence mark
                if(excuse === '' && wantToEditList === false) {
                    handleCellClick()
                    //This will control each student's absences by adding and deletting them
                    updateTotalAbsences(student, courses)               
                    absenceForSubject(student, currentCourse)
                }
            }}
            >
                {cellContent}
            </td>
            <td className={`${parseInt(student.absencesThisMonth) >= 6 ? 'bg-red-600 text-white' : ''} border text-center border-slate-700`}>{student.absencesThisMonth}</td>
            <td className="border text-center border-slate-700">
                <input 
                    onChange={(event) => {
                        if(cellContent !== 'X' && wantToEditList === false) {
                            event.target.value.length <= 50 ? setExcuse(event.target.value) : showMessageAlert('El mensaje debe tener menos de 50 caracteres') 
                        }
                    }} 
                    className="text-center text-xs sm:text-base p-[0.8rem] sm:p-[1rem] focus:outline-none" 
                    type="text" 
                    placeholder="Escriba excusa"
                    value={excuse || showExcuseValueInput}/> 
            </td> 
        </>
    );
};

export {
    Cell
}