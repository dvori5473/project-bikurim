
import { Button } from 'primereact/button';
import React, { useEffect, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { useAddProductItemMutation } from '../basket/basketApiSlice';
import { useDispatch } from 'react-redux';
import { setToken } from '../auth/authSlice';
import {  useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useGetProductbyIdQuery } from './productApiSlice';
import { Galleria } from 'primereact/galleria';
import { Divider } from 'primereact/divider';
import IsLoading from '../../components/IsLoading';

const Product = ({ setVisibleRight }) => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const user = useAuth()
    const [value, setValue] = useState(1);
    const [addProduct, { isSuccess, data }] = useAddProductItemMutation()
    const { data: product, isLoading } = useGetProductbyIdQuery(id)

    useEffect(() => { 
        if (isSuccess) {
            dispatch(setToken(data))
            setVisibleRight(true)
        }
    }, [isSuccess,data,dispatch,setVisibleRight])
    if (isLoading) return <IsLoading/> 

    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];


    const itemTemplate = (item) => {

        return <img src={"https://server-knc7.onrender.com/uploads/" + item.split("\\")[2]} alt={item.alt} style={{ width: '100%', maxHeight: '420px' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={"https://server-knc7.onrender.com/uploads/" + item.split("\\")[2]} alt={item.alt} style={{ width: '50px' }} />;
    }
    const addProductToBasket = () => {
        if (localStorage.getItem("token")) {
            addProduct({ _id: user._id, product_id: product._id, quantity: value, description: `${product.name} ,${product.price}, ${product.description},`, imageURL: product.imageURL[0] })
        }
        else {
            const basket = JSON.parse(localStorage.getItem("basket"))
            if (basket) {
                const basket = JSON.parse(localStorage.getItem("basket"))
                const productFind = basket.products.find(p => p.product_id === product._id)
                if (!productFind) {
                    basket.products.push({ product_id: product._id, quantity: value, description: `${product.name} ,${product.price}, ${product.description},`, imageURL: product.imageURL[0] })
                    localStorage.setItem("basket", JSON.stringify(
                        {
                            products: basket.products,
                            payment: basket.payment + product.price * value
                        }))
                }
                else {
                    const index = basket.products.indexOf(productFind)
                    basket.products[index].quantity = basket.products[index].quantity + value
                    basket.payment = basket.payment + value * product.price
                    localStorage.setItem("basket", JSON.stringify(basket))
                }
            }
            else {
                localStorage.setItem("basket", JSON.stringify(
                    {
                        products: [{ product_id: product._id, quantity: value, description: `${product.name} ,${product.price}, ${product.description},`, imageURL: product.imageURL[0] }],
                        payment: product.price * value
                    }))
            }
            setVisibleRight(true)
        }
    }

    return (
        <>
            <br></br>
            <div  style={{ direction: 'rtl', marginTop: '150px', width: '70%', marginLeft: '5%',minHeight:'57vh' }}>
                <div className="flex flex-column md:flex-row" >
                    <div className="flex-column md:flex-row" style={{ maxWidth: '500px', minWidth: '300px' }}>
                        <h1><b>{product.name}</b></h1>
                        <h2><b>₪{product.price}</b></h2>
                        <h2><b>{product.description}</b></h2>
                        <InputNumber inputId="minmax-buttons" value={value} onValueChange={(e) => setValue(e.value)} mode="decimal" showButtons min={0} max={product.quantity} /><br></br><br></br>
                        <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={addProductToBasket} disabled={product.quantity === 0}></Button><br></br><br></br>
                    </div>
                    <Divider layout="vertical" className="hidden md:flex"> </Divider>
                    <div className="flex flex-column md:flex-row" style={{ minWidth: "300px", maxWidth: "500" }}>
                        <Galleria value={product.imageURL} responsiveOptions={responsiveOptions} numVisible={5} circular style={{ maxWidth: '500px' }}
                            showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default Product