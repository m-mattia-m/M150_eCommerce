<template>
    <h1>Payment</h1>
    <div class="mx-12 mt-10">
        <h2 class="mb-4">Personal data and address:</h2>
        <div class="v-row">
            <v-text-field
                class="w-50"
                v-model="user.firstname"
                label="Firstname"
            ></v-text-field>
            <v-text-field
                class="w-50"
                v-model="user.lastname"
                label="Lastname"
            ></v-text-field>
        </div>
        <div class="v-row">
            <v-text-field
                class="w-50"
                v-model="user.street"
                label="Strasse"
            ></v-text-field>
            <v-text-field
                class="w-50"
                v-model="user.streetNr"
                label="Strassen Nummer"
            ></v-text-field>
        </div>
        <div class="v-row">
            <v-text-field
                class="w-50"
                v-model="user.zipCode"
                label="ZIP-Code"
            ></v-text-field>
            <v-text-field
                class="w-50"
                v-model="user.city"
                label="City"
            ></v-text-field>
        </div>
        <div class="v-row">
            <v-text-field
                class="w-100"
                v-model="user.country"
                label="Country"
            ></v-text-field>
        </div>
        <div class="v-row">
            <v-text-field
                class="w-50"
                v-model="user.email"
                label="E-Mail"
            ></v-text-field>
            <v-text-field
                class="w-50"
                v-model="user.telephone"
                label="Phone"
            ></v-text-field>
        </div>
        <h2 class="mb-4">Credit card:</h2>
        <div class="v-row">
            <v-text-field
                class="w-50"
                v-model="creditCard.cardHolder"
                label="Card holder"
            ></v-text-field>
        </div>
        <div class="v-row">
            <v-text-field
                class="w-50"
                v-model="creditCard.cardNumber"
                label="Card number"
            ></v-text-field>
        </div>
        <div class="v-row">
            <v-text-field
                type="number"
                class="w-33"
                v-model=" creditCard.expirationMonth"
                label="Expiration month"
            ></v-text-field>
            <v-text-field
                type="number"
                class="w-33"
                v-model=" creditCard.expirationYear"
                label="Expiration year"
            ></v-text-field>
            <v-text-field
                class="w-33"
                v-model=" creditCard.cvv"
                label="CVV"
            ></v-text-field>
        </div>
        <div class="v-row">
            <p>{{ totalCost }}</p>
        </div>
        <div class="v-row">
            <v-btn @click="pay()">Pay</v-btn>
        </div>
    </div>
    <div class="text-center ma-2">
        <v-snackbar
            :color="snackbarColor"
            v-model="snackbar"
        >
            {{ snackbarText }}

            <template v-slot:actions>
                <v-btn
                    color="white"
                    variant="text"
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {User} from "../model/user";
import {Creditcard} from "../model/creditcard";
import {CartItem} from "../model/cart";
import {getPaymentCart, listCart} from "../store/cart";
import {pay} from "../helpers/stripe";

@Options({
    components: {},
})
export default class Payment extends Vue {
    snackbar:boolean = false;
    snackbarColor:string = "red";
    snackbarText: string = "";
    user: User = {
        firstname: 'John',
        lastname: 'Doe',
        street: 'examplestreet',
        streetNr: '1',
        zipCode: '1234',
        city: 'Examplecity',
        country: 'Switzerland',
        email: 'john.doe@example.com',
        telephone: '071 123 45 67'
    }
    creditCard: Creditcard = {
        cardHolder: 'John Doe',
        cardNumber: '4242424242424242',
        cvv: '1223',
        expirationMonth: 1,
        expirationYear: 2030
    }
    cart: CartItem[] = getPaymentCart();

    get totalCost(): number {
        let sum: number = 0
        for (const cartIndex in this.cart) {
            sum += this.cart[cartIndex].amount * (this.cart[cartIndex].product.price || 0)
        }
        return sum
    }

    async pay(){
        const payCreditCart: Creditcard = {
            cardHolder: this.creditCard.cardHolder,
            cardNumber: this.creditCard.cardNumber,
            cvv: this.creditCard.cvv,
            expirationMonth: +this.creditCard.expirationMonth,
            expirationYear: +this.creditCard.expirationYear,
        }

        const requestState = await pay(+this.totalCost, this.user, payCreditCart)
        if (requestState){
            this.snackbar = true
            this.snackbarColor = "green"
            this.snackbarText = "Zahlung war erfolgreich"
        } else {
            this.snackbar = true
            this.snackbarColor = "red"
            this.snackbarText = "Zahlung ist fehlgeschlagen"
        }
    }

}

</script>

<style scoped lang="scss"></style>