<template>
    <h1>Products</h1>
    <p>{{products.length}} products found</p>
    <div class="mx-12 mt-10">
        <v-row>
            <template v-for="product of products">
                <v-card
                    elevation="2"
                    width="25%"
                    max-width="400"
                >
                    <v-img
                        class="align-end"
                        height="200"
                        :src="product.images ? product.images[0].file.url : 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'"
                    >
                    </v-img>
                    <v-card-title>{{ product.name }}</v-card-title>
                    <v-card-subtitle class="pt-4">{{ product.price }} {{ product.currency }}</v-card-subtitle>

                    <v-card-text>{{ product.description }}</v-card-text>

                    <v-card-actions>
                        <v-btn color="gray" @click="intoCart(product)">
<!--                            <v-icon icon="F0D66" path="mdi-cart-arrow-down"></v-icon>-->
<!--                            <svg-icon type="mdi" path="mdi-cart-arrow-down"></svg-icon>-->
                            add to cart
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { swellListProducts } from "../helpers/swell";
import {Product} from "swell-js";
import {addToCart} from "../store/cart";

@Options({
    components: {},
})
export default class Products extends Vue {

    products: Product[] = []


    async mounted() {
        let productsResponse = await swellListProducts()
        this.products = productsResponse.results
        console.log(this.products)
    }

    intoCart(product: Product){
        addToCart(product.id || "")
    }

}

</script>

<style scoped lang="scss"></style>