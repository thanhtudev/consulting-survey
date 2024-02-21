type TokenResponse = {
    token: string;
};

const url = process.env.NEXT_PUBLIC_API_URL! + '/auth'

async function fetchToken(forceRefresh = false): Promise<string> {
    let token = localStorage.getItem('token');
    if (!token || forceRefresh) {
        const response = await fetch(url + '/anonymous', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': process.env.X_API_KEY!,
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }
        token = response.headers.get('access-token') || '';
        if (!token) {
            throw new Error('Token is missing in the response headers');
        }
        token = token.replace('Bearer ', '');
        localStorage.setItem('token', token);
    }

    return token;
}

export default fetchToken;
