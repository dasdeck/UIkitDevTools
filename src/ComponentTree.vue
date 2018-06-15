<template>
<div>
    <div @click="$emit('clicked', data)">{{ data.name }}</div>
    <ul>
        <li v-for="(row, index) in data.children" :key="index">
            <ComponentTree @clicked="childClicked" :data="row"/>
        </li>
    </ul>
</div>
</template>

<script>
const ComponentTree = {

    props: {
        data: Object
    },

    methods: {
        childClicked(data) {
            this.$emit('clicked', data);
        }
    }
};

ComponentTree.components = {ComponentTree};

export default ComponentTree;
</script>
