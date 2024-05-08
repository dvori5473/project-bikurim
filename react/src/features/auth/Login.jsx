import React, { useEffect } from "react";
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { AutoComplete } from "primereact/autocomplete";
import { Divider } from 'primereact/divider';
import { Link } from 'react-router-dom';
import { setToken } from "./authSlice";
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { useUpdateBasketMutation } from "../user/userApiSlice";
import Error from "../../components/Error";

export default function Login({ setToCheckout, toCheckout }) {


    const [loginFunc, { isError:loginIsError, error, isSuccess, data }] = useLoginMutation()
    const [updateBasket, { isSuccess: updateBasketIsSuccess, data: dataUpdateBasket }] = useUpdateBasketMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            const basket = JSON.parse(localStorage.getItem("basket"))
            if (basket?.products.length > 0) {
                updateBasket(basket)
            }
            else {
                navigate('/')
            }
        }
    }, [isSuccess])

    useEffect(() => {
        if (updateBasketIsSuccess) {
            dispatch(setToken(dataUpdateBasket))
            localStorage.removeItem("basket")
            if (toCheckout) {
                setToCheckout(false)
                navigate('/checkout')
            }
            else {
                navigate('/')
            }
        }
    }, [updateBasketIsSuccess])


    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''

        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'email is required';
            }

            if (!data.password) {
                errors.password = 'Password is required';
            }

            return errors;
        },
        onSubmit: (data) => {
            formik.resetForm();
            loginFunc(data)
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
    return (
        <>

            <br></br>
            <div className="card" style={{ marginTop: "150px", width: '85%', marginLeft: '7.5%' }}>

                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5" >
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">


                            <label className="w-6rem">Email</label>
                            <AutoComplete
                                inputId="email"
                                name="email"
                                value={formik.values.email}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}
                                onChange={(e) => {
                                    formik.setFieldValue('email', e.value);
                                }}
                            />
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Password</label>
                            <Password
                                inputId="password"
                                name="password"
                                rows={5}
                                cols={30}
                                className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                                value={formik.values.password}
                                feedback={false}
                                onChange={(e) => {
                                    formik.setFieldValue('password', e.target.value);
                                }}
                            />
                            {getFormErrorMessage('password')}
                        </div>
                        <Button label="Login" type="submit" icon="pi pi-check" onClick={formik.handleSubmit} />
                         
                    </div>
                    
                    <div className="w-full md:w-2">
                        <Divider layout="vertical" className="hidden md:flex">
                            <b>OR</b>
                        </Divider>
                        <Divider layout="horizontal" className="flex md:hidden" align="center">
                            <b>OR</b>
                        </Divider>
                    </div>
                    <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                        <Link to='/register'><Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button></Link>
                    </div>

                </div>
               {loginIsError && <Error error={error.data.messages} />}
            </div>
           
        </>
    )
}











