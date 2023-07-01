class Student {
    constructor({id, name, absences}) {
        this._id = id
        this._name = name
        this._absences = absences
        this._totalAbsences = {}
    }

    get id() {
        return this._id
    }
    get name() {
        return this._name
    }
    get absences() {
        return this._absences
    }
    get totalAbsences() {
        return this._totalAbsences
    }

    set id(newValue) {
        this._id = newValue
    }
    set name(newValue) {
        this._name = newValue
    }
    set absences(newValue) {
        this._absences += newValue
    }
    
    UpdateTotalAbsences() {
        const date = new Date().toLocaleDateString()
        //Creating new absence
        if(!this._totalAbsences[date]) {
            this._totalAbsences[date] = 1
            //Adding first absence
            this.absences = 1
            return
        }
        //The student only can have one absences perday lol
        if(this._totalAbsences[date] === 0) {
            this._totalAbsences[date] = 1
            //Adding absence
            this.absences = 1
        } else {
            this.totalAbsences[date] = 0
            //removing absence
            this.absences = -1
        }
    }

    addExcuse(excuse) {
        const date = new Date().toLocaleDateString()
        //Creating new absence
        if(!this._totalAbsences[date]) {
            this._totalAbsences[date] = excuse
            return
        }
        //The student only can have one absences perday lol
        if(excuse === '') {
            delete this.totalAbsences[date]
        } else {
            this._totalAbsences[date] = excuse
        }
    }
}

export {
    Student
}