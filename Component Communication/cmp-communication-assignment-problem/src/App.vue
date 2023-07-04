<template>
  <active-user :name="name" :age="age"></active-user>
  <user-data @update-data="updateData"></user-data>
</template>

<script>
export default {
  data() {
    return {
      name: 'Pesho',
      age: 33,
    }
  },
  methods: {
    updateData(name, age) {
      this.name = name;
      this.age = +age;
    }
  }
}
</script>


