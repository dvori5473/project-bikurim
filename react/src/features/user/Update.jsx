import React, { useEffect} from "react";
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { AutoComplete } from "primereact/autocomplete";
import { useUpdateUserMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setToken } from "../auth/authSlice";

export default function Update() {
    const user = useAuth()
    const dispatch=useDispatch()
    const [updateUser, { isSuccess, data }] = useUpdateUserMutation()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data)) 
            navigate('/')
        }
    }, [isSuccess,data,dispatch,navigate])

    const formik = useFormik({
        initialValues: {
            _id:user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            user_id: user.user_id
        },
        validate: (data) => {
            let errors = {};

            if (!data.firstName) {
                errors.firstName = 'FirstName is required.';
            }
            if (!data.lastName) {
                errors.lastName = 'LastName is required.';
            }
            return errors;
        },
        onSubmit: (data) => {
            updateUser(data);
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
        <br></br>
        <div style={{marginTop:'200px',minHeight:'53vh'}}>
            <form onSubmit={formik.handleSubmit} className="flex flex-wrap  gap-3 p-fluid" style={{width:'50%',marginLeft:'25%'}}>
            <h1 style={{textAlign:'center',width:'100%'}}>Edit details:</h1>
            <div className="flex-auto">
                <label htmlFor="value" className="font-bold block mb-2">FirstName</label>

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
                <label htmlFor="lastName" className="font-bold block mb-2">LastName</label>

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
                <label htmlFor="value" className="font-bold block mb-2">phone</label>

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
                <label htmlFor="value" className="font-bold block mb-2">User_Id</label>

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
                <Button label="Submit" type="submit" icon="pi pi-check" style={{backgroundColor:'#C08F48',border:'black'}}/>
            </form>
        </div>
        </>
    )
}
