function Workout(workout) {
    let result = {}
    result.nSet = 0
    result.nRep = 0
    result.weight = 0
    if (workout === undefined) {
        return result
    }
    result.nSet = typeof workout.nSet === 'number' ? workout.nSet : 0
    result.nRep = typeof workout.nRep === 'number' ? workout.nRep : 0
    result.weight = typeof workout.weight === 'number' ? workout.weight : 0

    return result

}



export default Workout