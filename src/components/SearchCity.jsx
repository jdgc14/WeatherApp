
const SearchCity = ({getNewCity}) => {

    return (
        <div>
            <form onSubmit={ev => {
                ev.preventDefault()
                getNewCity(ev.target.city.value)
            }} className='d-flex flex-column m-auto gap-2 col-4'>
                <input type="text" name="city" className="border rounded-1"/>
                <button type="submit"className='btn btn-success'>Search city</button>
            </form>
        </div>
        
    );
};

export default SearchCity;