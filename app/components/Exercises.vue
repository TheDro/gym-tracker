<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">
            <FlexboxLayout 
                v-for="(exercise, index) in exerciseList"
                :class="{active: !!exercise.workouts[currentDateStamp]}"
                @swipe="swipe($event, index)" 
                :key="exercise.id">
                <Label flexGrow="1" @tap="editExercise(exercise)"> {{exercise.name}} </Label>
                <Button class="far icon" :text="icon('plus')" 
                    @tap="addToWorkout({exercise: exercise})" />
                <Button class="far icon" :text="icon('delete')" @tap="removeExercise(index)" />
            </FlexboxLayout>


            <TextField hint="New Exercise Name" 
                returnKeyType="done"
                v-model="newExerciseName" 
                @returnPress="addExercise(newExerciseName)" />
        </StackLayout> 
    </ScrollView>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import EditExercise from './EditExercise'

let [RIGHT, LEFT] = [1,2]

export default {
    data() {
	    return {
            newExerciseName: 'test'
	    };
    },
    computed: {
        ...mapState({
            exerciseList: 'exerciseList',
            currentDateStamp: 'currentDateStamp',
            archivedExerciseList: 'archivedExerciseList'
        })
    },
    methods: {
        ...mapMutations({
            addExercise: 'addExercise',
            removeExercise: 'removeExercise',
            addToWorkout: 'addToWorkout'
        }),
        editExercise: function(exercise) {
            this.$navigateTo(EditExercise,{props: {exercise}})
        },
        swipe: function(event, exerciseIndex) {
            if (event.direction === RIGHT) {
                this.addToWorkout({date: new Date(), exercise: this.exerciseList[index]})
            }
        }
    }
}
</script>

<style scoped>
.active {
    background-color: skyblue;
}

</style>