<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">

            <FlexboxLayout v-for="(exercise, index) in workoutList">
                <Label flexGrow="1"
                    @tap="editExercise(exercise)"
                    >{{exercise.name}}</Label>

                <FlexboxLayout 
                    v-for="(entry, index) in recentEntries(exercise,4)"  
                    flexDirection="column"
                    :class="{entry, odd: index%2 === 0, today: entry.isToday}"
                    >
                    <Label height="50%"> {{entry.nSet}}x{{entry.nRep}} </Label>
                    <Label height="50%"> {{entry.weight}} </Label>
                </FlexboxLayout>

                <Button class="fa-reg icon" :text="icon('edit')" 
                    @tap="addEntry(index)" />
                <Button class="fa-reg icon" :text="icon('delete')" 
                    @tap="removeFromWorkout({exercise})" />
            </FlexboxLayout>

            <!-- <Label class="debug" v-for="exercise in workoutList" textWrap="true">{{exercise}}</Label> -->
        </StackLayout>   

    </ScrollView>
</template>

<script>
import {saveObject, loadObject} from '../services/storage'
import {mapState, mapMutations, mapGetters} from 'vuex'
import Modal from './Modal'
import _ from 'lodash'
import {recentEntries} from './ExerciseHelper'
import EditExercise from './EditExercise'

let [RIGHT, LEFT] = [1,2]

export default {
    data() {
	    return {
            newExerciseName: 'test',
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
            return recentEntries(exercise, n, this.currentDateStamp)
        },
        ...mapMutations({
            removeFromWorkout: 'removeFromWorkout',
            addWorkoutEntry: 'addWorkoutEntry',
        }),
        editExercise: function(exercise) {
            this.$navigateTo(EditExercise,{props: {exercise}})
        },
        addEntry: function(index) {
            let nextEntry = {nSet: 5, nRep: 10, weight: 25}
            let lastEntry = recentEntries(this.workoutList[index], 1)[0]
            if (lastEntry) {
                nextEntry = {
                    nSet: lastEntry.nSet, 
                    nRep: lastEntry.nRep, 
                    weight: lastEntry.weight
                }
            }

            this.$showModal(Modal, {props: nextEntry})
            .then(entry => {
                if (entry) {
                    let exercise = this.workoutList[index]
                    this.addWorkoutEntry({exercise, entry})
                }
            })
        }
    }
}
</script>

<style scoped>

.entry {
    text-align: center;
}
.entry.odd {
    background-color: #fff;
}
.entry.today {
    background-color: #87ceeb
}
.entry.today.odd {
    background-color: #91d3ec
}

</style>