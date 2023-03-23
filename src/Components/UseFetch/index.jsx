import React, { useEffect, useState } from 'react'

const useFetch = (url) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setLoading(true)
        await fetch(url)
            .then(res => res.json())
            .then(json => setData(json))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        fetchData()
    }, [url])

    return { data, error, loading }
}

export default useFetch