
//import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
// import { Rating } from 'primereact/rating';
// import { Tag } from 'primereact/tag';
import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from '../products/productApiSlice';
import useAuth from '../../hooks/useAuth';
import { Button } from 'primereact/button';
//import FullBasket from './FullBasket';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';

const Basket = ({visibleRight,setVisibleRight}) => {
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
    const { data: allproducts, isLoading, isSuccess, isError, error } = useGetProductsQuery()
   const navigate=useNavigate()
    useEffect(() => {
      
            if (isSuccess) {
                const full_baskets = basket.products?.map((p) => { return ({ product: allproducts?.find(pr => pr._id === p.product_id), quantity: p.quantity }) })
                setProducts(full_baskets)
            }

    }, [isSuccess]);


    const imageBodyTemplate = (p) => {
        return <img src={"http://localhost:1234/uploads/" + p.product.imageURL[0].split("\\")[2]} alt={p.image} className="w-6rem shadow-2 border-round" />;
    };

    const priceBodyTemplate = (p) => {
        return p.product.price;
    };

    const nameBodyTemplate = (p) => {
        return p.product.name;
    };
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <span className="text-xl text-900 font-bold">Products</span>
        </div>
    );
    //const footer = `In total there are ${products ? products.length : 0} products.`;
    return (
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>

        <div className="card">
            <DataTable value={products} header={header} footer={null} tableStyle={{ minWidth: '90px' }}>
                <Column field="name" header="Name" body={nameBodyTemplate}></Column>
                <Column header="Image" body={imageBodyTemplate}></Column>
                <Column field="price" header="Price" body={priceBodyTemplate}></Column>
            </DataTable><br></br>
            <Button onClick={()=>{setVisibleRight(false);navigate('/basket')}}>לסל המלא</Button>
        </div> 
        </Sidebar>
    )
}
export default Basket