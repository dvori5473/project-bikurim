import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import Basket from '../features/basket/Basket';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { removeToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function NavBar({ visibleRight, setVisibleRight }) {
    const { firstName, isAdmin, isUser, _id } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const useriItems = [ 

        {
            label: 'חנות',
            url: '/product',
            key: 5
        },
        {
            label: `hello ${firstName ? firstName : 'Israel'}`,
            items: [
                {
                    label: <Button style={{ color: 'white', opacity: "100%" }} text severity='info' onClick={() => { dispatch(removeToken()); navigate("/") }}>התנתקות</Button>,

                },
                {
                    label: 'עריכת פרטים אישיים',
                    url: '/update',
                },
                {
                    label: 'ההזמנות שלי',
                    url: `/orders/${_id}`
                },
            ]

        }
    ];
    const adminItems = [
        {
            label: 'משתמשים',
            url: '/adminUsers'

        },
        {
            label: 'מוצרים',
            url: '/adminProducts',
        },
        {
            label: `hello ${firstName ? firstName : 'Israel'}`,
            items: [
                {
                    label: <Button style={{ color: 'white', opacity: "100%" }} text severity='info' onClick={() => { navigate('/'); dispatch(removeToken()) }}>התנתקות</Button>,

                },
                {
                    label: 'עריכת פרטים אישיים',
                    url: '/update',
                },

            ]

        }
    ];
    const simpleUserItems = [
        {
            label: 'חנות',
            url: '/product',
            key: 5
        },
        {
            label: `hello ${firstName ? firstName : 'Israel'}`,
            items: [
                {
                    label: 'רישום/התחברות',
                    url: '/login'
                },
            ]

        }
    ];
    const start = <Link to={'/'} ><img alt="logo" src="logo.png" height="60" className="mr-2" style={{ paddingLeft: '15px' }}></img></Link>;
    const end = (
        <div className="flex align-items-center gap-2" style={{ paddingRight: '25px' }}>
            <Button icon="pi pi-shopping-cart" rounded text severity="info" onClick={() => setVisibleRight(true)} style={{ color: '#C08F48' }}></Button>

        </div>
    );

    const items = isAdmin ? adminItems : isUser ? useriItems : simpleUserItems

    return (
        <>
            <div style={{ backgroundColor: '#C08F48', opacity: '0.9', padding: '5px', position: 'fixed', width: '95%', left: '2.5%', zIndex: '100' }}>

                <Menubar model={items} start={start} end={isAdmin ? null : end} />

                {!isAdmin ? <Basket setVisibleRight={setVisibleRight} visibleRight={visibleRight} /> : <></>}
            </div>
        </>
    )
}
