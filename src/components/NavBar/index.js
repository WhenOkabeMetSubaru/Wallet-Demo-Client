import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import auth from '../../features/auth/auth'
import { UserAuthFinal } from '../../features/providers/userAuthProvider'

import './navbar.css'
import Search from 'antd/lib/input/Search'
import { Input } from 'antd'
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { BsCartFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa'
import { FaWallet } from "react-icons/fa";
import { getWalletByUserToken } from '../../features/api/walletApi'


const NavBar = ({ children }) =>
{

    const { logout, currentUser, currentCart } = UserAuthFinal();
    const [cartCount, setCartCount] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchProduct, setSearchProduct] = useState([]);

    const [walletDetails,setWalletDetails] = useState({})

    const navigate = useNavigate();
    const handlelogout = () =>
    {
        logout()
    }
    useEffect(() =>
    {
       
        getWalletByUserToken({ token: auth?.isAuthenticated() }).then((data) =>
        {
            setWalletDetails(data.data)
        })

    }, [])

    useEffect(() =>
    {
        // searchProductHomeScreen({ name: searchValue }).then((res) =>
        // {
        //     setSearchProduct(res.data)
        // })

    }, [searchValue])

    return (<>

        <nav className='h-[60px] shadow w-full text-white flex justify-between px-8 items-center bg-purple-900 fixed z-50 top-0 right-0 left-0'>

            <div className='flex gap-[10px]  w-1/2 ml-20 items-center'>
                <Link to="/" className='text-white hover:text-white'>
                    <p className='text-2xl font-bold '>Wallet Test</p>
                </Link>
                {/* <div className='w-4/5 relative'>
                    <Input value={ searchValue } onChange={ async (e) =>
                    {
                        setSearchValue(e.target.value);
                    } } placeholder='Search for products,brands and more' suffix={ <AiOutlineSearch size={ 22 } className="text-gray-400" /> } className='w-full h-[40px]' style={ { padding: '4px', paddingLeft: '20px', font: 'status-bar', fontSize: 'medium' } } />
                    {
                        searchValue?.length > 0 && searchProduct?.length > 0 &&
                        <div className='absolute top-10 overflow-y-auto h-96 z-20 w-full shadow rounded-b bg-white'>
                            {
                                searchProduct?.map((product) =>
                                {
                                    return (
                                        <a target='_blank' rel={ "noreferrer" } href={ "http://localhost:3000/product/" + product?._id } key={ product._id } className='h-20 cursor-pointer hover:bg-gray-50 flex items-center gap-x-2 px-2'>
                                            <img src={ product?.images[0] || "https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100" } className='w-14 h-14 rounded' />
                                            <div className='flex flex-col justify-start'>
                                                <p className='text-[0.95rem] text-black '>{ product?.name }</p>
                                                <p>.</p>
                                            </div>
                                        </a>
                                    )
                                })
                            }
                        </div>
                    }
                </div> */}

            </div>



            <div className='w-1/3 px-10 justify-end gap-x-10 flex items-center '>
                <div className='flex gap-x-2.5 px-4 rounded py-2 bg-[#e4e3e32a]'>
                    <FaWallet color="white" title='Wallet' onClick={ () => navigate('/') } className='cursor-pointer' size={ 25 } />
                    <p className='text-[0.8rem]'>₹{walletDetails?.amount}</p>
                </div>
                {/* <Link to={ "/cart" } className="text-white hover:text-white">
                    <div className='flex relative items-center cursor-pointer gap-[5px]'>
                        <BsCartFill title={ "Cart" } size={ 24 } />
                        <p className='mt-4 font-semibold text-[17px] '>Cart</p>
                        <p hidden={ cartCount == 0 || !cartCount } className='w-4 h-4 text-center text-xs right-8 bottom-3 absolute bg-blue-400 rounded-full'>{ cartCount || '' }</p>
                    </div>
                </Link> */}
            </div>
        </nav>
        <div style={ { paddingTop: '60px' } }>
            { children }

        </div>
    </>
    )
}

export default NavBar