import React, { useEffect, useState } from 'react'
import { Form, Input, notification } from 'antd'


import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { UserAuthFinal } from '../../features/providers/userAuthProvider';
// import { SIGN_IN_USER } from '../../../app/graphql/queries/mutations';
import auth from '../../features/auth/auth';
import { FaLock, FaUser } from 'react-icons/fa';
import { userLogin, userSignup } from '../../features/api/userApi';
// import graphQLQueries from '../../../app/graphql/queries';
// import { resolveReadonlyArrayThunk } from 'graphql';


const Login = () =>
{

    const { updateData, cartUpdate } = UserAuthFinal();
    const [tab, setTab] = useState("login");
    const [loader, setLoader] = useState(false);

    const [loginForm] = Form.useForm();
    const [signupForm] = Form.useForm();
    const navigate = useNavigate();

    // const [signupuser,{error,data,loading}] =useMutation(graphQLQueries.SIGN_IN_USER,{
    //   onCompleted(data){
    //     auth.authenticate(data.signin.token,()=>{console.log(data.signin.token)});
    //     navigate('/user')
    //   }
    // });



    const handleLogin = values =>
    {
        setLoader(true)
        userLogin(values).then((data) =>
        {
            

            auth.authenticate(data?.token, () => {  });
            setLoader(false)
            
            if(!data?.token){
                return ;
            }else{
                notification.success({message:'Login Successful'})
            }
            navigate("/");

        })
        setLoader(false);
    }

    const handleSignup = values =>
    {
        userSignup(values).then((data) =>
        {
            notification.success({ message: data.info });
            setTab("login")
        })
    }

    return (
        <>
            <Tabs name={ "login" } tab={ tab }>
                <section className='flex justify-center items-center z-50 bg-[#09020208]' style={ { width: '100%', height: '100vh' } }>
                    <div className='text-lg bg-white min-w-[30rem] px-14 py-8 rounded-lg shadow h-[30rem] border'>
                        <p className='text-3xl pt-2 pb-10 text-center font-bold text-orange-600'>Login</p>
                        <Form layout='vertical' className='' form={ loginForm } onFinish={ handleLogin }>
                            <Form.Item rules={ [{ required: true, message: "Email is required" }] } name="email" >
                                <Input style={ { height: '50px' } } placeholder='Email' prefix={ <FaUser /> } />
                            </Form.Item>
                            <Form.Item rules={ [{ required: true, message: "Password is required" }] } name="password" >
                                <Input.Password style={ { height: '50px' } } prefix={ <FaLock /> } placeholder='**********' />
                            </Form.Item>

                            <button className='flex w-full h-10 text-lg justify-center items-center bg-orange-600 text-white rounded shadow hover:bg-orange-700'>{ loader == false ? "Login" : <div className="loader"></div> }</button>

                            <p className='py-3 text-center text-lg font-semibold'>or</p>

                            <button onClick={ () => setTab('signup') } type="button" className='flex w-full h-10 text-lg justify-center items-center bg-indigo-600 text-white rounded shadow hover:bg-indigo-700'>SignUp</button>
                        </Form>
                    </div>
                </section>
            </Tabs>
            <Tabs name="signup" tab={ tab }>
                <section className='flex justify-center items-center z-50 bg-[#09020208]' style={ { width: '100%', height: '100vh' } }>
                    <div className='text-lg bg-white min-w-[30rem] px-14 py-8 rounded-lg shadow h-[35rem] border'>
                        <p className='text-3xl pt-2 pb-10 text-center font-bold text-orange-600'>Create an Account</p>
                        <Form layout='vertical' form={ signupForm } onFinish={ handleSignup }>
                            <Form.Item rules={ [{ required: true, message: "Name is required" }] } name="name" >
                                <Input style={ { height: '50px' } } placeholder='Name' prefix={ <FaUser /> } />
                            </Form.Item>
                            <Form.Item rules={ [{ required: true, message: "Email is required" }] } name="email" >
                                <Input style={ { height: '50px' } } placeholder='Email' prefix={ <FaUser /> } />
                            </Form.Item>
                            <Form.Item rules={ [{ required: true, message: "Password is required" }] } name="password" >
                                <Input.Password style={ { height: '50px' } } placeholder='**********' prefix={ <FaLock /> } />
                            </Form.Item>
                            <button className='flex w-full h-10 text-lg justify-center items-center bg-orange-600 text-white rounded shadow hover:bg-orange-700'>Signup</button>

                            <p className='py-3 text-center text-lg font-semibold'>or</p>

                            <button onClick={ () => setTab('login') } type="button" className='flex w-full h-10 text-lg justify-center items-center bg-indigo-600 text-white rounded shadow hover:bg-indigo-700'>Go to Login</button>
                        </Form>
                    </div>
                </section>
            </Tabs>


        </>
    )
}

export default Login

export const Tabs = ({ children, name, tab }) =>
{
    return (

        tab == name ? <section className="w-full" children={ children } /> : <></>
    )
}