import { React, useEffect, useState } from "react";
import { 
        updateTotalAbsences, 
        checkTodaysAbsence,
        checkTodaysExcuse, 
        setStudentExcuse,
    } from "../../../Utils";

import { CoursesContext } from "../../../context/CoursesContext";
import { HiPencil, HiTrash } from "react-icons/hi";

//Separated cell component so that each X cell is differento for absences

const Cell = ({student}) => {
    //Display student data when solicited and set current student
    const { displayStudentStatistics, 
            setDisplayStudentsStatistics, 
            setDisplayCurrentStudent,
            wantToEditList,
            setWantToDeleteStudent,
            setWantToEditStudent,
            saveData
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
                    <p className={`${wantToEditList == false ? 'group-hover:invisible mr-4' : 'group-hover:visible mr-16'} `}>{student.name}</p>
                    {
                        wantToEditList == false
                        ? 
                        <div className="invisible top-4 font-bold absolute group-hover:visible">MOSTRAR ESTADÍSTICAS DEL ESTUDIANTE</div>
                        :
                        <div className="top-5 right-2 font-bold absolute">
                            <div className="flex justify-end w-full">
                                <HiPencil 
                                    className="w-6 h-6 hover:text-white"
                                    onClick={() => {
                                        setDisplayCurrentStudent(student)
                                        setWantToEditStudent(true)
                                    }}
                                />
                                <HiTrash 
                                    className="w-6 h-6 hover:text-white" 
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
            className='border w-[5rem] text-center border-slate-700 cursor-pointer hover:bg-red-400'
            onClick={() => {
                //If the user haven't typed an excuse, then we can put an absence mark
                if(excuse === '' && wantToEditList === false) {
                    handleCellClick()
                    //This will control each student's absences by adding and deletting them
                    updateTotalAbsences(student)                
                }
            }}
            >
                {cellContent}
            </td>
            <td className={`${parseInt(student.absencesThisMonth) >= 6 ? 'bg-red-600 text-white' : ''} border w-[10rem] text-center border-slate-700`}>{student.absencesThisMonth}</td>
            <td className="w-[10rem] h-auto border text-center border-slate-700">
                <input 
                    onChange={(event) => {
                        if(cellContent !== 'X' && wantToEditList === false) {
                            setExcuse(event.target.value)
                        }
                    }} 
                    className="text-center p-[1rem] h-[auto] focus:outline-none" 
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