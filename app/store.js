import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {saveObject, loadObject} from './services/storage'

export default new Vuex.Store({
    state: {
        exerciseList: loadObject('exerciseList', [{name: 'bicep curl'},{name: 'tricep press'}]),
        workoutList: loadObject('workout', [])
    },
    mutations: {
        addExercise(state, exercise) {
            if (typeof exercise === 'string') {
                exercise = {name: exercise}
            }
            state.exerciseList.push(exercise)
            saveObject('exerciseList', state.exerciseList)
        },
        removeExercise(state, index) {
            state.exerciseList.splice(index,1)
        },
        addToWorkout(state, payload) {
            state.workoutList.push(payload.exercise)
            saveObject('workout', state.workoutList)            
        }
    },
    actions: {

    }
});
