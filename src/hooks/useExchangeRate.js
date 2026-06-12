import {useState, useEffect} from 'react';
import axios from 'axios';

export function useExchangeRate(from = 'NPR') {
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchExchangeRate() {
            try{
                const response = await axios.get(`https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`);
                setRate(response.data.rates);
            }catch (err) {
                setError('Could not fetch exchange rates');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchExchangeRate();
    }, [from]);

    function convert(amountInNPR) {
        if (!rate) return null;
        return {
            usd: (amountInNPR * rate.USD).toFixed(2),
            eur: (amountInNPR * rate.EUR).toFixed(2)
        };
    }

    return { rate, loading, error, convert };
}