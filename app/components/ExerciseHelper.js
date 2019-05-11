
function recentEntries(exercise, n=100, dateStamp='3000-01-01') {
    let sortedKeys = Object.keys(exercise.workouts).sort().reverse()
    let keys = sortedKeys.filter(key => key<=dateStamp)
    let entriesLeft = n
    let entries = []
    for (let key of keys) {
        let workouts = _.cloneDeep(exercise.workouts[key])
        for (let iWorkout = workouts.length-1; iWorkout >=0; iWorkout--) {
            let workout = workouts[iWorkout]
            if (key === dateStamp) {
                workout.isToday = true
            }
            workout.index = iWorkout
            workout.dateStamp = key
            entries.push(workout)
            entriesLeft--
            if (entriesLeft <= 0) break
        }
        if (entriesLeft <= 0) break
    }
    return entries.reverse()
}


export {recentEntries}