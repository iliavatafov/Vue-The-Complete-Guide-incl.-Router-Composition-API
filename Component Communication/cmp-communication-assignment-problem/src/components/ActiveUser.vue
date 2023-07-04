<template>
    <div>
        <p><strong>Username:</strong> {{ name }}</p>
        <p><strong>Age:</strong> {{ age }}</p>
    </div>
</template>

<script>
export default {
    props: {
        'name': {
            type: String,
            required: true
        },
        'age': {
            type: Number,
            required: true
        }
    }
}
</script>