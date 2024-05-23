import { InputText } from "primereact/inputtext"
import { useSearchParams } from "react-router-dom"



const Search = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const search=searchParams.get("search")
    return (
        <>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" 
                defaultValue={search||""}
                onChange={(e) => {
                     
                    setSearchParams({ search: e.target.value })
                }} placeholder="Search..." />
            </span>
        </>
    )
}

export default Search