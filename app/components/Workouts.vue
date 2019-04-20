<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">
            <FlexboxLayout v-for="(exercise, index) in workoutList">
                <Label flexGrow="1"> {{exercise.name}} </Label>
                <Button class="fa-reg" :text="icon('edit')" 
                    @tap="editEntry({index})" />
                <Button class="fa-reg" :text="icon('delete')" 
                    @tap="removeFromWorkout({index})" />
            </FlexboxLayout>
        </StackLayout> 
    </ScrollView>
</template>

<script>
import {saveObject, loadObject} from '../services/storage'
import {mapState, mapMutations} from 'vuex'
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
            workoutList: 'workoutList'
        })
    },
    methods: {
        ...mapMutations({
            removeFromWorkout: 'removeFromWorkout'
        }),
        editEntry: function(index) {
            this.$showModal(Modal)
            .then(response => {
                console.log('modal response', response)
            })

            // confirm({
            //     title: 'exercise',
            //     message: 'Did you do this exercise?',
            //     okButtonText: 'Yes',
            //     cancelButtonText: 'No'
            // })
            // .then(response => {
            //     console.log(response)
            // })
        }
    }
}
</script>

<style>
</style>