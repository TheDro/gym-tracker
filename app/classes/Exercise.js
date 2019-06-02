import Workout from './Workout'
import randomId from '../services/randomId'

function Exercise (obj) {

    this.id = randomId()
    this.name = ''
    this.workouts = {}

    this.id = typeof obj.id === 'string' ? obj.id : "0"
    this.name =  typeof obj.name === 'string' ? obj.name : ''
    if (typeof obj.workouts !== 'object') {
        this.workouts = {}
    } else {
        for (let key in obj.workouts) {
            let workoutList = obj.workouts[key]
            let dateStampMatch = key.match(/\d{4}-\d{2}-\d{2}/)
            if (dateStampMatch) {
                let validKey = dateStampMatch[0]
                let validWorkoutList = []
                for (let workout of workoutList) {
                    validWorkoutList.push(new Workout(workout))
                }
                this.workouts[validKey] = validWorkoutList
            }
        }
    }

}

export default Exercise