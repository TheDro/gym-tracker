function Workout(workout) {
    
    this.nSet = 0
    this.nRep = 0
    this.weight = 0

    if (workout === undefined) {
        return
    }
    this.nSet = typeof workout.nSet === 'number' ? workout.nSet : 0
    this.nRep = typeof workout.nRep === 'number' ? workout.nRep : 0
    this.weight = typeof workout.weight === 'number' ? workout.weight : 0

}

export default Workout