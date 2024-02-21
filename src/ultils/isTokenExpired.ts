function isTokenExpired(token: string): boolean {
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = atob(payloadBase64);
        const decoded = JSON.parse(decodedJson);
        const exp = decoded.exp;
        const now = Date.now() / 1000; // Convert to seconds

        return exp < now;
    } catch (error) {
        console.error("Failed to decode or parse the token", error);
        return true; // Assume expired on failure
    }
}

export default isTokenExpired