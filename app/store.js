import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

import {saveObject, loadObject} from './services/storage'

let defaultExercise = {
    name: 'bicep curl',
    workouts: {
        '2018-01-03': [], // This appears in the workouts for this day
        '2018-01-02': [{nSet: 5, nRep: 10, weight: 30}]
    }
}

function dateStamp(date) {
    // Format: 2018-04-28
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export default new Vuex.Store({
    state: {
        exerciseList: loadObject('exerciseList', [{name: 'bicep curl'},{name: 'tricep press'}]),
        currentDateStamp: dateStamp(new Date()),
    },
    getters: {
        currentExerciseList: (state) => {
            return state.exerciseList.filter((exercise) => {
                return !!exercise.workouts[state.currentDateStamp]
            })
        }
    },
    mutations: {
        addExercise(state, exercise) {
            if (typeof exercise === 'string') {
                exercise = {name: exercise, workouts: {}}
            }
            state.exerciseList.push(exercise)

            saveObject('exerciseList', state.exerciseList)
        },
        removeExercise(state, index) {
            state.exerciseList.splice(index,1)
            saveObject('exerciseList', state.exerciseList)
        },
        addToWorkout(state, payload) {
            let {date = new Date(), exercise, index} = payload
            if (!index) {
                index = _.findIndex(state.exerciseList, {name: exercise.name})
            }
            Vue.set(state.exerciseList[index].workouts,dateStamp(date), [])
            saveObject('exerciseList', state.exerciseList)          
        },
        removeFromWorkout(state, payload) {
            let {date = new Date(), exercise} = payload
            let index = _.findIndex(state.exerciseList, {name: exercise.name})
            Vue.delete(state.exerciseList[index].workouts, dateStamp(date))
            saveObject('exerciseList', state.exerciseList)
        },
        addWorkoutEntry(state, payload) {
            let {date = new Date(), exercise, entry} = payload
            let index = _.findIndex(state.exerciseList, {name: exercise.name})
            state.exerciseList[index].workouts[dateStamp(date)].push(entry)
            saveObject('exerciseList', state.exerciseList)
        }
    },
    actions: {

    }
})
