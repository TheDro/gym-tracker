<template>
    <Page>
        <ActionBar title="Edit Exercise" />
        <StackLayout width="100%" backgroundColor="#eee">
            <TextField v-model="name" 
                returnKeyType="done"
                @returnPress="changeName(name)"/>
            <FlexboxLayout v-for="workout in workouts" >
                <Label flexGrow="5">{{workout.dateStamp}}</Label>
                <Label flexGrow="1">{{workout.nSet}}</Label>
                <Label flexGrow="1">x</Label>
                <Label flexGrow="1">{{workout.nRep}}</Label>
                <Label flexGrow="1">{{workout.weight}}</Label>
                <Button class="fa-reg icon" :text="icon('edit')" 
                    @tap="editWorkout(workout)" />
                <!-- <Button class="fa-reg icon" :text="icon('delete')" 
                    @tap="removeWorkout(workout)" /> -->
            </FlexboxLayout>
        </StackLayout> 
    </Page>
</template>

<script>
import Vue from 'vue'
import {mapMutations} from 'vuex'
import {recentEntries} from './ExerciseHelper'
import Modal from './Modal'
import _ from 'lodash'

export default {
    props: {
        exercise: Object
    },
    data() {
	    return {
            name: this.exercise.name,
            workouts: []
	    };
    },
    computed: {
    },
    watch: {
        exercise: {deep: true, immediate: true,
            handler: function(newValue) {
                let entries
                try {
                    entries = recentEntries(this.exercise)
                } catch (e) {
                    console.log(e)
                }
                this.workouts = entries.reverse()
            }
        }
    },
    methods: {
        ...mapMutations({
            updateExercise: 'updateExercise'
        }),
        editWorkout(entry) {
            this.$showModal(Modal, {props: {
                nSet: entry.nSet,
                nRep: entry.nRep,
                weight: entry.weight,
                ok: 'Update'
            }})
            .then(response => {
                if (response) {
                    Vue.set(this.exercise.workouts[entry.dateStamp], entry.index,  response)
                    this.updateExercise({exercise: this.exercise, name: exercise.name})
                }
            })
        },
        removeWorkout(entry) {
            //TODO: Remove entry
        },
        changeName(newName) {
            let oldName = this.exercise.name
            this.exercise.name = newName
            this.updateExercise({exercise: this.exercise, name: oldName})
        }
    }
}
</script>

<style scoped>

</style>