import React, { useEffect, useState } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import Address from "./Address";
import { Button } from "primereact/button";
import { useAddOrderMutation } from '../order/orderApiSlice';
import { useCleaningBasketMutation } from "../user/userApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { setToken } from "../auth/authSlice";
import Error from "../../components/Error";

export default function Checkout() {
    const [addAddress, setAddAddress] = useState(false)
    const [addOrder, { isSuccess: issuccess,isError,error }] = useAddOrderMutation()
    const [cleaningBasket, { data, isSuccess: is }] = useCleaningBasketMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useAuth()
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        if (issuccess) {
            if (!flag) {
                setFlag(true)
                cleaningBasket({ _id: user._id })
            }

            if (is) {
                dispatch(setToken(data))
                sessionStorage.removeItem("Address")
                navigate("/")
            }
        }

    }, [issuccess, is])
    return (
        <>
            <br></br>
            <div style={{ marginTop: '100px' }}>
                <Accordion multiple activeIndex={[0]}>
                    <AccordionTab header="שיטת משלוח">
                        <p className="m-0">
                            {user.basket.payment > 200 ? <h3> זכאי למשלוח חינם</h3> : <h3>עלות המשלוח 30₪</h3>}

                        </p>
                    </AccordionTab>
                    <AccordionTab header="פרטי משלוח">
                        <p className="m-0">
                            {user.defaultAddress ?
                                <>
                                    <div style={{ marginLeft: '20%', border: "5px solid #C08F48", padding: "", width: "60%", textAlign: 'center' }}>
                                        <h4>{user.defaultAddress.firstName} {user.defaultAddress.lastName}</h4>
                                        <h4>{user.defaultAddress.street} {user.defaultAddress.houseNumber} ,{user.defaultAddress.apartment}</h4>
                                        <h4>{user.defaultAddress.city}</h4>
                                        <h4>Israel</h4>
                                        <h4>{user.defaultAddress.phone}</h4>

                                    </div> <br />
                                    {addAddress ? <Address /> : <Button label="הוספת כתובת" onClick={() => { setAddAddress(true) }} />}
                                </> :
                                <><Address /></>}
                                  
                        </p>
                    </AccordionTab>
                    <AccordionTab header="שיטת תשלום">
                        <p className="m-0">
                            {user.basket.payment > 200 ? <h3>₪{user.basket.payment} לתשלום</h3> : <h3>₪{user.basket.payment + 30} לתשלום</h3>}
                            <Button label=" לתשלום" onClick={() => addOrder({ address: sessionStorage.getItem("Address") ? JSON.parse(sessionStorage.getItem("Address")) : user.defaultAddress })} style={{backgroundColor:' #C08F48' ,border: '5px solid'}} />
                        </p>
                    </AccordionTab>
                </Accordion>
                {isError && <Error error={error.data.messages} />}
            </div>
        </>
    )
}
