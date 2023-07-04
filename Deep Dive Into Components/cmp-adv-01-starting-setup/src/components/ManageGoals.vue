<template>
    <div>
        <h2>Manage Goals</h2>
        <input type="text" ref="goal">
        <button @click="setGoal">Set Goal</button>
        <teleport to="body">
            <error-aleart v-if="inputIsInvalid">
                <h2>Input is invalied!</h2>
                <p>Please enter at least a few characters...</p>
                <button @click="confirmError">OK</button>
            </error-aleart>
        </teleport>
    </div>
</template>

<script>
import ErrorAleart from './ErrorAleart.vue'

export default {
    components: {
        ErrorAleart
    },
    data() {
        return {
            inputIsInvalid: false,
        }
    },
    methods: {
        setGoal() {
            const enteredValue = this.$refs.goal.value;
            if (enteredValue === '') {
                this.inputIsInvalid = true;
            }
        },
        confirmError() {
            this.inputIsInvalid = false;
        }
    }
}
</script>