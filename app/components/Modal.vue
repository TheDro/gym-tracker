<template>
    <FlexboxLayout id="my-modal">
        <StackLayout width="100%">
            <Label text="How much did you lift, bro?"></Label>
            <FlexboxLayout>
                <Label width="30%" text="# sets"></Label>
                <Label width="30%" text="# reps"></Label>
                <Label width="30%" text="weight"></Label>
            </FlexboxLayout>
            <FlexboxLayout>
                <ListPicker width="30%" v-model="setIndex" :items="setList" />
                <ListPicker width="30%" v-model="repIndex" :items="repList" />
                <ListPicker width="30%" v-model="weightIndex" :items="weightList" />
            </FlexboxLayout>
            <FlexboxLayout>
                <Label flexGrow="1"></Label>
                <Button text="cancel" @tap="closeModal" />
                <Button text="add" @tap="addSet" />
            </FlexboxLayout>
        </StackLayout>
    </FlexboxLayout>
</template>

<script>
import _ from 'lodash'

export default {
    data() {
	    return {
            setIndex: 0,
            setList: _.range(1, 13),
            repIndex: 0,
            repList: _.range(1, 21),
            weightIndex: 1, 
            weightList: _.range(2.5, 51, 2.5)
	    };
    },
    computed: {
    },
    methods: {
        closeModal: function() {
            this.$modal.close(false)
        },
        addSet: function() {
            this.$modal.close({
                nSet: this.setList[this.setIndex],
                nRep: this.repList[this.repIndex],
                weight: this.weightList[this.weightIndex]
            })
        }
    }
}
</script>

<style>
#my-modal {
    background-color: aquamarine;
}
</style>