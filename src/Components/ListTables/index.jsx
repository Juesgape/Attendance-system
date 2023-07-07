import { React, useEffect, useState } from "react";
import { 
        updateTotalAbsences, 
        checkTodaysAbsence,
        checkTodaysExcuse, 
        setStudentExcuse,
    } from "../../Utils";

import { StudentStatistics } from "../StudentStatistics";
import { CoursesContext } from "../../context/CoursesContext";

//Separated cell component so that each X cell is differento for absences

const Cell = ({student}) => {
    //Display student data when solicited and set current student
    const { displayStudentStatistics, setDisplayStudentsStatistics, setDisplayCurrentStudent} = CoursesContext()

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

    return (
        <>  
            <td 
                className="relative group border pl-2 border-slate-700 cursor-pointer hover:bg-green-400"
                onClick={() => {
                    setDisplayStudentsStatistics(!displayStudentStatistics)
                    setDisplayCurrentStudent(student)
                }}
            >
                <div>
                    <p className="group-hover:invisible">{student.name}</p>
                    <div className="invisible top-4 font-bold absolute group-hover:visible">MOSTRAR ESTADÍSTICAS DEL ESTUDIANTE</div>
                </div>
            </td>

            <td
            className='border w-[5rem] text-center border-slate-700 cursor-pointer hover:bg-red-400'
            onClick={() => {
                //If the user haven't typed an excuse, then we can put an absence mark
                if(excuse === '') {
                    handleCellClick()
                    //This will control each student's absences by adding and deletting them
                    updateTotalAbsences(student)                
                }
            }}
            >
                {cellContent}
            </td>
            <td className="border w-[10rem] text-center border-slate-700">{student.absencesThisMonth}</td>
            <td className="w-[10rem] h-auto border text-center border-slate-700">
                <input 
                    onChange={(event) => {
                        if(cellContent !== 'X') {
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

const ListTables = ({students}) => {

    return(
        <div>
            <table className='border-collapse border border-slate-500'>
                <thead className='sticky top-0'>
                    <tr>
                        <th className='border border-black bg-slate-600 text-white'>N°</th>
                        <th className='border border-black bg-slate-600 text-white'>Nombre</th>
                        <th className='border border-black bg-slate-600 text-white'>Falla</th>
                        <th className='border border-black bg-slate-600 text-white'>Fallas este mes</th>
                        <th className='border border-black bg-slate-600 text-white'>Excusa</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) =>
                        <tr key={index}>
                            <td className="border w-[2rem] text-center border-slate-700">{student.id + 1}</td>
                            <Cell student={student}/>
                        </tr>
                    )}
                </tbody>
            </table>

            <StudentStatistics></StudentStatistics>
        </div>
    )
}

export {
    ListTables
}