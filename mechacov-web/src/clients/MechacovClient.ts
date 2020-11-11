import Configuration from '../config';

class MechACovClient {

    static async exchange<T>(serviceUrl: string, httpMethod: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        // TODO: replace with configuration
        const baseUrl = Configuration.mechacovServerBaseUrl;
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const params = {
            method: httpMethod,
            headers: headers,
            signal: abortSignal,
            body: undefined === requestBody ? undefined : JSON.stringify(requestBody)
        };
        const queryStr = undefined === queryParams ? "" : Object.entries(queryParams)
            .filter(([paramName, paramValue]) => undefined !== paramValue)
            .map(([paramName, paramValue]) => {
                const value: string = paramValue instanceof Date ? paramValue.toISOString() : paramValue as string;
                return `${encodeURIComponent(paramName)}=${encodeURIComponent(value)}`;
            }).join("&");
        const queryUrl = `${baseUrl}/${serviceUrl}${!!queryStr ? "?" : ""}${queryStr}`;
        const response = await fetch(queryUrl, params);
        if (!!response.ok) {
            const actualResponse = await response.json();
            return actualResponse;
        } else {
            const error = new Error(response.statusText);
            error.name = `${response.status}`;
            throw error;
        }
    }

    static async get<T>(serviceUrl: string, queryParams: any, abortSignal: AbortSignal): Promise<T> {
        return MechACovClient.exchange(serviceUrl, "GET", queryParams, undefined, abortSignal);
    }

    static async put<T>(serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return MechACovClient.exchange(serviceUrl, "PUT", queryParams, requestBody, abortSignal);
    }

    static async post<T>(serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return MechACovClient.exchange(serviceUrl, "POST", queryParams, requestBody, abortSignal);
    }

    static async delete<T>(serviceUrl: string, queryParams: any, abortSignal: AbortSignal): Promise<T> {
        return MechACovClient.exchange(serviceUrl, "DELETE", queryParams, undefined, abortSignal);
    }
}


export default MechACovClient;