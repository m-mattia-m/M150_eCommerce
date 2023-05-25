import {User} from "../model/user";
import {Creditcard} from "../model/creditcard";


export async function pay(amount: number, user: User, creditCart: Creditcard): Promise<boolean> {
    if (!import.meta.env.VITE_API_URL) {
        console.log("VITE_API_URL not set")
        return false
    }
    const stripeUrl = import.meta.env.VITE_API_URL + "/pay-with-customer";

    console.log(amount)
    console.log(user)
    console.log(creditCart)

    try {
        const response = await fetch(stripeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount * 100,
                credit_card: {
                    cardnumber: creditCart.cardNumber,
                    cvc: creditCart.cvv,
                    expire_month: creditCart.expirationMonth,
                    expire_year: creditCart.expirationYear
                },
                currency: "USD",
                customer: {
                    city: user.city,
                    country: user.country,
                    description: "",
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    post_cod: user.zipCode,
                    province: "",
                    street: user.street,
                    street_nr: user.streetNr
                },
                product_id: "",
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Antwortdaten:', data);
            return true
        } else {
            console.error('Fehler bei der API-Anfrage:', response.statusText);
            return false
        }
    } catch (error) {
        console.error('Fehler beim Aufrufen der API:', error);
        return false
    }
}
