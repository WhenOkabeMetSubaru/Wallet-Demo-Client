import auth from "../auth/auth";

export const getWalletByUserToken = async ({ token }) =>
{

    try
    {

        let response = await fetch("http://localhost:4000/api/v1/user/wallet/details", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token || auth?.isAuthenticated()
            }
        })

        return await response.json();
    } catch (error)
    {
        return error.message;
    }
}


export const addMoneyToWallet = async ({ amount, token }) =>
{

    try
    {

        let response = await fetch("http://localhost:4000/api/v1/user/wallet/addmoney", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token || auth?.isAuthenticated()
            },
            body: JSON.stringify({
                amount
            })
        })

        return await response.json();
    } catch (error)
    {
        return error.message;
    }
}


export const confirmAmount = async ({ amount, token }) =>
{

    try
    {

        let response = await fetch("http://localhost:4000/api/v1/user/create/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token || auth?.isAuthenticated()
            },
            body: JSON.stringify({
                amount
            })
        })

        return await response.json();
    } catch (error)
    {
        return error.message;
    }
}

export const paymentVerification = async ({ paymentDetails, token: token }) =>
{

    try
    {

        let response = await fetch("http://localhost:4000/api/v1/user/payment/verification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(paymentDetails)
        })

        return await response.json();
    } catch (error)
    {
        return error.message;
    }
}


export const getKey = async ({ token }) =>
{

    try
    {

        let response = await fetch("http://localhost:4000/api/v1/user/payment/key", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token || auth?.isAuthenticated()
            }
        })

        return await response.json();
    } catch (error)
    {
        return error.message;
    }
}

export const getKeyRazorpay = async ({ token }) =>
{

    try
    {

        let resp = await fetch(`https://api.razorpay.com/v1/orders/order_Nh5vMPDNrYNSWo`, {
            method: "GET",
            headers: {


                'X-User-Id': "rzp_test_h29uCFs0FZuqn5",
                'X-Auth-Token': "vTYEKFdaqkhwftISc2SCkumV"

            }
        })
        console.log(resp);
    } catch (error)
    {
        return error.message;
    }
}