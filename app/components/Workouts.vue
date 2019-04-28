<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">
            <FlexboxLayout v-for="(exercise, index) in workoutList">
                <Label flexGrow="1"> {{exercise.name}}:{{exercise.workouts[currentDateStamp].length}} </Label>
                <Button class="fa-reg" :text="icon('edit')" 
                    @tap="addEntry(index)" />
                <Button class="fa-reg" :text="icon('delete')" 
                    @tap="removeFromWorkout({exercise})" />
            </FlexboxLayout>
            <Label v-for="exercise in workoutList">{{exercise}}</Label>
        </StackLayout>   

    </ScrollView>
</template>

<script>
import {saveObject, loadObject} from '../services/storage'
import {mapState, mapMutations, mapGetters} from 'vuex'
import Modal from './Modal'

let [RIGHT, LEFT] = [1,2]

export default {
    data() {
	    return {
            newExerciseName: 'test'
	    };
    },
    computed: {
        ...mapState({
            currentDateStamp: 'currentDateStamp'
        }),
        ...mapGetters({
            workoutList: 'currentExerciseList',
        }),
    },
    methods: {
        ...mapMutations({
            removeFromWorkout: 'removeFromWorkout',
            addWorkoutEntry: 'addWorkoutEntry',
        }),
        addEntry: function(index) {
            this.$showModal(Modal, {props: {nSet: 5, nRep: 10, weight: 25}})
            .then(entry => {
                console.log('modal response', entry)
                let exercise = this.workoutList[index]
                this.addWorkoutEntry({exercise, entry})
            })
        }
    }
}
</script>

<style>
</style>