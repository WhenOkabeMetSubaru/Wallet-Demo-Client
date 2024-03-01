import auth from "../auth/auth";

export const serverLink = "https://fintechwallettest.vercel.app";
// export const serverLink = "http://localhost:4000";

export const userLogin =async ({email,password})=>{
   
    try {
        console.log("hello")
        let response = await fetch(`${serverLink}/api/v1/signin`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({email,password})
        })

        return await response.json();
    } catch (error) {
        return error.message;
    }
}


export const userSignup = async (userDetails) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(userDetails)
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}


export const getAllTransactionByUser = async ({token}) =>
{
    try
    {
        let response = await fetch(`${serverLink}/api/v1/user/transactions/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":"Bearer " + token || auth.isAuthenticated()
            }
        })

        return await response.json()
    } catch (error)
    {
        return error.message;
    }
}

