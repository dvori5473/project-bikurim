import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function IsLoading() {
    return (
        <><br></br>
        <div className="flex justify-content-center" style={{marginTop:'40vh'}}>
            <ProgressSpinner />
        </div>
        </> 
    );
}