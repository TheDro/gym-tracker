<template>
    <Label class="far">{{hex}}</Label>
</template>

<script>
import {IconMap} from './IconMap'

export default {
    data() {
	    return {
	    }
    },
    props: {
        icon: String
    },
    computed: {
        hex: function() {
            let code = IconMap[this.icon]
            return code === undefined ? '' : String.fromCharCode(code)
        }
    }
}
</script>

<style>
/* TODO: This may be duplicated in App.vue */
.far {
    font-family: "Font Awesome 5 Free", "fa-regular-400"
}
</style>