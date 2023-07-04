<template>
    <li>
        <header>
            <h1>{{ name }} {{ isFavorite ? '(Favorite)' : '' }}</h1>
        </header>
        <button @click="toggleFavorite">Toggle Favorite</button>
        <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide Details' : 'Show Details' }}</button>
        <button @click="$emit('delete-friend', id)">Delete</button>
        <ul v-if="detailsAreVisible">
            <li><strong>Phone:</strong> {{ phoneNumber }}</li>
            <li><strong>Email:</strong> {{ emailAddress }}</li>
        </ul>
    </li>
</template>

<script>
export default {
    // props: [
    //     'name',
    //     'phoneNumber',
    //     'emailAddress',
    //     'isFavorite'
    // ],
    props: {
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        emailAddress: {
            type: String,
            required: true,
        },
        isFavorite: {
            type: Boolean,
            required: false,
            default: false,
            // validator: function (value) {
            //     return value === '1' || value === '0';
            // }
        },
    },
    emits: ['toggle-favorite', 'delete-friend', 'edit-friend'],
    // emits: {
    //     'toggle-favorite': function (id) {
    //         if (id) {
    //             return true
    //         } else {
    //             console.warn('Id is missing!')
    //             return false
    //         }
    //     }
    // },
    data() {
        return {
            detailsAreVisible: false,
            // friend: {
            //     id: 'mirela',
            //     name: 'Mirela Vatafova',
            //     phone: '0359882037375',
            //     email: 'test.testov@gmail.com'
            // },
        }
    },
    methods: {
        toggleDetails() {
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        toggleFavorite() {
            this.$emit('toggle-favorite', this.id);
        },

    }
}
</script>