import React from 'react';
import SectionTitle from '../../../Components/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

//? Here provide the pk.
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {

    return (
        <div>
            <SectionTitle heading='Payment'></SectionTitle>
            <div>
               <Elements stripe={stripePromise}>
                    <CheckoutForm/>
               </Elements>
            </div>
        </div>
    );
};

export default Payment;