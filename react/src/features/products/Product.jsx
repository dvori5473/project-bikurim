
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { useAddProductItemMutation } from '../basket/basketApiSlice';
import { useDispatch } from 'react-redux';
import { setToken } from '../auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoginMutation } from '../auth/authApiSlice';
import useAuth from '../../hooks/useAuth';
import { useGetProductbyIdQuery } from './productApiSlice';
import { Galleria } from 'primereact/galleria';
import { Divider } from 'primereact/divider';
//import { PhotoService } from './service/PhotoService';



const Product = () => {
    // const product = JSON.parse(localStorage.getItem("Product"))
    const { id } = useParams()
    console.log(id);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useAuth()
    const [value, setValue] = useState(1);
    const [addProduct, { isSuccess, data }] = useAddProductItemMutation()
    const { data: product, isLoading, isSuccess: is, isError, error } = useGetProductbyIdQuery(id)


    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            navigate('/basket')
        }
    }, [isSuccess])
    if (isLoading) {
        return <h1>isLoading</h1>
    }

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

    // useEffect(() => {

    //         // PhotoService.getImages().then(data => setImages(data));
    // }, []);

    const itemTemplate = (item) => {

        return <img src={"http://localhost:1234/uploads/" + item.split("\\")[2]} alt={item.alt} style={{ width: '100%', height: '500px', display: 'block' }} />;
    }

    const thumbnailTemplate = (item) => {
        return <img src={"http://localhost:1234/uploads/" + item.split("\\")[2]} alt={item.alt} style={{ width: '50px', display: 'block' }} />;
    }
    const addProductToBasket = () => {
        if (localStorage.getItem("token")) {
            addProduct({ _id: user._id, product_id: product._id, quantity: value, description: `${product.name} ,${product.price}, ${product.description},`, imageURL: product.imageURL[0] })
        }
        else {
            const basket = JSON.parse(localStorage.getItem("basket"))
            if (basket) {
                const basket = JSON.parse(localStorage.getItem("basket"))
                const productFind = basket.products.find(p => p.product_id == product._id)
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
            navigate('/basket')
        }
    }

    return (
        <>

            <div className="flex flex-column md:flex-row" style={{direction:'rtl'}}>   
                <div className=" flex-column md:flex-row"style={{minWidth:"300px",maxWidth:"500"}}>
                <h1><b>{product.name}</b></h1><br></br>
                <h2><b>₪{product.price}</b></h2><br></br>
                <h2><b>{product.description}</b></h2><br></br>
                <div className="flex-auto">
                    <InputNumber inputId="minmax-buttons" value={value} onValueChange={(e) => setValue(e.value)} mode="decimal" showButtons min={0} max={100} />
                </div><br></br>
                <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={addProductToBasket} disabled={product.quantity===0}></Button><br></br><br></br>
                </div>
           <Divider layout="vertical" className="hidden md:flex"> </Divider>
           <div className="flex flex-column md:flex-row"style={{minWidth:"300px",maxWidth:"500"}}>
                <Galleria value={product.imageURL} responsiveOptions={responsiveOptions} numVisible={5} circular style={{ maxWidth: '640px' }}
                    showItemNavigators showItemNavigatorsOnHover item={itemTemplate} thumbnail={thumbnailTemplate} />
                </div>
            </div>
        </>
    )
}
export default Product