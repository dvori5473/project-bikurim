
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
// import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useGetAllUsersQuery, useUpdateUserMutation } from './userApiSlice';
import { CascadeSelect } from 'primereact/cascadeselect';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Search from '../../components/Search';
import { useGetAllOrdersQuery } from '../order/orderApiSlice';
import { isDisabled } from '@testing-library/user-event/dist/utils';

export default function AdminUsers() {
    let emptyUser = {
        _id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        active: '',
        roles: '',
        user_id:''
    };

    const [users, setUsers] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedActive, setSelectedActive] = useState(null);

    const navigate=useNavigate()
    const toast = useRef(null);
    const dt = useRef(null);
    const roles=[
        {
            name:"admin",
            code:"admin"
        },
        {
            name:"user",
            code:"user"
        }
    ];
    const active=[
        {
            name:"true",
            code:"true"
        },
        {
            name:"false",
            code:"false"
        }
    ];
    const [searchParams]=useSearchParams()

    const search=searchParams.get("search")
    const { data,isSuccess} = useGetAllUsersQuery()
    const { data:allOrders,isSuccess:isSuccessGetAllOrders,isLoading} = useGetAllOrdersQuery()
    const [updateUser,{ isSuccess:updateInSuccess,data:updateUserData }] = useUpdateUserMutation()
    
    useEffect(() => {
        if(isSuccess){
         const filterData=!search? data:data.filter(p=>(p.firstName.indexOf(search)>-1)||(p.lastName.indexOf(search)>-1)||(p.email.indexOf(search)>-1))
         setUsers(filterData)
        }
     }, [isSuccess]);

     useEffect(() => {
          const filterData=!search? data:data.filter(p=>(p.firstName.indexOf(search)>-1)||(p.lastName.indexOf(search)>-1)||(p.email.indexOf(search)>-1))
          setUsers(filterData)
      }, [search]);



  useEffect(() => {
    if(updateInSuccess){
        let _user =users.map(u=>{
            if(u._id===updateUserData.updateUser._id)
            {
                return updateUserData.updateUser
            }
            return u
        })
        setUsers(_user);
        setUser(emptyUser);
    }
 }, [updateInSuccess]);

if(isLoading)
return<h1>isLoading</h1>


 const hideDialog = () => {
    setSelectedRole(null)
    setSelectedActive(null)
     setSubmitted(false);
     setUserDialog(false);
 };

//  const hideDeleteProductDialog = () => {
//      setDeleteProductDialog(false);
//  };

 const saveUser = () => {
     setSubmitted(true);
    //  console.log({_id:user._id,firstName:user.firstName,lastName:user.lastName,phone:user.phone,roles:selectedRole?selectedRole.name:user.roles,active:selectedActive?selectedActive.name:user.active,user_id:user.user_id});
     updateUser({_id:user._id,firstName:user.firstName,lastName:user.lastName,phone:user.phone,roles:selectedRole?selectedRole.name:user.roles,active:selectedActive?selectedActive.name:user.active,user_id:user.user_id})
     setUserDialog(false)
     
    }
 

 const editUser = (user) => {
     
     setUser({ ...user });
     setUserDialog(true);
 };


 const exportCSV = () => {
     dt.current.exportCSV();
 };


//      const val = e.value || 0;
//      let _user = { ...user };

//      _user[`${firstName}`] = val;

//      //setUser(_user);
//  };

 const leftToolbarTemplate = () => {
     return (
         <div className="flex flex-wrap gap-2">
             {/* <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} /> */}
             {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
         </div>
     );
 };

 const rightToolbarTemplate = () => {
    return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
};


 const actionBodyTemplate = (rowData) => {
    
     return (
         <React.Fragment>
             <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} />
             
         </React.Fragment>
     );
 };


const order=(rowData)=>{
    return (
        <React.Fragment>
             <Button icon="pi pi-box" rounded outlined severity="danger" onClick={() => {navigate(`/orders/${rowData._id}`)}} disabled={(allOrders.filter(o=>o.customerID===rowData._id)).length===0} />      
        </React.Fragment>
    );
    
}
 const header = (
     <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
         <h4 className="m-0">Manage Users</h4>
         <span className="p-input-icon-left">
             <i className="pi pi-search" />
             <Search/>
         </span>
     </div>
 );
 const userDialogFooter = (
     <React.Fragment>
         <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
         <Button label="Save" icon="pi pi-check" onClick={saveUser} />
     </React.Fragment>
 );


 return (
     <div>
         <Toast ref={toast} />
         <div className="card">
             <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

             <DataTable ref={dt} value={users} selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                     dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                 <Column field="firstName" header="FirstName" sortable style={{ minWidth: '10rem' }}></Column>
                 <Column field="lastName" header="LastName" sortable style={{ maxWidth: '12rem' }}></Column>
                 <Column field="email" header="Email" sortable style={{ maxWidth: '12rem' }}></Column>
                 <Column field="phone" header="Phone" sortable style={{ maxWidth: '12rem' }}></Column>
                 <Column field="roles" header="Roles" sortable style={{ maxWidth: '12rem' }}></Column>
                 <Column field="active" header="Active" sortable style={{ maxWidth: '12rem' }}></Column>
                 <Column field="user_id" header="User_id" sortable style={{ maxWidth: '12rem' }}></Column>
                 <Column header="Orders" body={order}>
                 </Column>
                 {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                 {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                 <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
             </DataTable>
         </div>

         <Dialog visible={userDialog} style={{ width: '18rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
        
             {user.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${user.image}`} alt={user.image} className="product-image block m-auto pb-3" />}

             <div className="field justify-content-center">
             <label htmlFor="roles" className="font-bold">
                        Roles
                    </label>
            <CascadeSelect value={selectedRole?selectedRole:user.roles} onChange={(e) => setSelectedRole(e.value)} options={roles} 
                optionLabel="name"  optionGroupChildren={[]}
                className="w-full md:w-14rem" breakpoint="767px" placeholder="Select a Role"  style={{ minWidth: '14rem' }}  />
            </div>

            <div className="field justify-content-center">
                
             <label htmlFor="active" className="font-bold">
                   Active
                    </label>
            <CascadeSelect value={selectedActive?selectedActive:user.active} onChange={(e) => setSelectedActive(e.value)} options={active} 
                optionLabel="name" optionGroupLabel='name' optionGroupChildren={[]}
                className="w-full md:w-14rem" breakpoint="767px" placeholder="Select a Active"  style={{ minWidth: '14rem' }}  />
            </div>



         </Dialog>
     </div>
 );
}