
const SearchCity = ({ getNewCity }) => {

    return (
        <form onSubmit={ev => {
            ev.preventDefault()
            getNewCity(ev.target.city.value)
        }}>
            <input type="text" name="city" className="border rounded-1 mx-2" />
            <button type="submit" className='btn btn-success'>Search city</button>
        </form>
    );
};

export default SearchCity;