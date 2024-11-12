import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect } from 'react';
import { useGetProductsQuery } from '../products/productApiSlice';
import useAuth from '../../hooks/useAuth';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Badge } from 'primereact/badge';

const Basket = ({ visibleRight, setVisibleRight }) => {
    const user = useAuth()
    let basket = localStorage.getItem('token') ?
        user.basket :
        localStorage.getItem('basket') ?
            JSON.parse(localStorage.getItem('basket')) : undefined
    if (!basket) {
        basket = { products: [], payment: 0 }
        localStorage.setItem('basket', JSON.stringify(basket))
    }

    const { data: allproducts, isLoading, isSuccess } = useGetProductsQuery()
    const navigate = useNavigate()
    const full_basket = basket.products?.map((p) => { return ({ product: allproducts?.find(pr => pr._id === p.product_id), quantity: p.quantity, key: p.product_id }) })
    useEffect(() => {
        if (isSuccess) {

        }
    }, [isSuccess]);

    if (isLoading) return <></>;

    const imageBodyTemplate = (p) => {
        return <div className='flex p-overlay-badge'>
            <img src={"http://localhost:1234/uploads/" + p.product.imageURL[0].split("\\")[2]} alt={p.product.name} className="w-6rem shadow-2 border-round" />;
            <Badge value={p.quantity} style={{ backgroundColor: 'white' }} ></Badge>
        </div>
    };

    const priceBodyTemplate = (p) => {
        return p.product.price;
    };

    const nameBodyTemplate = (p) => {
        return p.product.name;
    };
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-4">
            <span className="text-xl text-900 font-bold">Basket</span>
        </div>
    );
    return (
        <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
            {full_basket.length === 0 ? <><img className=" xl:w-15rem  xl:block mx-auto" src={'emptyCart.png'} alt={'emptyCart'} style={{ marginTop: '100px' }} />
                <h2 style={{ textAlign: 'center' }}>Oups! Your cart is empty,</h2>
                <Button onClick={() => { setVisibleRight(false); navigate('/product') }} style={{ marginLeft: '75px', color: 'white', backgroundColor: 'transparent', border: 'none' }}>continue shopping</Button>
            </>
                :
                <div>
                    <DataTable value={full_basket} header={header} footer={null} scrollable scrollHeight="70vh" tableStyle={{ minWidth: '80px', minHeight: '70vh' }}>
                        <Column field="name" header="Name" body={nameBodyTemplate}></Column>
                        <Column header="Image" body={imageBodyTemplate}></Column>
                        <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                    </DataTable><br></br>
                    <div className="mt-auto">
                        <hr className="flex flex-wrap align-items-center justify-content-between gap-2" />
                        <h3 style={{ textAlign: 'center' }}>Total payment {basket.payment} ₪</h3>
                        <Button onClick={() => { setVisibleRight(false); navigate('/basket') }} style={{ marginLeft: '85px', color: 'white', backgroundColor: 'transparent', border: 'none', position: 'fixed', Button: '0', zIndex: '100', fontSize: '200' }}><b>to full basket</b></Button>
                    </div>

                </div>}
        </Sidebar>
    )
}
export default Basket