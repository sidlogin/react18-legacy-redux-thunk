const apiRequest = async (url = '', method, body = null, errMsg = null) => {
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
        method: method,
        body: body,
    }
    try {
        const response = await fetch(url, params);
        if (!response.ok) throw Error('Please reload the app');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg;
    }
}

export default apiRequest;