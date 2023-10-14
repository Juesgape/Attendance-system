import { useEffect, useState } from "react"
import { CoursesContext } from "../../context/CoursesContext"
import {HiXCircle, HiDocumentReport, HiChevronDoubleRight, HiChevronDoubleLeft} from 'react-icons/hi'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carousel.css'

const GradesMenu = ({children}) => {
    //Variables from context that we'll use in order to create courses
    const { courses, 
            setCourses,
            wantToDeleteCourse
    } = CoursesContext()

    const [clickedAddCourseButton, setClickedAddCourseButton] = useState(false)
    const [gradeName, setGradeName] = useState('')
    const [mainTeacherName, setMainTeacherName] = useState('')
    //Making sure the inputs are filled correctly
    const [areInputsFilled, setAreInputsFilled] = useState(true)

    const addNewCourse = (course) => {
        const newCourses = [...courses, course]
        setCourses(newCourses)
    }

    const handleNewCourseCreation = (gradeName, teacherName) => {

      if (gradeName === '' || mainTeacherName === '') {
        setAreInputsFilled(false)
        return
      }

      if(!gradeName.toLowerCase().startsWith('grado')) {
        gradeName = 'Grado ' + gradeName
      }
      const courseStructure = {
          id: courses.length,
          name: gradeName,
          teacher: teacherName,
          students: [],
          totalStudents: 0,
          lastModified: null
      }
      addNewCourse(courseStructure)
      setClickedAddCourseButton(!clickedAddCourseButton);
      setAreInputsFilled(true)
      clearInputs();
    }

    const handleKeyPress = (event) => {
      if(event.key === 'Enter') {
        handleNewCourseCreation(gradeName, mainTeacherName)
      }
    }

    const clearInputs = () => {
        setGradeName('')
        setMainTeacherName('')
    }

    return (
        <div className="relative w-[100%] m-auto">
          <div className={`${clickedAddCourseButton || wantToDeleteCourse ? 'blur-sm pointer-events-none' : 'blur-none'}`}>
            {children.length > 0 ? (
              <div className="mb-16">
                <Carousel
                  showArrows={window.innerWidth > 700 ? true : false}
                  showStatus={false}
                  showThumbs={false}
                  centerMode={false}
                  centerSlidePercentage={33.33}
                  infiniteLoop={true}
                  renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                      <div className="carousel" onClick={onClickHandler} title={label}>
                        <HiChevronDoubleLeft className="h-10 w-10 sm:h-14 sm:w-14 hover:text-blue-400 cursor-pointer"/>
                      </div>
                    )
                  }
                  renderArrowNext={(onClickHandler, hasNext, label) =>
                    hasNext && (
                      <div className="carousel" onClick={onClickHandler} title={label}>
                        <HiChevronDoubleRight className="h-10 w-10 sm:h-14 sm:w-14 hover:text-blue-400 cursor-pointer"/>
                      </div>
                    )
                  }
                >
                  {children.map((child, index) => (
                    <div key={index} className="carousel-item flex justify-center items-center">
                        {child}
                    </div>
                  ))}
                </Carousel>
    
                <div className="flex justify-center items-center mt-2"></div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center pb-[5rem]">
                  <HiDocumentReport className="w-[8rem] h-[8rem]" />
                  <p>Crea tu primer curso :)</p>
                </div>
              </div>
            )}
    
            <div className="w-full text-center">
              <button
                className="bg-gray-200 hover:shadow-xl text-black p-3.5 rounded-xl font-bold hover:text-white border-black border"
                onClick={() => setClickedAddCourseButton(!clickedAddCourseButton)}
              >
                Añadir nuevo curso
              </button>
            </div>
          </div>
    
          <div className={`${!clickedAddCourseButton ? 'hidden' : ''} absolute w-full top-0 flex items-center justify-center`}>
            <div className="relative min-w-[350px] border border-black bg-white rounded-lg">
              <p className="text-center text-lg mb-2 mt-4 font-semibold">Nuevo curso</p>
    
              <div className="absolute top-2 right-2">
                <HiXCircle
                  className="w-7 h-7 cursor-pointer hover:text-blue-400"
                  onClick={() => {
                    setClickedAddCourseButton(!clickedAddCourseButton)
                    setAreInputsFilled(true)
                    clearInputs();
                  }}
                />
              </div>
    
              <div className="flex flex-col justify-center items-center m-4">
                <label className="pb-2" htmlFor="gradeName">
                  Ingresa el nombre del grado
                </label>
                <input
                  type="text"
                  placeholder="Nombre del Grado"
                  id="gradeName"
                  onChange={(event) => setGradeName(event.target.value)}
                  value={gradeName}
                  onKeyUp={handleKeyPress}
                  className="border p-2 border-black rounded-sm focus:outline-none focus:border-green-400 focus:border"
                  autoComplete="off"
                />
              </div>
    
              <div className="flex flex-col justify-center items-center m-4">
                <label className="pb-2" htmlFor="titular">
                  Ingrese titular
                </label>
                <input
                  type="text"
                  placeholder="Nombre del Titular"
                  id="titular"
                  onChange={(event) => setMainTeacherName(event.target.value)}
                  value={mainTeacherName}
                  className="border p-2 border-black rounded-sm focus:outline-none focus:border-green-400 focus:border"
                  autoComplete=""
                  onKeyUp={handleKeyPress}
                />
              </div>

              {
                areInputsFilled 
                ?
                  ''
                :
                <div className="flex justify-center">
                  <p className="text-red-400">Rellena los campos correctamente</p>
                </div>

              }
    
              <div className="w-full mt-8 mb-4 flex justify-center">
                <button
                  className="bg-gray-200 border border-black p-2 rounded-lg font-bold hover:text-white"
                  onClick={() => {
                    handleNewCourseCreation(gradeName, mainTeacherName);
                  }}
                >
                  Crear nuevo curso
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

export {
    GradesMenu
}