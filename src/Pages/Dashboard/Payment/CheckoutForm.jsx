import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import useCart from '../../../Hooks/useCart';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const [cart, refetch] = useCart();
  const {user} = useAuth();
  const totalPrice = cart.reduce((total, curr) => total + curr.price, 0);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('')
  const [clientSecret, setClientSecret] = useState('');
  const navigate = useNavigate();


  //? Get stipe secret key.
  //* TODO : [There must have a price or it will give an error. So give it a condition if their is no value in the price don't hit the api.]

  useEffect(() => {

    if(totalPrice > 0) {
      axiosSecure.post('/create-payment-intent', {price : totalPrice})
    .then(res => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    })
  }

  }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if(!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type : 'card',
            card
        })

        if(error) {
            console.log(error);
            setError(error.message);
        }else{
            console.log(paymentMethod);
            setError('');
        }

        //? Confirm card payment
        const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(clientSecret, {
          payment_method : {
            card : card,
            billing_details : {
              email : user?.email || 'anonymous',
              name : user?.displayName || 'anonymous'
            }
          }
        })

        //? Handle the response of payment.
        if(confirmError) {

          console.log('Confirm Error', confirmError.message);

        }else {

          console.log("PaymentIntent", paymentIntent);
          if(paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
          }

        }

        //? Send the payment data to database to store it.
        const payment = {
          email : user?.email,
          price : totalPrice,
          transactionId : paymentIntent.id,
          date : new Date(),
          cartId : cart.map(item => item._id),
          menuId : cart.map(item => item.menuId),
          status : 'pending'
        }

        const res = await axiosSecure.post('/payments', payment);
        console.log(res.data);
        if(res.data.paymentResult.insertedId) {
          toast.success(`Payment successful with transaction id ${paymentIntent.id}`)
        }
        refetch();
        navigate('/dashboard/history')

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button disabled={!stripe || !clientSecret} className='px-5 py-2 bg-blue-500 text-white border-none rounded-md my-2' type="submit" disabled={!stripe}>
        Pay
      </button>
      <p className='text-gray-400 font-thin'>{error}</p>
        </form>
    );
};

export default CheckoutForm;