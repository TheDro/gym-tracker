<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">
            <FlexboxLayout v-for="(exercise, index) in workoutList">
                <Label flexGrow="1"> {{exercise.name}} </Label>
                <Button class="fa-reg" :text="icon('delete')" @tap="removeExercise(index)" />
            </FlexboxLayout>
        </StackLayout> 
    </ScrollView>
</template>

<script>
import {saveObject, loadObject} from '../services/storage'
import {mapState} from 'vuex'

let [RIGHT, LEFT] = [1,2]

export default {
    data() {
	    return {
            exerciseList: [],
            newExerciseName: 'test',
            workout: []
	    };
    },
    computed: {
        ...mapState({
            workoutList: 'workoutList'
        })
    },
    methods: {
        removeExercise: function(index) {
            this.exerciseList.splice(index,1)
            saveObject('exerciseList', this.exerciseList)
        },
        addExercise: function(exerciseName) {
            this.exerciseList.push({name: exerciseName})
            this.newExerciseName = ''
            saveObject('exerciseList', this.exerciseList)
        },
        swipe: function(event, exerciseIndex) {
            console.log(event.direction)
            console.log('remove', exerciseIndex)
            if (event.direction === RIGHT) {
                this.addToWorkout(this.exerciseList[exerciseIndex])
            }
        },
        addToWorkout(exercise) {
            this.workout.push(exercise)
            saveObject('workout', this.workout)
        }
    }
}
</script>

<style>
</style>