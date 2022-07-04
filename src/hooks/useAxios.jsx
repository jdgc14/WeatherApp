import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useAxios = (url) => {
    console.log(url)

    const [data, setData] = useState({})
    
    useEffect(() => {
        getData(url)
    }, [])

    const getData = (url) => {
        axios.get(url)
            .then(res => setData(res.data))
    }
    console.log(data)

    return { data, getData };
};

export default useAxios;