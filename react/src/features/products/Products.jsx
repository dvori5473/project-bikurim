import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from "./productApiSlice"
import { Link } from 'react-router-dom';


const Products = () => {

    const navigate = useNavigate()
    const [layout, setLayout] = useState('grid');
    const { data: products, isLoading, isSuccess, isError, error } = useGetProductsQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>

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
    const chekItem = (product) => {
        const productString = JSON.stringify(product)
        localStorage.setItem("Product", productString)
        navigate(`/product/:${product._id}`)
    }
    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product._id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <Link to={`/product/${product._id}`}><img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={"http://localhost:1234/uploads/"+product.imageURL[0].split("\\")[2]} alt={product.name} style={{ width: '80px',height:'120px' }} /></Link>
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-tag"></i> */}
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value={getStatus(product)} severity={getSeverity(product)}></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">₪{product.price}</span>
                            {/* <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => chekItem(product)}></Button> */}
                            {/* disabled={product.inventoryStatus === 'OUTOFSTOCK'} */}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            {/* <i className="pi pi-tag"></i> */}
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={getStatus(product)} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <Link to={`/product/${product._id}`}><img className="w-9 shadow-2 border-round" src={"http://localhost:1234/uploads/"+product.imageURL[0].split("\\")[2]} alt={product.name}  style={{ width: '80px',height:'120px' }}  /></Link>
                        <div className="text-2xl font-bold">{product.name}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">₪{product.price}</span>
                        {/* <Button icon="pi pi-shopping-cart" className="p-button-rounded" onClick={() => chekItem(product)}></Button> */}
                        {/* disabled={product.inventoryStatus === 'OUTOFSTOCK'} */}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
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
        <div className="card">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} style={{ padding: '5%' }} />
        </div>
    )
}

export default Products