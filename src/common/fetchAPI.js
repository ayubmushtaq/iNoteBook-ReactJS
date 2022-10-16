const fetchAPI = async (url, method, authtoken, body) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            "auth-token": authtoken
        },
        body: JSON.stringify(body)
    })
    return response;
}

export default fetchAPI;