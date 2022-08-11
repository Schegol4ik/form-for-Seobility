import {useEffect, useState} from "react";
import {FormType} from "../components/Form";

const STATUS = [
    'success', 'error'
]

type Fetch = (
    input: RequestInfo,
    init?: RequestInit
) => Promise<Response>;

export const useFetching = (data: FormType) => {



    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState(null);

    const fetchCustom = function () {
        const json = JSON.stringify({
            status: 'success',
            message: 'ok',
        });
        const response = new Response(new Blob([json], { type: 'application/json' }), {
            status: 200,
            statusText: 'Every thing is cool',
        });
        return new Promise(function (resolve) {
            setTimeout( () => {
                resolve(() => {
                    // @ts-ignore
                    return setStatus(response);
                });
            }, 2000);
        });
    };
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // @ts-ignore
            window.fetch = fetchCustom;
        }
    }, []);


    return { loading, status};
};

