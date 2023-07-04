<template>
    <form @submit.prevent="onSubmit">
        <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name">
        </div>
        <div>
            <label for="age">Age:</label>
            <input type="text" id="age" v-model="age">
        </div>
        <div>
            <button>Update</button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            age: ''
        }
    },
    emits: ['updateData'],
    methods: {
        onSubmit() {
            this.$emit('updateData', this.name, this.age);
            this.name = '';
            this.age = '';
        }
    }
}
</script>