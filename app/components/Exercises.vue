<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">
            <FlexboxLayout @swipe="swipe($event, index)" v-for="(exercise, index) in exerciseList">
                <Label flexGrow="1"> {{exercise.name}} </Label>
                <Button class="fa-reg" :text="icon('edit')" @tap="editExercise(index)" />
                <Button class="fa-reg" :text="icon('delete')" @tap="removeExercise(index)" />
            </FlexboxLayout>
            <TextField hint="New Exercise Name" 
                returnKeyType="done"
                v-model="newExerciseName" 
                @returnPress="addExercise(newExerciseName)" />
        </StackLayout> 
    </ScrollView>
</template>

<script>
import {saveObject, loadObject} from '../services/storage'
import IconLabel from './IconLabel'
import {IconMap} from './IconMap'

let [RIGHT, LEFT] = [1,2]

export default {
    components: {IconLabel},
    created: function() {
        this.exerciseList = loadObject('exerciseList', [{name: 'bicep curl'},{name: 'tricep press'}])
    },
    data() {
	    return {
            exerciseList: [],
            newExerciseName: 'test',
            workout: []
	    };
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
        editExercise: function(index) {
            //edit the thing
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
        },
        icon(iconName) {
            let code = IconMap[iconName]
            return code === undefined ? '' : String.fromCharCode(code)
        }
    }
}
</script>

<style>
</style>