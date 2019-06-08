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

function save(state) {
    saveObject('exerciseList', state.exerciseList)
}

function saveArchive(state) {
    saveObject('archivedExerciseList', state.archivedExerciseList)
}

export default new Vuex.Store({
    state: {
        exerciseList: (function() {
            let loadedExerciseList = loadObject('exerciseList', [{name: 'bicep curl',workouts:{}}])
            let validExerciseList = []
            for (let exercise of loadedExerciseList) {
                validExerciseList.push(new Exercise(exercise))
            }
            return validExerciseList
        })(),
        archivedExerciseList: (function() {
            let loadedExerciseList = loadObject('archivedExerciseList', [])
            loadedExerciseList = []
            let validExerciseList = []
            for (let exercise of loadedExerciseList) {
                validExerciseList.push(new Exercise(exercise))
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
            exercise = new Exercise(exercise)
            
            let index = _.findIndex(state.exerciseList, {name: exercise.name})
            if (index >= 0) {
                // An exercise with that name already exists
                //TODO: Display message
                console.log('An exercise with that name already exists.')
                return
            }
            
            index = _.findIndex(state.archivedExerciseList, {name: exercise.name})
            if (index >= 0) {
                console.log('Retrieving archived exercise with that name.')
                let archivedExercise = state.archivedExerciseList.splice(index,1)[0]
                state.exerciseList.push(archivedExercise)
                save(state)
                saveArchive(state)
            } else {
                console.log('New exercise added.')
                state.exerciseList.push(exercise)
                save(state)
            }

        },
        removeExercise(state, index) {
            let archivedExercise = state.exerciseList.splice(index,1)[0]
            state.archivedExerciseList.push(archivedExercise)
            save(state)
            saveArchive(state)
        },
        updateExercise(state, payload) {
            try {
                let {exercise, name} = payload
                let index = _.findIndex(state.exerciseList, {name: name})
                Vue.set(state.exerciseList, index, exercise)
                save(state)
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
                save(state)          
            }
        },
        removeFromWorkout(state, payload) {
            let {exercise} = payload
            let index = _.findIndex(state.exerciseList, {name: exercise.name})
            Vue.delete(state.exerciseList[index].workouts, state.currentDateStamp)
            save(state)
        },
        addWorkoutEntry(state, payload) {
            let {exercise, entry} = payload
            let index = _.findIndex(state.exerciseList, {name: exercise.name})
            state.exerciseList[index].workouts[state.currentDateStamp].push(entry)
            save(state)
        },
        changeDate(state, date) {
            state.currentDateStamp = dateStamp(date)
        }
    },
    actions: {

    }
})
