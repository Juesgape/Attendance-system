import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiCloudArrowUp, HiChevronLeft } from 'react-icons/hi2'
import { ListTables } from '../ListTables'
import * as XLSX from 'xlsx'
import { getTodaysDate } from '../../Utils'
import { CoursesContext } from '../../context/CoursesContext'

const ExcelDroper = () => {
    //This will be an object of course, I just initializated as a string for design pourposes
    const [excelData, setExcelData] = useState('')
    
    const { courses,
            setCourses,
            currentCourse, 
            setCurrentCourse
        } = CoursesContext()

    //Helps us go back to the courses page
    const navigate = useNavigate()


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

    const gatheringStudentsInfo = useCallback((excelData) => {
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
                absencesThisMonth: 0,
                totalAbsences: {},
                excuses: {jul:{'3/7/23': 'Clicka','4/7/23': 'Clicka','5/7/23': 'Clicka','6/7/23': 'Clicka','7/7/23': 'Clicka','8/7/23': 'Clicka'},}
            }
            //Adding newStudent to our useState
            listStudents.push(newStudent)
            //updating id
            id += 1
        }
        const updatedCourse = {
            ...currentCourse,
            students: listStudents,
            totalStudents: listStudents.length
        }

        //update the COURSES with the new students information of the course
        const updatedCourses = courses.map((course) => {
            if (course.id === updatedCourse.id) {
                return updatedCourse;
            }
            return course;
        });
        setCurrentCourse(updatedCourse)
        setCourses(updatedCourses)
    }, []);

    useEffect(() => {
        if(excelData !== '') {
            gatheringStudentsInfo(excelData)
        }
    }, [excelData, gatheringStudentsInfo])

    return(
        <div>
            <div 
            onClick={() => navigate('/')}
            className='flex w-[9.2rem] cursor-pointer'>
                <HiChevronLeft className='h-6 w-6'></HiChevronLeft>
                <p className='pl-4'>Volver a cursos</p>
            </div>
            
            {
                currentCourse.students.length < 1
                ?
                <div className='h-[90vh] flex flex-col justify-center items-center'>
                    <p>Nombre de la clase: {currentCourse.name}</p>
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

                <div className='h-[90vh] flex flex-col justify-center items-center'>
                    <div className='h-[80vh] w-full flex justify-center'>
                        <div className='h-[100%] overflow-auto'>
                            <ListTables students={currentCourse.students}></ListTables>
                        </div>
                    </div>
                    <div className='w-full mt-4 flex items-center justify-evenly'>
                        <button className='border border-black rounded-lg p-2 bg-black text-white hover:bg-white hover:text-black'>Guardar cambios</button>
                        <p>Fecha: {getTodaysDate()}</p>
                    </div>
                </div>
            }
            
        </div>
    )
}

export {
    ExcelDroper
}