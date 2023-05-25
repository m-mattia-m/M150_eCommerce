<template>
    <h1>MyStore</h1>
    <div>
        <router-link to="/home">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/cart">Cart</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {},
})
export default class Header extends Vue {

}

</script>

<style scoped lang="scss"></style>