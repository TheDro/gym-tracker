<template>
    <Label class="fa-reg">{{hex}}</Label>
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
.fa-reg {
    font-family: "Font Awesome 5 Free", "fa-regular-400"
}
</style>