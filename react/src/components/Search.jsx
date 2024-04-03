import { InputText } from "primereact/inputtext"
import { useSearchParams } from "react-router-dom"



const Search = () => {
    const [searchParams,setSearchParams]=useSearchParams()
    const search=searchParams.get("search")
    const [] = useSearchParams()
    return (
        <>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" 
                defaultValue={search||""}
                onChange={(e) => {
                    
                    setSearchParams({ search: e.target.value })
                    // const filterData = products.filter(p => p.name.indexOf(search) > -1)
                    // setProducts(filterData)
                }} placeholder="Search..." />
            </span>
        </>
    )
}

export default Search