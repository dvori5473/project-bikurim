import React, { useRef } from 'react'; 
import { useMountEffect } from 'primereact/hooks';
import { Messages } from 'primereact/messages';

export default function Error({error}) {
    const msgs = useRef(null);

    useMountEffect(() => {
        if (msgs.current) {
            msgs.current.clear(); 
            msgs.current.show({ id:'1',life:1000, severity: 'error', summary: 'Error', detail: error, closable: false });
        }
    });

    return (
        <Messages ref={msgs} />
    )
}
