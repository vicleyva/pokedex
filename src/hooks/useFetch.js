import { useState, useCallback, useRef, useEffect } from 'react';

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true);
            setError(null);

            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                });

                if (!response.ok) {
                    throw new Error('Request failed with status: ' + response.status);
                }

                // Check if the response is JSON before calling .json()
                const contentType = response.headers.get('content-type');
                const responseData = contentType && contentType.includes('application/json')
                    ? await response.json()
                    : await response.text();

                setIsLoading(false);
                return responseData;
            } catch (err) {
                // Handle network errors separately
                if (err.name === 'AbortError') {
                    // console.log('Request was aborted');
                } else {
                    setError(err.message || 'Something went wrong!');
                    setIsLoading(false);
                }
                throw err; // Re-throw the error for the component using the hook to handle
            }
        },
        []
    );

    const reset = () => {
        setError(null);
        setIsLoading(false);
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, reset };
};
