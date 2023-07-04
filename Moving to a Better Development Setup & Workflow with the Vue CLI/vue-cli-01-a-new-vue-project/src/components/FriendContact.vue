<template>
    <li>
        <header>
            <h1>{{ friend.name }}</h1>
        </header>
        <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide Details' : 'Show Details' }}</button>
        <ul v-if="detailsAreVisible">
            <li><strong>Phone:</strong> {{ friend.phone }}</li>
            <li><strong>Email:</strong> {{ friend.email }}</li>
        </ul>
    </li>
</template>

<script>
export default {
    data() {
        return {
            detailsAreVisible: false,
            friend: {
                id: 'mirela',
                name: 'Mirela Vatafova',
                phone: '0359882037375',
                email: 'test.testov@gmail.com'
            }
        }
    },
    methods: {
        toggleDetails() {
            this.detailsAreVisible = !this.detailsAreVisible;
        }
    }
}
</script>