import React from 'react'
import Layout from '../components/Layout/Layout'


const FAQ = () => {
  return (
    <Layout>
      <section class="py-5 bg-white sm:py-16 lg:py-24">
    <div class="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>

        <div class="flow-root mt-12 sm:mt-16">
            <div class="divide-y divide-gray--200 -my-9">
                <div class="py-9">
                    <p class="text-xl font-semibold text-black">How to create an account?</p>
                    <p class="mt-3 text-base text-gray-600">To create an account, click on the "Sign Up" button at the top right corner of our homepage, fill in the required information, and follow the prompts to complete the registration process.</p>
                    <p class="mt-3 text-base text-gray-600">You will can continue with our services.</p>
                </div>

                <div class="py-9">
                    <p class="text-xl font-semibold text-black">How do I place an order?</p>
                    <p class="mt-3 text-base text-gray-600">Browse our products, add the items you wish to purchase to your cart, and proceed to checkout. Follow the instructions to complete your purchase.</p>
                </div>

                <div class="py-9">
                    <p class="text-xl font-semibold text-black">What are your shipping options and rates?</p>
                    <p class="mt-3 text-base text-gray-600">We offer several shipping options including standard, expedited, and express shipping. Shipping rates vary depending on the delivery method and location. Detailed shipping information is available at checkout.</p>
                </div>

                <div class="py-9">
                    <p class="text-xl font-semibold text-black">Do you have a loyalty program?</p>
                    <p class="mt-3 text-base text-gray-600">
                        Yes, we have a loyalty program where you can earn points for every purchase. These points can be redeemed for discounts on future orders. Sign up for our loyalty program to start earning rewards.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

    </Layout>
  )
}

export default FAQ