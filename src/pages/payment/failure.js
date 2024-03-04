
import React from 'react'
import { Link, useSearchParams } from "react-router-dom"
import NavBar from '../../components/NavBar'
import Lottie from "lottie-react"
import failed from '../../features/failed-mail.json'

const PaymentFailure= () =>
{

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        <NavBar>
            <section className='min-h-screen bg-gray-50 w-full flex justify-center items-center'>
                <div className='w-[30rem] flex flex-col items-center justify-center h-[30rem] bg-white shadow rounded-lg'>
                    <Lottie className="w-[20rem] h-[20rem]" animationData={ failed } />
                    <p className='text-2xl text-red-600  my-3 font-semibold'>Payment Failed</p>
                    <Link to="/" className="mt-2 underline hover:text-gray-400">Return to Home Screen</Link>
                </div>
            </section>

        </NavBar>
    )
}

export default PaymentFailure