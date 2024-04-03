import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';

import Basket from '../features/basket/Basket';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { removeToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
export default function NavBar({visibleRight,setVisibleRight}) {
    const { firstName, isAdmin, isUser,_id } = useAuth()
    const dispatch = useDispatch()
    const navigate=useNavigate()
    // const itemRenderer = (item) => (
    //     <a className="flex align-items-center p-menuitem-link">
    //         <span className="mx-2">{item.label}</span>
    //         {item.badge && <Badge className="ml-auto" value={item.badge} />}
    //         {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    //     </a>
    // );
    // const [visibleRight, setVisibleRight] = useState(false);

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
                    label: 'רישום/התחברות',
                    url: '/login'
                },
                {
                    label: <Button style={{ color: 'white', opacity: "100%" }} text severity='info' onClick={() => {dispatch(removeToken());navigate("/")}}>התנתקות</Button>,

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
            url:'/adminUsers'
            
        },
        {
            label: 'מוצרים',
            url: '/adminProducts',
        },
        {
            label: `hello ${firstName ? firstName : 'Israel'}`,
            items: [
                {
                    label: 'רישום/התחברות',
                    url: '/login'
                },
                {
                label: <Button style={{ color: 'white', opacity: "100%" }} text severity='info' onClick={() => {navigate('/');dispatch(removeToken())}}>התנתקות</Button>,

                },
                {
                    label: 'עריכת פרטים אישיים',
                    url: '/update',
                },
 
            ]

        }
    ];
    const simpleUserItems=[
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
                {
                    label: <Button style={{ color: 'white', opacity: "100%" }} text severity='info' onClick={() => {dispatch(removeToken());navigate("/")}}>התנתקות</Button>,

                },
            ]

        }
    ];
    const start = <img alt="logo" src="logo.png" height="60" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Button icon="pi pi-shopping-cart" rounded text severity='info' onClick={() => setVisibleRight(true)} ></Button>
        </div>
    );

const items=isAdmin ?adminItems:isUser?useriItems:simpleUserItems

    return (
        <>
        <div className="card">
           
                <Menubar model={items} start={start} end={isAdmin?null:end} /> 
                       
                        <Basket  setVisibleRight={setVisibleRight} visibleRight={visibleRight}/>
        </div>
        </>
    )
}
