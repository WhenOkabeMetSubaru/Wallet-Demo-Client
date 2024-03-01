import { useNavigate } from "react-router";
import auth from "../auth/auth";

import { createContext, useContext, useState, useEffect } from "react";
import { serverLink } from "../api/userApi";


const UserAuthContext = createContext({});

const UserAuth = ({ children }) =>
{
    const { verify, logout, loggedIn, updateData, currentUser, clearCart, setCurrentUser, cartUpdate, currentCart, currentBuyProduct, refreshCart, setCurrentBuyProduct } = UserProviderAuth();
    // const { error, data, loading } = useQuery(GET_USER_BY_ID);



    useEffect(() =>
    {
        if (auth.isAuthenticated() == false)
        {
            verify();
        }
    }, [])

    return (
        <UserAuthContext.Provider value={ { verify, logout, loggedIn, clearCart, updateData, currentUser, setCurrentUser, cartUpdate, currentCart, currentBuyProduct, refreshCart, setCurrentBuyProduct } }>
            <div>
                { children }
            </div>
        </UserAuthContext.Provider>
    )
}

export default UserAuth;

export const UserAuthFinal = () =>
{
    return useContext(UserAuthContext)
}


const UserProviderAuth = () =>
{
    const [isUpdated, setIsUpdated] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const [currentCart, setCurrentCart] = useState([]);
    const [currentBuyProduct, setCurrentBuyProduct] = useState([]);
    const abortController = new AbortController()
    const signal = abortController.signal

    useEffect(() =>
    {
       if(auth?.isAuthenticated()){
           fetch(`${serverLink}/api/v1/user/single`, {
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': 'Bearer ' + auth?.isAuthenticated()
               }
           }).then(res => res.json())
               .then(data =>
               {

                   setCurrentUser(data.data)
               })
       }

        // fetch(`${serverLink}/api/v1/user/cart/unique`, {
        //     method: "GET",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + auth?.isAuthenticated()
        //     }
        // }).then((res) => res.json())
        //     .then(data =>
        //     {
        //         if (data.status == false)
        //         {

        //             setCurrentCart(data.data)
        //         }
        //     })
    }, [auth?.isAuthenticated()])

    const navigate = useNavigate();

    // const userData = async ()=>{
    //     if(auth.isAuthenticated()!==false){

    //         if(!data.getUserByID.error){
    //             setCurrentUser(data.getUserByID.data)
    //         }
    //     }


    // }
    const updateData = () =>
    {
        setIsUpdated(true);
    }

    const loggedIn = () =>
    {
        if (auth.isAuthenticated() !== false)
        {
            return true;
        }
        return false;
    }

    const verify = () =>
    {

        if (auth.isAuthenticated() !== false)
        {
            navigate('/');
        } else
        {
            navigate('/login');
        }
    }

    const logout = () =>
    {
        auth.clearJWT(() =>
        {

        })

        navigate('/login')
    }


    const cartUpdate = () =>
    {

        fetch(`${serverLink}/api/v1/user/cart/add`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth?.isAuthenticated()
            }
        }).then((res) => res.json())
            .then(data =>
            {
                if (data.status == false)
                {

                    setCurrentCart(data.data)
                }
            })

        // fetch('http://localhost:4000/graphql', {
        //     method: 'POST',
        //     signal:signal,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + auth?.isAuthenticated()
        //     },
        //     body: JSON.stringify({
        //         query: `
        //         query {
        //             getCartByUser{
        //                 error
        //                 message
        //                 data{
        //                 _id
        //                 total_items
        //                 total_amount
        //                 total_discount
        //                 total_quantity
        //                 user {
        //                     _id
        //                 }
        //                 products{
        //                     product{
        //                     _id
        //                     name
        //                     mrp
        //                     sellingprice
        //                     }
        //                 }
        //                 }
        //             }
        //             }
        //         `
        //     })
        // })

        // fetch('http://localhost:4000/graphql', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + auth?.isAuthenticated()
        //     },
        //     body: JSON.stringify({
        //         query: `
        //                     mutation{
        //                         addNewCart{
        //                             error
        //                             message
        //                             data{
        //                             _id
        //                             total_items
        //                             total_amount
        //                             total_discount
        //                             total_quantity
        //                             user {
        //                                 _id
        //                             }
        //                             products{
        //                                 product{
        //                                 _id
        //                                 name
        //                                 description
        //                                 discount
        //                                 Unit
        //                                 images
        //                                 quantity
        //                                 mrp
        //                                 sellingprice
        //                                 features
        //                                 offers
        //                                 owner{
        //                                   _id 
        //                                   name
        //                                 }
        //                                 shop{
        //                                   _id 
        //                                   name
        //                                 }
        //                                 manufacture
        //                                 model
        //                                 sku
        //                                 }
        //                                 quantity
        //                             }
        //                             }
        //                         }
        //                         }
        //         `
        //     })
        // }).then(res => res.json())
        //     .then(data =>
        //     {
        //         setCurrentCart(data.data.addNewCart.data);
        //     })
    }

    const refreshCart = () =>
    {

        fetch(`${serverLink}/api/v1/user/cart/unique`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth?.isAuthenticated()
            }
        }).then((res) => res.json())
            .then(data =>
            {
                if (data.status == false)
                {

                    setCurrentCart(data.data)
                }
            })

        // fetch('http://localhost:4000/graphql', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'Bearer ' + auth?.isAuthenticated()
        //     },
        //     body: JSON.stringify({
        //         query: `
        //         query {
        //             getCartByUser{
        //                 error
        //                 message
        //                 data{
        //                 _id
        //                 total_items
        //                 total_amount
        //                 total_discount
        //                 total_quantity
        //                 user {
        //                     _id
        //                 }
        //                 products{
        //                     product{
        //                     _id
        //                     name
        //                     description
        //                     discount
        //                     Unit
        //                     images
        //                     quantity
        //                     mrp
        //                     sellingprice
        //                     features
        //                     offers
        //                     owner{
        //                       _id 
        //                       name
        //                     }
        //                     shop{
        //                       _id 
        //                       name
        //                     }
        //                     manufacture
        //                     model
        //                     sku
        //                     }
        //                     quantity
        //                 }
        //                 }
        //             }
        //             }
        //         `
        //     })
        // }).then((res) => res.json())
        //     .then(data =>
        //     {

        //         if (data.data.getCartByUser.error == false)
        //         {
        //             setCurrentCart(data.data.getCartByUser.data)
        //         }
        //     })

    }

    const clearCart = () =>
    {
        setCurrentCart({});
    }

    return {
        verify, logout, loggedIn, updateData, currentUser, clearCart, setCurrentUser, cartUpdate, currentCart, currentBuyProduct, refreshCart, setCurrentBuyProduct

    }
}

