
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { AutoComplete } from "primereact/autocomplete";
import { useNavigate } from "react-router-dom";
import { CascadeSelect } from 'primereact/cascadeselect';
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";
import { useAddDefaultAddressMutation } from '../user/userApiSlice';
import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { setToken } from '../auth/authSlice';


const Address=()=>{
   
        // const [items, setItems] = useState([]);
const [addDefaultAddress, { isError, isSuccess, isLoading,error,data }] = useAddDefaultAddressMutation()
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const user = useAuth()
    const [checked, setChecked] = useState(false);
    const[submit,setSubmit]=useState(false)
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
        }
    }, [isSuccess])
    //const toast = useRef(null);

    const show = () => {
        //toast.current.show({ severity: 'success', summary: 'Form Submitted' });
    };

    const formik = useFormik({
        initialValues: {
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            city:'',
            street:'',
            houseNumber:'',
            apartment:'',
            postalCode:'',
            phone: user.phone
        },
        validate: (data) => {
            let errors = {};

            if (!data.firstName) {
                errors.firstName = 'FirstName is required.';
            }
            if (!data.lastName) {
                errors.lastName = 'LastName is required.';
            }
            if (!data.city) {
                errors.city = 'City is required.';
            }
            if (!data.street) {
                errors.street = 'Street is required.';
            }
            if (!data.houseNumber) {
                errors.houseNumber = 'HouseNumber is required.';
            }
            if (!data.postalCode) {
                errors.postalCode = 'PostalCode is required.';
            }
            if (!data.phone) {
                errors.phone = 'Phone is required.';
            }
            return errors;
        },
        onSubmit: (data) => {
            data&&show();
            if(checked){
            addDefaultAddress(data)
             }
             else{
                sessionStorage.setItem("Address",JSON.stringify(data))
             }
             setSubmit(true)
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };
     return(
         
          <div className="card flex justify-content-center">
            {!submit?
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

                <label htmlFor="value">LastName</label>
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

                <label htmlFor="value">City</label>
                <AutoComplete
                    inputId="city"
                    name="city"
                    value={formik.values.city}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('city', e.value);
                    }}
                />
                {getFormErrorMessage('city')}

                <label htmlFor="value">Street</label>
                <AutoComplete
                    inputId="street"
                    name="street"
                    value={formik.values.street}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('street', e.value);
                    }}
                />
                {getFormErrorMessage('street')}

                <label htmlFor="value">HouseNumber</label>
                <AutoComplete
                    inputId="houseNumber"
                    name="houseNumber"
                    value={formik.values.houseNumber}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('houseNumber', e.value);
                    }}
                />
                {getFormErrorMessage('houseNumber')}

                <label htmlFor="value">Apartment</label>
                <AutoComplete
                    inputId="apartment"
                    name="apartment"
                    value={formik.values.apartment}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('apartment', e.value);
                    }}
                />
                {getFormErrorMessage('apartment')}

                <label htmlFor="value">PostalCode</label>
                <AutoComplete
                    inputId="postalCode"
                    name="postalCode"
                    value={formik.values.postalCode}
                    className={classNames({ 'p-invalid': isFormFieldInvalid('item') })}
                    onChange={(e) => {
                        formik.setFieldValue('postalCode', e.value);
                    }}
                />
                {getFormErrorMessage('postalCode')}

                <label htmlFor="value">Phone</label>
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
                <Checkbox onChange={e => setChecked(e.checked)} checked={checked} type='submit'>שמירה ככתובת דפולטיבית</Checkbox>
                <Button label="שמירת כתובת " type="submit"  />
            </form>:
            <div style={{border:"2px solid white", padding:"20px"}}>
                <h4>{formik.values.firstName} {formik.values.lastName}</h4>
                <h4>{formik.values.street} {formik.values.houseNumber} ,{formik.values.apartment}</h4>
                <h4>{formik.values.city}</h4>
                <h4>Israel</h4>
                <h4>{formik.values.phone}</h4>
                
                </div>}
        </div>

     )
}
export default Address