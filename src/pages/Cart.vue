<template>
    <h1>Cart</h1>
    <div class="mx-12 mt-10">
        <v-table>
            <thead>
            <tr>
                <th class="text-left">
                    Name
                </th>
                <th class="text-right">
                    Amount
                </th>
                <th class="text-right">
                    Cost per product
                </th>
                <th class="text-right">
                    Cost
                </th>
                <th class="text-right"></th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item, index) in cart"
                :key="item.product.id"
            >
                <td class="text-left">{{ item.product.name }}</td>
                <td class="text-right">
                    <v-text-field
                        :rules="amountRule"
                        v-model="cart[index].amount"
                        label="amount"
                    ></v-text-field>
                </td>
                <td class="text-right">{{ item.product.price }}</td>
                <td class="text-right">{{ item.product.price * cart[index].amount }}</td>
                <td class="text-right">
                    <v-btn
                        color="red"
                        @click="removeProductFromCart(item.product.id || '')"
                    >
                        Remove
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </v-table>
        <p>Total cost: {{ totalCost }}</p>
        <router-link @click="storeItemsToPaymentCart()" to="/payment">Go to checkout</router-link>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {listCart, removeFromCart, setPaymentCart} from "../store/cart";
import {swellListSpecificProducts} from "../helpers/swell";
import {CartItem} from "../model/cart";

@Options({
    components: {},
})
export default class Cart extends Vue {

    cart: CartItem[] = []

    amountRule = [value => value >= 1]

    async mounted() {
        const cart = listCart();
        const products = await swellListSpecificProducts(cart);
        for (const productIndex in products) {
            const cartItem: CartItem = {
                product: products[productIndex],
                amount: 1,
            }
            this.cart.push(cartItem);
        }
    }

    removeProductFromCart(id:string){
        const product = this.cart.filter(record => record.product.id === id)
        const cartItem = this.cart.indexOf(product[0])
        if (cartItem > -1) {
            this.cart.splice(cartItem, 1);
        }
        removeFromCart(id)
    }

    get totalCost(): number {
        let sum: number = 0
        for (const cartIndex in this.cart) {
            sum += this.cart[cartIndex].amount * (this.cart[cartIndex].product.price || 0)
        }
        return sum
    }

    storeItemsToPaymentCart(){
        setPaymentCart(this.cart)
    }

}

</script>

<style scoped lang="scss"></style>