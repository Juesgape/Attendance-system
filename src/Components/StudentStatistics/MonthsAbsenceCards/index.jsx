import { useEffect, useState } from "react"

const MonthsAbsenceCards = ({student}) => {
    const [currentMonth, setCurrentMonth] = useState('')
    const [absencesForMonth, setAbsencesForMonth] = useState([])

    const updateAbsencesForMonth = (month) => {
        const absencesForThisMonth = student.totalAbsences[month]
        if(absencesForThisMonth) {
            setAbsencesForMonth(absencesForThisMonth)
            setCurrentMonth(month)
        } else {
            setAbsencesForMonth([])
            setCurrentMonth('')
        }
    }
    
    useEffect(() => {
        setAbsencesForMonth([]);
        setCurrentMonth('');
    }, [student]);

    return(
        <div>
            <div>
                <div className="flex justify-evenly flex-wrap max-w-[400px] gap-3">
                    {
                        Object.keys(student.totalAbsences).map((month, index) => 
                            <div 
                                key={index} 
                                className="rounded-lg uppercase flex items-center justify-center w-[4rem] mb-2 mt-2 border border-black cursor-pointer bg-red-400 hover:text-white"
                                onClick={() => {
                                    updateAbsencesForMonth(month)
                                }}
                                >
                                <p className="text-xl m-1">{month}</p>
                            </div>
                        )
                    }
                </div>
                <div className="mb-8">
                {currentMonth !== '' && (
                    <div className="mt-4">
                        <p>
                        En el mes de{' '}
                            <span className="uppercase font-semibold">{currentMonth}</span> el
                        estudiante faltó los siguientes días:
                        </p>
                        <div className="flex justify-evenly">
                            {
                                absencesForMonth.map((monthDay, index) => 
                                    <div className="mt-4" key={index}>
                                        <div className="text-center border border-black bg-gray-200 rounded-lg p-2">
                                            <p className="font-bold">{monthDay}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
                    
                </div>
            </div>
        </div>
    )
}

export {
    MonthsAbsenceCards
}