import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { PiUserCircleLight } from "react-icons/pi";
import { SiMoneygram } from "react-icons/si";
import { MdRedeem } from "react-icons/md";
import { addMoneyToWallet, confirmAmount, getKey, getKeyRazorpay, getWalletByUserToken } from '../../features/api/walletApi';
import auth from '../../features/auth/auth';
import { UserAuthFinal } from '../../features/providers/userAuthProvider';
import { Modal, Input ,Table} from 'antd'
import { Link } from 'react-router-dom';
import { getAllTransactionByUser } from '../../features/api/userApi';

const Home = () =>
{

    const [walletDetails, setWalletDetails] = useState({});
    const [openAddBox, setOpenAddBox] = useState(false);
    const [transactionDetails,setTransactionDetails] = useState([])
    const [pageSize,setPageSize] = useState(10);
    const [current,setCurrent] = useState(1);
    const [total,setTotal] = useState(100);

    const [walletValue, setWalletValue] = useState()
    const { currentUser } = UserAuthFinal();


    useEffect(() =>
    {
        getWalletByUserToken({ token: auth?.isAuthenticated() }).then((data) =>
        {
            setWalletDetails(data.data)
        })

        getAllTransactionByUser({token:auth?.isAuthenticated()}).then((data)=>{
            setTransactionDetails(data.data)
        })


        getKeyRazorpay({token:auth?.isAuthenticated()})
    }, [])

    const handleAddMoney = async () =>
    {

        // addMoneyToWallet({ amount: walletValue, token: auth?.isAuthenticated() }).then((data) =>
        // {

        //     getWalletByUserToken({ token: auth?.isAuthenticated() }).then((data) =>
        //     {
        //         setWalletDetails(data.data)
        //     })
        //     getAllTransactionByUser({ token: auth?.isAuthenticated() }).then((data) =>
        //     {
        //         setTransactionDetails(data.data)
        //     })

        //     setWalletValue(0)
        //     setOpenAddBox(false);
        // })

        const keyResponse = await getKey({token:auth?.isAuthenticated()})

        const orderResponse = await confirmAmount({amount:walletValue,token:auth?.isAuthenticated()})

        const options = {
            key:keyResponse?.data,
            amount: orderResponse?.data?.amount,
            currency: "INR",
            name: currentUser?.name,
            description: "Tutorial of RazorPay",
            order_id: orderResponse?.data?.id,
            callback_url: "http://localhost:4000/api/v1/user/payment/verification",
            prefill: {
                name: currentUser?.name,
                email: currentUser?.email,
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        console.log(options)
        const razor = new window.Razorpay(options);
        razor.on('payment.failed',(res)=>{
            console.log(res)
        })
        razor.open();
    }


    const columns = [
        { title: 'S.No', dataIndex: 'key' },
        {title:"Amount",dataIndex:'amount'},
        {title:"Status",dataIndex:'transaction_status'},
        {title:"Created",dataIndex:'created'}
       

    ]

    const handlePagination   = (current,pageSize)=>{

    }


    return (
        <NavBar>
            <section className='min-h-screen w-full bg-gray-50 flex justify-center'>
                <div className='w-[80%] bg-white shadow-sm'>
                    <div className='min-h-[20rem] my-2  pl-10 pr-28 justify-between items-center flex'>
                        <div className='w-1/4 min-h-[20rem] flex gap-y-1 flex-col items-center justify-center '>
                            <p className='text-2xl font-semibold mb-5'>Profile Details</p>
                            <PiUserCircleLight size={ 100 } />
                            <p>{ currentUser?.name }</p>
                            <p>{ currentUser?.email } </p>
                        </div>
                        <div className='w-[20rem]'>
                            <div className='h-[10rem] w-[20rem] p-3 relative rounded-lg shadow bg-gradient-to-tr from-blue-700 to-blue-500 text-white'>
                                <p className='text-[0.8rem]'>Balance</p>
                                <p className='text-3xl mt-2'>₹ { walletDetails?.amount }</p>
                                <p className='absolute right-3 bottom-2 text-lg font-semibold'>VISA</p>
                            </div>
                            <div className='pt-2 flex gap-x-2'>
                                <button onClick={ () => setOpenAddBox(true) } className='flex h-10 w-1/2 rounded-lg justify-center bg-white shadow gap-x-2 items-center'>
                                    <p className='text-[0.85rem] font-semibold'>Add Money</p>
                                    <SiMoneygram size={ 15 } />
                                </button>
                                <button className='flex h-10 w-1/2 rounded-lg justify-center bg-white shadow gap-x-2 items-center'>
                                    <p className='text-[0.85rem] font-semibold'>Redeem</p>
                                    <MdRedeem size={ 18 } />
                                </button>
                            </div>
                        </div>


                    </div>
                    <div className='p-5'>
                        <p className='text-xl font-semibold mb-10'>Transaction Details</p>
                        <Table columns={ columns }
                            className='border border-b-gray-100 '
                            onChange={ handlePagination }
                            pagination={ { current, pageSize, total } }
                            dataSource={
                                transactionDetails?.map((bill, index) =>
                                {
                                    return {
                                        key: (current - 1) * pageSize + index + 1,
                                        ...bill
                                    }
                                })
                            } />
                    </div>
                </div>
            </section>


            <Modal open={ openAddBox } onCancel={ () => setOpenAddBox(false) } footer={ "" } title="Add Money to Wallet">

                <div className='p-2'>
                    <p className='text-[0.76rem] pt-3'>Amount</p>
                    <Input prefix="₹" type={ "number" }
                        style={ { height: 50, fontSize: "large" } } value={ walletValue } onChange={ (e) => { setWalletValue(+e.target.value) } } />

                    <button type="button" onClick={ ()=>{handleAddMoney()} } className='w-full h-10 rounded shadow bg-purple-900 text-white mt-10 flex justify-center items-center'>
                        <p>Add</p>
                    </button>
                </div>

            </Modal>


        </NavBar>
    )
}

export default Home