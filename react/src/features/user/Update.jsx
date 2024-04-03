import React, { useEffect, useRef, useState } from "react";
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { AutoComplete } from "primereact/autocomplete";
import { useUpdateUserMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setToken } from "../auth/authSlice";

export default function Update() {
    const user = useAuth()
    const dispatch=useDispatch()
    // const [items, setItems] = useState([]);
    const [updateUser, { isError, isSuccess, isLoading, data, error }] = useUpdateUserMutation()
    const navigate = useNavigate()
    
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            navigate('/')
        }
    }, [isSuccess])
    //const toast = useRef(null);

    // const show = () => {
    //     toast.current.show({ severity: 'success', summary: 'Form Submitted' });
    // };

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
            //data && show();
            //formik.resetForm();
            //console.log(data);
            updateUser(data);
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
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
                <label htmlFor="value">phone</label>

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
                <label htmlFor="value">User_Id</label>

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
                <Button label="Submit" type="submit" icon="pi pi-check" />
            </form>
        </div>
    )
}
