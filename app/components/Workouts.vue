<template>
    <ScrollView>
        <StackLayout width="100%" backgroundColor="#eee">
            <FlexboxLayout v-for="(exercise, index) in workoutList">
                <Label flexGrow="1"> {{exercise.name}} </Label>
                <Button class="fa-reg" :text="icon('delete')" 
                    @tap="removeFromWorkout({index})" />
            </FlexboxLayout>
        </StackLayout> 
    </ScrollView>
</template>

<script>
import {saveObject, loadObject} from '../services/storage'
import {mapState, mapMutations} from 'vuex'

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
        ...mapMutations({
            removeFromWorkout: 'removeFromWorkout'
        })
    }
}
</script>

<style>
</style>