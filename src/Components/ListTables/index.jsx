import { React, useState } from "react";
import { updateTotalAbsences } from "../../Utils";

//Separated cell component so that each X cell is differento for absences

const Cell = ({student}) => {
    const [cellContent, setCellContent] = useState('');

    const handleCellClick = () => {
        setCellContent(cellContent === '' ? 'X' : '');
    };

    return (
        <>
            <td
            className='border w-[5rem] text-center border-slate-700 cursor-pointer hover:bg-red-400'
            onClick={() => {
                handleCellClick()
                //This will control each student's absences by adding and deletting them
                updateTotalAbsences(student)
            }}
            >
                {cellContent}
            </td>
            <td className="border w-[10rem] text-center border-slate-700">{student.absences}</td>
            <td className="w-[10rem] h-auto border text-center border-slate-700">Excusa</td>
        </>
    );
};

const ListTables = ({students}) => {

    return(
        <table className='border-collapse border border-slate-500'>
            <thead className='sticky top-0'>
                <tr>
                    <th className='border border-black bg-slate-600 text-white'>N°</th>
                    <th className='border border-black bg-slate-600 text-white'>Nombre</th>
                    <th className='border border-black bg-slate-600 text-white'>Fallas</th>
                    <th className='border border-black bg-slate-600 text-white'>Total Fallas</th>
                    <th className='border border-black bg-slate-600 text-white'>Excusa</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) =>
                    <tr key={index}>
                        <td className="border w-[2rem] text-center border-slate-700">{student.id + 1}</td>
                        <td className="border pl-2 border-slate-700">{student.name}</td>
                        <Cell student={student}/>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export {
    ListTables
}