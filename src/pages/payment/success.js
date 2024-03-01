
import React from 'react'
import { useSearchParams } from "react-router-dom"
const PaymentSuccess = () =>
{

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        <section className='text-lg'>
            <p>Success</p>
        </section>
    )
}

export default PaymentSuccess