<template>
  <div>
    <ComponentTree @clicked="selectElement" :data="data"/>
  </div>
</template>

<script>

import ChromeBridge from '../chromeBridge';
import ComponentTree from './ComponentTree';

export default {

    data() {
        return {data: {}};
    },

    components: {
        ComponentTree
    },

    methods: {
        selectElement(data) {
            debugger;
        }
    },

    mounted() {
        ChromeBridge.getComponentTree().then(JSON.parse).then(res => {
            this.data = res;
        });
    }
};

</script>
