import { useEffect, useState } from 'react'
import { HiCloudArrowUp } from 'react-icons/hi2'
import * as XLSX from 'xlsx'

const ExcelDroper = () => {
    //This will be an object of course, I just initializated as a string for design pourposes
    const [excelData, setExcelData] = useState('')
    const [students, setStudents] = useState([])
    const [cellContent, setCellContent] = useState('');

    const handleCellClick = () => {
        cellContent === '' ? setCellContent('X') : setCellContent('')
    };


    //This will read the excel file and return the data into a json file
    const handleDrop = (event) => {
        event.preventDefault()
        const file = event.dataTransfer.files[0]
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const reader = new FileReader();
            reader.onload = function (event) {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                setExcelData(jsonData);
            };
            reader.readAsBinaryString(file);
        } else {
            console.log('Invalid file format. Please drop an Excel file.');
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const gatheringStudentsInfo = (excelData) => {
        let listStudents = []
        //assigning correct id
        let id = 0
        for(let i = 0; i < excelData.length; i++) {
            //these are the possible numbers position of the students, we don't want them to be 'undefined', right?
            if(typeof excelData[i][0] !== 'number') {
                continue
            }
            //The positions are there, even if the students don't exist, we have to be carefull with that :)
            if(typeof excelData[i][1] === 'undefined') {
                continue
            }
            //Setting attributes for the newStudent Object
            const newStudent = {
                id: id,
                name: excelData[i][2] + ' ' + excelData[i][1],
                totalAbsences: 0,
                absencesHistorial: [],

            }
            //Adding newStudent to our useState
            listStudents.push(newStudent)
            //updating id
            id += 1
        }
        setStudents([...students, listStudents].flat())
    }

    //Execute the function once the excel data is loaded
    useEffect(() => {
        gatheringStudentsInfo(excelData)
    },[excelData])

    /* useEffect(() => {
        console.log(students, 'Siuuuu');
    }, [students]) */
    

    return(
        <div>
            {
                excelData == ''
                ?
                <div className='h-[90vh] flex flex-col justify-center items-center'>
                    <p>Nombre de la clase: {}</p>
                    <div 
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className='flex flex-col justify-center items-center border border-dotted border-black p-16 rounded-lg'
                    >
                        <HiCloudArrowUp className='w-10 h-10'/>
                        <p className='text-lg pb-8'>Arrastra y suelta los archivos aquí</p>
                        <button className='border border-black rounded-lg p-2 hover:bg-black hover:text-white'>Seleccionar archivo</button>
                    </div>
                </div>

                :

                <div className='h-auto flex flex-col justify-center items-center'>
                    <div className='w-full flex justify-around'>
                        <table className='w-full border-collapse border border-slate-500'>
                            <thead>
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
                                    <tr key={index} className='text-center'>
                                        <td className="border border-slate-700">{student.id}</td>
                                        <td className="border border-slate-700">{student.name}</td>

                                        <td className="border border-slate-700 cursor-pointer hover:bg-red-400"
                                            onClick={handleCellClick}
                                        >{cellContent}</td>

                                        <td className="border border-slate-700">{student.totalAbsences}</td>
                                        <td className="border border-slate-700">Excusa</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            }
            
        </div>
    )
}

export {
    ExcelDroper
}