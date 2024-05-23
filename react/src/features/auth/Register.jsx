import React, { useEffect, useRef} from "react";
import { useFormik } from 'formik';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { AutoComplete } from "primereact/autocomplete";
import { useRegisterMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import Error from "../../components/Error";

export default function Register() {
    const [registerFunc, { isError, isSuccess, error }] = useRegisterMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
        }
    }, [isSuccess,navigate])
    const toast = useRef(null);

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted' }); 
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            phone: '',
            user_id: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.firstName) {
                errors.firstName = 'FirstName is required.';
            }
            if (!data.lastName) {
                errors.lastName = 'LastName is required.';
            }
            if (!data.password) {
                errors.password = 'Password is required.';
            }
            if (!data.email) {
                errors.email = 'Email is required.';
            }
            return errors;
        },
        onSubmit: (data) => {
            data && show();
            formik.resetForm();
            registerFunc(data)
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
        <br></br>
        <div style={{ marginTop: '200px',minHeight:'53vh'}}>
        <form onSubmit={formik.handleSubmit} className="flex flex-wrap  gap-3 p-fluid" style={{ width: '50%', marginLeft: '25%' }}>
            <h1 style={{textAlign:'center',width:'100%'}}>Register:</h1>
            
            <div className="flex-auto">
                <label htmlFor="value">FirstName</label>
                <AutoComplete
                    inputId="firstName"
                    name="firstName"
                    value={formik.values.firstName}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('firstName', e.value);
                    }}
                />
                {getFormErrorMessage('firstName')}
                </div>
                
                <div className="flex-auto">
                <label htmlFor="lastName">LastName</label>
                <AutoComplete
                    inputId="lastName"
                    name="lastName"
                    value={formik.values.lastName}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('lastName', e.value);
                    }}
                />
                {getFormErrorMessage('lastName')}
                </div>
                
                <div className="flex-auto">
                <label htmlFor="password">Password</label>
                <Toast ref={toast} />
                <Password
                    inputId="password"
                    name="password"
                    rows={5}
                    cols={30}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                    value={formik.values.password}
                    feedback={false}
                    onChange={(e) => {
                        formik.setFieldValue('password', e.target.value);
                    }}
                />

                {getFormErrorMessage('password')}
                </div>
                
                <div className="flex-auto">
                <label htmlFor="value">Email</label>

                <AutoComplete
                    inputId="email"
                    name="email"
                    value={formik.values.email}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('email', e.value);
                    }}
                />
                {getFormErrorMessage('email')}
                </div>
                
                <div className="flex-auto">
                <label htmlFor="value" >Phone</label>

                <AutoComplete
                    inputId="phone"
                    name="phone"
                    value={formik.values.phone}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('phone', e.value);
                    }}
                />
                {getFormErrorMessage('phone')}
                </div>
                
                <div className="flex-auto">
                <label htmlFor="value" >User_Id</label>

                <AutoComplete
                    inputId="user_id"
                    name="user_id"
                    value={formik.values.user_id}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('user_id', e.value);
                    }}
                />
                {getFormErrorMessage('user_id')} 
                </div>
                <Button label="Submit" type="submit" icon="pi pi-check" style={{ backgroundColor: '#C08F48', border: 'black' }} />
            </form>
            {isError && <Error error={error.data.messages} />}
        </div>
        </>
    )
}
