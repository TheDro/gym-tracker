import uuid from 'uuid/v1'
import Workout from './Workout'

function Exercise (obj) {
    let result = {};

    result.id = ''
    result.name = ''
    result.workouts = {}

    result.id = typeof obj.id === 'string' ? obj.id : "0"
    result.name =  typeof obj.name === 'string' ? obj.name : ''
    if (typeof obj.workouts !== 'object') {
        result.workouts = {}
    } else {
        for (let key in obj.workouts) {
            let workoutList = obj.workouts[key]
            let dateStampMatch = key.match(/\d{4}-\d{2}-\d{2}/)
            if (dateStampMatch) {
                let validKey = dateStampMatch[0]
                let validWorkoutList = []
                for (let workout of workoutList) {
                    validWorkoutList.push(Workout(workout))
                }
                result.workouts[validKey] = validWorkoutList
            }
        }
    }
    return result;

}

export default Exercise