import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

import {saveObject, loadObject} from './services/storage'
import Exercise from './classes/Exercise';

let defaultExercise = {
    name: 'bicep curl',
    workouts: {
        '2018-01-03': [], // This appears in the workouts for this day
        '2018-01-02': [{nSet: 5, nRep: 10, weight: 30}]
    }
}

function dateStamp(date) {
    // Format: 2018-04-28
    let yearString = date.getFullYear().toString()
    let monthString = (date.getMonth()+1).toString().padStart(2,'0')
    let dayString = date.getDate().toString().padStart(2,'0')
    return `${yearString}-${monthString}-${dayString}`
}



export default new Vuex.Store({
    state: {
        exerciseList: (function() {
            let loadedExerciseList = loadObject('exerciseList', [{name: 'bicep curl',workouts:{}}])
            let validExerciseList = [];
            for (let exercise of loadedExerciseList) {
                validExerciseList.push(Exercise(exercise))
            }
            return validExerciseList
        })(),
        currentDateStamp: dateStamp(new Date()),
    },
    getters: {
        currentExerciseList: (state) => {
            return state.exerciseList.filter((exercise) => {
                return !!_.get(exercise.workouts, state.currentDateStamp, null)
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
        updateExercise(state, payload) {
            try {
                console.log('UPDATE EXERCISE')
                let {exercise, name} = payload
                let index = _.findIndex(state.exerciseList, {name: name})
                Vue.set(state.exerciseList, index, exercise)
                saveObject('exerciseList', state.exerciseList)
            } catch (e) {
                console.log(e)
            }
        },
        addToWorkout(state, payload) {
            let {exercise, index} = payload
            if (!index) {
                index = _.findIndex(state.exerciseList, {name: exercise.name})
            }
            if (!state.exerciseList[index].workouts[state.currentDateStamp]) {
                Vue.set(state.exerciseList[index].workouts,state.currentDateStamp, [])
                saveObject('exerciseList', state.exerciseList)          
            }
        },
        removeFromWorkout(state, payload) {
            let {exercise} = payload
            let index = _.findIndex(state.exerciseList, {name: exercise.name})
            Vue.delete(state.exerciseList[index].workouts, state.currentDateStamp)
            saveObject('exerciseList', state.exerciseList)
        },
        addWorkoutEntry(state, payload) {
            let {exercise, entry} = payload
            let index = _.findIndex(state.exerciseList, {name: exercise.name})
            state.exerciseList[index].workouts[state.currentDateStamp].push(entry)
            saveObject('exerciseList', state.exerciseList)
        },
        changeDate(state, date) {
            state.currentDateStamp = dateStamp(date)
        }
    },
    actions: {

    }
})
