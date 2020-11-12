import Configuration from '../config';
import Experiment from '../models/Experiment';
import Sample from '../models/Sample';
import SampleFilter from '../models/SampleFilter';

class MechACovClient {

    static async createExperiment(abortSignal: AbortSignal): Promise<Experiment> {        
        const url = `experiments`;
        return MechACovClient.post<Experiment>(url, undefined, {}, abortSignal);
    }

    static async getExperiment(experimentId: string, abortSignal: AbortSignal): Promise<Experiment> {
        const url = `experiments/${experimentId}`;
        return MechACovClient.get<Experiment>(url, undefined, abortSignal);
    }

    static async getStudies(abortSignal: AbortSignal): Promise<string[]> {        
        const url = `studies`;
        return MechACovClient.get<string[]>(url, undefined, abortSignal);
    }

    static async getGroups(abortSignal: AbortSignal): Promise<string[]> {
        const url = `groups`;
        return MechACovClient.get<string[]>(url, undefined, abortSignal);
    }

    static async getTissueCellLines(abortSignal: AbortSignal): Promise<string[]> {        
        const url = `tissueCellLines`;
        return MechACovClient.get<string[]>(url, undefined, abortSignal);
    }

    static async getSamplePage(sampleFilter: SampleFilter, pageSize: number, page: number, abortSignal: AbortSignal): Promise<Sample[]> {
        const queryParams = [];
        for (const studyId of (sampleFilter.studyIds || [])) {
            queryParams.push(`studyId=${studyId}`);
        }
        for (const cellLine of (sampleFilter.tissueCellLines || [])) {
            queryParams.push(`tissueCellLine=${cellLine}`);
        }
        const queryParamStr = 0 === queryParams.length ? "" : `?${queryParams.join("&")}`;
        const url = `samplePages/${pageSize}/${page}${queryParamStr}`;
        return MechACovClient.get(url, {}, abortSignal);
    }

    static async countSamples(sampleFilter: SampleFilter, abortSignal: AbortSignal): Promise<number> {        
        const queryParams = [];
        for (const studyId of (sampleFilter.studyIds || [])) {
            queryParams.push(`studyId=${studyId}`);
        }
        for (const cellLine of (sampleFilter.tissueCellLines || [])) {
            queryParams.push(`tissueCellLine=${cellLine}`);
        }
        const queryParamStr = 0 === queryParams.length ? "" : `?${queryParams.join("&")}`;
        const url = `samples/count${queryParamStr}`;
        return MechACovClient.get<number>(url, {}, abortSignal);

    }
    
    private static async exchange<T>(serviceUrl: string, httpMethod: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
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

    private static async get<T>(serviceUrl: string, queryParams: any, abortSignal: AbortSignal): Promise<T> {
        return MechACovClient.exchange(serviceUrl, "GET", queryParams, undefined, abortSignal);
    }

    private static async put<T>(serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return MechACovClient.exchange(serviceUrl, "PUT", queryParams, requestBody, abortSignal);
    }

    private static async post<T>(serviceUrl: string, queryParams: any, requestBody: any, abortSignal: AbortSignal): Promise<T> {
        return MechACovClient.exchange(serviceUrl, "POST", queryParams, requestBody, abortSignal);
    }

    private static async delete<T>(serviceUrl: string, queryParams: any, abortSignal: AbortSignal): Promise<T> {
        return MechACovClient.exchange(serviceUrl, "DELETE", queryParams, undefined, abortSignal);
    }
}





export default MechACovClient;