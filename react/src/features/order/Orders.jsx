
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useParams } from "react-router-dom"
import { useGetOrderbyIdQuery, useUpdateOrderMutation } from "./orderApiSlice"
import { Steps } from 'primereact/steps';
import { Dialog } from 'primereact/dialog';
import useAuth from '../../hooks/useAuth';
import IsLoading from '../../components/IsLoading';


const Orders = () => {
    const { isAdmin } = useAuth()
    const [updateOrderDialog, setUpdateOrderDialog] = useState(false);
    const { id } = useParams()

    let emptyOrder = {
        _id: null,
        status: ''
    };
    const { data: ordersData, isLoading, isSuccess } = useGetOrderbyIdQuery(id)
    const [updateOrders, { isSuccess: is, data: updateOrderData }] = useUpdateOrderMutation()

    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);

    useEffect(() => {

        if (isSuccess) {
            setOrders(ordersData)
        }
    }, [isSuccess]);

    useEffect(() => {

        if (is) {
            let _orders = orders.map(o => {
                if (o._id === updateOrderData._id) {
                    return updateOrderData
                }
                return o
            })

            setOrders(_orders)
            setOrder(emptyOrder)
        }
    }, [is]);

    if(isLoading)return<IsLoading/>

    const items = [
        {
            label: 'Ordered'
        },
        {
            label: 'In Process'
        },
        {
            label: 'Shipped'
        },
        {
            label: 'Delivered'
        }
    ];

    const expandAll = () => {
        let _expandedRows = {};

        orders.forEach((p) => (_expandedRows[`${p._id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };


    const allowExpansion = (rowData) => {

        return rowData.products.length > 0;
    };
    const editOrder = (order) => {

        setOrder({ _id: order._id, status: order.status });
        setUpdateOrderDialog(true)
    };
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.status !== 'Delivered' && <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => { editOrder(rowData) }} />}
            </React.Fragment>
        );
    };
    const imageBodyTemplate = (rowData) => {
        if (rowData.imageURL)
            return <img src={"http://localhost:1234/uploads/" + rowData.imageURL.split("\\")[2]} alt={rowData.imageURL} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };
    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Orders for {data.products._id}</h5>
                <DataTable value={data.products}>
                    <Column field="product_id" header="product_id" sortable></Column>
                    <Column field="quantity" header="quantity" sortable></Column>
                    <Column field="imageURL" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="description" header="description" sortable></Column>
                    <Column field="_id" header="_id" sortable></Column>
                </DataTable>
                <div className="card">
                    <Steps model={items} activeIndex={data.status === "Ordered" ? 0 :
                        data.status === "In Process" ? 1 :
                            data.status === "Shipped" ? 2 : 3} />
                </div>
                <div style={{ marginLeft: '35%', border: "5px solid #C08F48", padding: "", width: "30%", textAlign: 'center' }}>
                    <h4>{data.address.firstName} {data.address.lastName}</h4>
                    <h4>{data.address.street} {data.address.houseNumber} ,{data.address.apartment}</h4>
                    <h4>{data.address.city}</h4>
                    <h4>Israel</h4>
                    <h4>{data.address.phone}</h4>

                </div>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
        </div>
    );
    const hideUpdateOrderDialog = () => {
        setUpdateOrderDialog(false);
    };

    const saveOrder = () => {
        let status = order.status === "Ordered" ? "In Process" : order.status === "In Process" ? "Shipped" : "Delivered"

        updateOrders({ _id: order._id, status: status })
        setUpdateOrderDialog(false);
    }
    const updateOrderDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideUpdateOrderDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={saveOrder} />
        </React.Fragment>
    );
    return (
        <>
            <br></br>
            <div className="card" style={{ marginTop: "100px" }}>
                <Toast ref={toast} />
                <DataTable value={orders} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="_id" header={header} tableStyle={{ minWidth: '40rem' }}>
                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="_id" header="id" sortable style={{ minWidth: '5rem' }} />
                    <Column field="payment" header="payment" style={{ minWidth: '5rem' }} />
                    <Column field="status" header="status" style={{ minWidth: '5rem' }} />
                    <Column field="createdAt" header="order date" sortable style={{ minWidth: '5rem' }} />
                    <Column field="updatedAt" header="updatedAt" sortable style={{ minWidth: '5rem' }} />
                    {isAdmin ? <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column> : <></>}
                </DataTable>
            </div>
            <Dialog visible={updateOrderDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={updateOrderDialogFooter} onHide={hideUpdateOrderDialog} >
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {orders && (
                        <span>
                            Are you sure this order <b>{order.status}</b> successfully?
                        </span>
                    )}
                </div>
            </Dialog>
            <div />
        </>
    )
}
export default Orders