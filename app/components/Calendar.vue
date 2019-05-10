<template>
    <RadCalendar viewMode="Month" :monthViewStyle="calendarStyle"  :eventSource="events" @cellTap="tapped"></RadCalendar>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import {CalendarEvent, CalendarMonthViewStyle, DayCellStyle} from 'nativescript-ui-calendar'
import _ from 'lodash'



export default {
    data() {
	    return {
            currentDate: new Date(),
            events: [],
	    };
    },
    computed: {
        ...mapState({
            exerciseList: 'exerciseList'
        }),
        calendarStyle: function() {
            // const dayCellStyle = new DayCellStyle();
            // dayCellStyle.cellBackgroundColor = "#ffff00"
            // dayCellStyle.eventTextColor = "#ffff00"
            // dayCellStyle.showEventsText = false
            let style = new CalendarMonthViewStyle()
            return style
        }
    },
    watch: {
        exerciseList:{ deep: true, immediate: true,
            handler: function(newValue, oldValue) {
                let dateStampMap = {}
                let offset = (new Date().getTimezoneOffset() + 12*60)*60*1000
                _.forEach(newValue, (exercise) => {
                    _.forEach(exercise.workouts, (workoutEntry, dateStamp) => {
                        dateStampMap[dateStamp] = 1
                    })
                })
                let events = []
                _.forEach(dateStampMap, (one, dateStamp) => {
                    let eventDate = new Date(Date.parse(dateStamp)+offset)
                    events.push(new CalendarEvent('', eventDate, eventDate))
                })
                this.events = events
            }
        },
    },
    methods: {
        ...mapMutations({
            changeDate: 'changeDate'
        }),
        tapped: function(e) {
            this.changeDate(e.date)
        }
    }
}
</script>

<style scoped>


</style>