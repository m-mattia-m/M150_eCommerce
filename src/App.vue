<template>
    <div class="w-100">
        <Header></Header>
    </div>
    <router-view></router-view>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from "./components/Header.vue";

@Options({
    components: {Header, Navigation},
})
export default class Products extends Vue {
    mounted(){
        console.log("App loaded")
    }
}

</script>

<style scoped lang="scss"></style>