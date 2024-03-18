
import axios from 'axios';
import { RPCConfig } from '../config/rpcConfig';

export class RPCCommon {
    // Method to make RPC calls
    static async callRPCMethod(method: string, data: any): Promise<any> {
        try {
            const response = await axios.post(`${RPCConfig.url}/${method}`, data);
            return response.data;
        } catch (error) {
            console.error('Error making RPC call:', error);
            throw error;
        }
    }
}