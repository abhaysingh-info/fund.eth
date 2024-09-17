export async function sendRequest(BASE_URL:string, url: string, method: string, data?: object, isJson = true) {
    try {
        const response = await fetch(BASE_URL + url, {
            method: method,
            body: (isJson||data) ? JSON.stringify(data) : "",
            credentials: 'include', // Include cookies for authentication if needed
            headers: isJson ? { 'Content-Type': 'application/json' } : {}, // Set headers for JSON data
        });

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch(error) {
        throw error;
        // Re-throw for further handling if needed
    }
}