<template>
    <Page>
        <ActionBar title="Exercise Archive" />
        <ScrollView>
            <StackLayout width="100%" backgroundColor="#eee">
                <FlexboxLayout 
                    v-for="(exercise, index) in archivedExerciseList" :key="exercise.id">
                    <Label flexGrow="1" @tap="editExercise(exercise)"> {{exercise.name}} </Label>
                    <Button class="fas icon" :text="icon('undo')" 
                        @tap="addExercise(exercise)" />
                    <Button class="far icon" :text="icon('delete')" @tap="removeExercise(index)" />
                </FlexboxLayout>

            </StackLayout> 
        </ScrollView>
    </Page>
</template>

<script>
import {mapState, mapMutations} from 'vuex'


export default {
    data() {
	    return {
	    };
    },
    computed: {
        ...mapState({
            archivedExerciseList: 'archivedExerciseList'
        })
    },
    methods: {
        ...mapMutations({
            addExercise: 'addExercise',
            // TODO: permanently delete
            // deleteExercise: 'deleteExercise',
        })
    }
}
</script>

<style scoped>

</style>