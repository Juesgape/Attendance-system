import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiCloudArrowUp, HiChevronLeft } from 'react-icons/hi2'
import { HiPencil, HiOutlineX } from 'react-icons/hi'
import { ListTables } from '../ListTables'
import * as XLSX from 'xlsx'
import { getTodaysDate } from '../../Utils'
import { CoursesContext } from '../../context/CoursesContext'
import { LoadingScreen } from '../LoadingScreen'

const ExcelDroper = () => {
    //This will be an object of course, I just initializated as a string for design pourposes
    const [excelData, setExcelData] = useState('')
    const [readyToLoadContent, setReadyToLoadContent] = useState(false)
    
    const { courses,
            setCourses,
            currentCourse, 
            setCurrentCourse,
            wantToEditList,
            setWantToEditList,
            wantToAddNewStudent, 
            setWantToAddNewStudent,
            displayStudentStatistics, 
            wantToDeleteStudent,
            wantToEditStudent,
        } = CoursesContext()

    //Helps us go back to the courses page
    const navigate = useNavigate()
    
    //This will prevent our application to crash
    useEffect(() => {
        //If the there is no course selected (current course), go back to the home page
        if(Object.keys(currentCourse).length === 0) {
            navigate('/')
        }
    }, [])

    //If there is a currentCourse then our app is ready to load content
    useEffect(() => {
        if(Object.keys(currentCourse).length !== 0) {
            setReadyToLoadContent(true)
        }
    }, [])


    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        processFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleButtonClick = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        processFile(file);
    };
    
    const processFile = (file) => {
        if (
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/vnd.ms-excel'
        ) {
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
            console.log('Invalid file format. Please select an Excel file.');
        }
    };

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
                excuses: {}
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
            {
                readyToLoadContent ? (
                    <div 
                        onClick={() => navigate('/')}
                        className='flex w-[9.2rem] cursor-pointer'>
                        <HiChevronLeft className='h-6 w-6'></HiChevronLeft>
                        <p className='pl-4'>Volver a cursos</p>
                    </div>
                ) : (
                    <div></div>
                )
            }
            
            {
                readyToLoadContent ? (
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
                                <input 
                                    type="file" 
                                    accept='.xlsx, .xls'
                                    className='hidden'
                                    id='fileInput'
                                    onChange={handleFileSelect}
                                />
                                <label htmlFor="fileInput">
                                    <button 
                                        className='border border-black rounded-lg p-2 hover:bg-black hover:text-white'
                                        onClick={handleButtonClick}
                                        >
                                            Seleccionar archivo
                                    
                                    </button>
                                </label>
                            </div>
                        </div>
        
                        :
        
                        <div className={`h-[90vh] flex flex-col justify-center items-center`}>
                            <div className='h-[80vh] w-full flex justify-center'>
                                <div className='h-[100%] overflow-auto'>
                                    <ListTables students={currentCourse.students}></ListTables>
                                </div>
                            </div>
                            <div className={`${displayStudentStatistics || wantToAddNewStudent || wantToDeleteStudent || wantToEditStudent ? 'blur-sm pointer-events-none' : 'blur-none'} 
                                            w-full mt-4 flex items-center justify-evenly`}>
                                {
                                    wantToEditList == false ? 
                                        <button 
                                            className='border flex items-center justify-center w-[8rem] border-black rounded-lg p-2 bg-black text-white hover:bg-white hover:text-black'
                                            onClick={() => setWantToEditList(true)}
                                        >
                                            Editar Lista 
                                            <HiPencil className="w-5 h-5 ml-1"/>
                                        </button>
                                    
                                    :
                                    
                                    <div className='flex justify-evenly'>
                                        <button 
                                            className='border flex items-center justify-center w-[12rem] border-black rounded-lg p-2 bg-white text-black'
                                            onClick={() => setWantToEditList(false)}
                                        >
                                            Dejar de editar lista
                                            <HiOutlineX className="w-4 h-4 ml-1"/>
                                        </button>
                                        <div className='ml-10'>
                                            <button 
                                                className='border flex items-center justify-center w-[12rem] border-black rounded-lg p-2 bg-blue-400 text-white hover:text-black'
                                                onClick={() => setWantToAddNewStudent(true)}
                                            >
                                                Añadir estudiante
                                            </button>
                                        </div>
        
                                    </div>
        
                                }
                                <p>Fecha: {getTodaysDate()}</p>
                            </div>
                        </div>
                ) : (
                    <div className='h-full'>
                        <div className='h-full flex justify-center items-center'>
                            <LoadingScreen></LoadingScreen>
                        </div>
                    </div>
                )

            }
            
        </div>
    )
}

export {
    ExcelDroper
}