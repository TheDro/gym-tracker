<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">

            <FlexboxLayout v-for="(exercise, index) in workoutList">
                <Label flexGrow="1"> {{exercise.name}}:{{exercise.workouts[currentDateStamp].length}} </Label>

                <FlexboxLayout 
                    v-for="(entry, index) in recentEntries(exercise,2)"  
                    flexDirection="column"
                    :class="{entry, odd: index%2 === 0}"
                    >
                    <Label height="50%"> {{entry.nSet}}x{{entry.nRep}} </Label>
                    <Label height="50%"> {{entry.weight}} </Label>
                </FlexboxLayout>

                <Button class="fa-reg icon" :text="icon('edit')" 
                    @tap="addEntry(index)" />
                <Button class="fa-reg icon" :text="icon('delete')" 
                    @tap="removeFromWorkout({exercise})" />
            </FlexboxLayout>
            <Label v-for="exercise in workoutList" textWrap="true">{{exercise}}</Label>
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
            newExerciseName: 'test',
            currentDate: new Date()
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
        recentEntries: function(exercise, n) {
            return exercise.workouts[this.currentDateStamp]
        },
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

<style scoped>
.entry.odd {
    background-color: pink;
}
.entry {
    text-align: center;
}


</style>