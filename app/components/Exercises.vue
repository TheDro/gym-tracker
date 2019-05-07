<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">
            <FlexboxLayout @swipe="swipe($event, index)" v-for="(exercise, index) in exerciseList">
                <Label flexGrow="1"> {{exercise.name}} </Label>
                <Button class="fa-reg icon" :text="icon('plus')" 
                    @tap="addToWorkout({exercise: exercise})" />
                <Button class="fa-reg icon" :text="icon('delete')" @tap="removeExercise(index)" />
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
import {mapState, mapMutations} from 'vuex'

let [RIGHT, LEFT] = [1,2]

export default {
    created: function() {
        this.exerciseList = loadObject('exerciseList', [{name: 'bicep curl'},{name: 'tricep press'}])
    },
    data() {
	    return {
            newExerciseName: 'test'
	    };
    },
    computed: {
        ...mapState({
            exerciseList: 'exerciseList'
        })
    },
    methods: {
        ...mapMutations({
            addExercise: 'addExercise',
            removeExercise: 'removeExercise',
            addToWorkout: 'addToWorkout'
        }),
        editExercise: function(index) {
            this.addToWorkout({date: new Date(), exercise: this.exerciseList[index]})
        },
        swipe: function(event, exerciseIndex) {
            if (event.direction === RIGHT) {
                this.addToWorkout({date: new Date(), exercise: this.exerciseList[index]})
            }
        }
    }
}
</script>

<style>
</style>