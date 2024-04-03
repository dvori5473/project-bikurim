import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../products/productApiSlice';
import { useDeleteProductMutation, useUpdateProductQuantityMutation } from './basketApiSlice';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import useAuth from '../../hooks/useAuth';
import { setToken } from '../auth/authSlice';
import { useDispatch } from 'react-redux';

const FullBasket = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useAuth()
    let basket = localStorage.getItem('token') ?
        user.basket :
        localStorage.getItem('basket') ?
            JSON.parse(localStorage.getItem('basket')) : undefined
    if (!basket) {
        basket = { products: [], payment: 0 }
        localStorage.setItem('basket', JSON.stringify(basket))
    }
    const [products, setProducts] = useState([]);
    const [singleProduct,setSingleProduct]=useState(null)
    const [layout, setLayout] = useState('grid');
    const [value, setValue] = useState(null)
    const { data: allproducts, isLoading, isSuccess, isError, error } = useGetProductsQuery()

    const [deleteProduct, { data: dt, isSuccess: is }] = useDeleteProductMutation()
    const [updateProductQuantity, { data, isSuccess: issuccess }] = useUpdateProductQuantityMutation()
    useEffect(() => {

        if (isSuccess) {
            const full_baskets = basket.products?.map((p) => { return ({ product: allproducts?.find(pr => pr._id === p.product_id), quantity: p.quantity }) })
            setProducts(full_baskets)
        }

        if (is) {
            dispatch(setToken(dt))
            let _products = products.filter((val) => val.product._id !== singleProduct.product._id);
            setProducts(_products)
        }
        if (issuccess) {
            dispatch(setToken(data))
            navigate('/basket')
        }


    }, [isSuccess, is, issuccess]);

    const getSeverity = (product) => {
        if (product.quantity >= 100)
            return "succes"
        if (product.quantity < 100 && product.quantity > 0)
            return "warning"
        if (product.quantity === 0)
            return "danger"
        return null;

    };
    const getStatus = (product) => {
        if (product.quantity >= 100)
            return "INSTOCK"
        if (product.quantity < 100 && product.quantity > 0)
            return "LOWSTOCK"
        if (product.quantity === 0)
            return "OUTOFSTOCK"
        return null;

    };
    // const chekItem = (product) => {
    //     const productString = JSON.stringify(product)
    //     localStorage.setItem("Product", productString)
    //     //navigate(`/product/:${product.name}`)
    // }
    const checkUser = () => {
        if (localStorage.getItem("token"))
            navigate('/checkout')
        else
            navigate('/Login')
    }
    const deleteProductFromBasket = (product) => {
        if (localStorage.getItem("token")) {
            setSingleProduct(product)
            deleteProduct({ _id: user._id, product_id: product.product._id })
        }
        else {
            
            const basket = JSON.parse(localStorage.getItem("basket"))
            console.log(basket.payment - (product.quantity * product.product.price));
            localStorage.setItem("basket", JSON.stringify({
                products: basket.products.filter(p => p.product_id != product.product._id),
                payment: basket.payment - (product.quantity * product.product.price)

            }))
            let _products = products.filter((val) => val.product._id !== product.product._id);
            setProducts(_products)
        }
    }
    const updateBasketProductQuantity=(e,product)=>{
        
        if (e.value === 0) {
            setValue(e.value);
            setSingleProduct(product)
            deleteProductFromBasket(product)
        }
        else {
            if (localStorage.getItem("token")) {
                updateProductQuantity({ _id: user._id, product_id: product.product._id, quantity: e.value })
                setValue(e.value);
            }
            else {
                setValue(e.value);
                let basket = JSON.parse(localStorage.getItem("basket"))
                const products = basket.products.map(p => {
                    if (p.product_id === product.product._id) {   
                        basket.payment= basket.payment + ((e.value-p.quantity) * product.product.price)
                        p.quantity = e.value
                    }
                    return p 
                })
                    localStorage.setItem("basket", JSON.stringify({
                        products: products,
                        payment:basket.payment 
                    }))
                 }
        }
    }
    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product.product_id}>
                {/* {console.log("aaaaaaaaaa")} */}
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={"http://localhost:1234/uploads/" + product.product.imageURL[0].split("\\")[2]} alt={product.product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.product.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-tag"></i> */}
                                    <div className="text-2xl font-bold text-900">{product.quantity}</div>
                                    {/* <span className="font-semibold">{product.quantity}</span> */}
                                </span>
                                <Tag value={getStatus(product)} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{product.product.price}</span>
                            <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => { deleteProductFromBasket(product) }}
                            ></Button>
                            <InputNumber inputId="minmax-buttons" value={product.quantity}
                                onChange={(e) => {
                                    updateBasketProductQuantity(e,product)
                                }}
                            mode="decimal" showButtons min={0} max={100} />
                            {/* disabled={product.inventoryStatus === 'OUTOFSTOCK'} */}
                        </div>
                        <div className="flex-auto">

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // const gridItem = (product) => {
    //     return (
    //         <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.product_id}>
    //             <div className="p-4 border-1 surface-border surface-card border-round">
    //                 <div className="flex flex-wrap align-items-center justify-content-between gap-2">
    //                     <div className="flex align-items-center gap-2">
    //                         {/* <i className="pi pi-tag"></i> */}
    //                         <div className="text-2xl font-bold text-900">{product.quantity}</div>
    //                         {/* <span className="font-semibold">{product.quantity}</span> */}
    //                     </div>
    //                     <Tag value={getStatus(product)} severity={getSeverity(product)}></Tag>
    //                 </div>
    //                 <div className="flex flex-column align-items-center gap-3 py-5">
    //                     <img className="w-9 shadow-2 border-round" src={`a.png`} alt={product.product.name} />
    //                     <div className="text-2xl font-bold">{product.product.name}</div>
    //                 </div>
    //                 <div className="flex align-items-center justify-content-between">
    //                     <span className="text-2xl font-semibold">₪{product.product.price}</span>
    //                     {console.log(user._id, product.product._id)}              
    //                              <Button icon="pi pi-trash" className="p-button-rounded" onClick={() =>  deleteProduct({ _id: user._id, product_id: product.product._id }) }></Button>
    //                     {/* disabled={product.inventoryStatus === 'OUTOFSTOCK'} */}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }
        // console.log(layout)
        if (layout === 'list') return listItem(product, index);
        //else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <>

            <h1>Basket: </h1>
            {basket.products.length===0?<h1>😑the basket is empty 😑</h1>:
            
            <div className="card">

                <div className="flex flex-column md:flex-row">
                    <p className="flex flex-column md:flex-row">

                        <DataView value={products} listTemplate={listTemplate} header={null} />
                    </p>
                    <Divider layout="vertical" className="hidden md:flex"> </Divider>
                    <p>
                        {`₪${basket.payment} לתשלום`}<br />
                        <Button  onClick={() => checkUser()}>להזמנה</Button>
                    </p>
                </div>
            </div>}
        </>
    )
}

export default FullBasket