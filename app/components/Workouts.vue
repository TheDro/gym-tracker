<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">

            <FlexboxLayout v-for="(exercise, index) in workoutList">
                <Label flexGrow="1"> {{exercise.name}} </Label>

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
            let sortedKeys = Object.keys(exercise.workouts).sort().reverse()
            let keys = sortedKeys.filter(key => key<=this.currentDateStamp).slice(0, n)
            let entriesLeft = n
            let entries = []
            for (let key of keys) {
                let workouts = _.cloneDeep(exercise.workouts[key])
                for (let workout of workouts.reverse()) {
                    if (key === this.currentDateStamp) {
                        workout.isToday = true
                    }
                    entries.push(workout)
                    entriesLeft--
                    if (entriesLeft <= 0) break
                }
                if (entriesLeft <= 0) break
            }
            return entries.reverse()
        },
        ...mapMutations({
            removeFromWorkout: 'removeFromWorkout',
            addWorkoutEntry: 'addWorkoutEntry',
        }),
        addEntry: function(index) {
            this.$showModal(Modal, {props: {nSet: 5, nRep: 10, weight: 25}})
            .then(entry => {
                let exercise = this.workoutList[index]
                this.addWorkoutEntry({exercise, entry})
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