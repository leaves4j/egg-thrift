import { EggApplication } from 'egg';
import { TTransport, TProtocol,ConnectOptions } from 'thrift';

export interface ClientConfig {
  client: string;
  alias?: string;
  multiplexed?: boolean;
  serviceName?: string;
  connectType: 'http' | 'tcp';
  options: ConnectOptions;
  host: string;
  port?: string;
}

export interface ServiceConfig {
  service: string;
  processor: string;
  multiplexed?: boolean;
  serviceName?: string;
  connectType: 'http' | 'tcp';
  port?: string;
  options: {
    transport: TTransport;
    protocol: TProtocol;
    path?: string;
    headers?: {
      [name: string]: number | string | string[] | undefined;
    };
    tls: any;
  }
}

export interface ThriftConfig {
  package?: any;
  dir?: string;
  compilerOptions: any;
  thriftOptions: {
    timeout: number;
  };
  defaultClientConfig: ClientConfig;
  defaultServiceConfig: ServiceConfig;
  clients: Array<ClientConfig>;
  services: Array<ServiceConfig>;
}

declare module 'egg' {
  export interface IThriftClient {}
  export interface IThriftType {}
  export interface Application extends EggApplication {
    thrift: IThriftClient;
    thriftType: IThriftType;
  }
  export interface EggAppConfig {
    thrift: ThriftConfig;
  }
}
