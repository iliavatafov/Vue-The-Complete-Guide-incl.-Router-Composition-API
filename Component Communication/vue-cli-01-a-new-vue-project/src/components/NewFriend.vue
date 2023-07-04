<template>
    <form @submit.prevent="addFriend">
        <div>
            <label for="name">Name:</label>
            <input v-model="name" type="text" id="name">
        </div>
        <div>
            <label for="phone">Phone:</label>
            <input v-model="phone" type="tel" id="phone">
        </div>
        <div>
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email">
        </div>
        <div>
            <label for="isFavorite">Is favorite:</label>
            <select name="isFavorite" id="isFavorite" v-model="isFavorite">
                <option :value="true">Yes</option>
                <option :value="false">No</option>
            </select>

        </div>
        <button>Add new friend</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            isFavorite: '',
        }
    },
    emits: ['add-friend'],
    methods: {
        addFriend() {
            this.$emit('add-friend', {
                id: this.name,
                name: this.name,
                phone: this.phone,
                email: this.email,
                isFavorite: this.isFavorite,
            })
        },
    }
}
</script>