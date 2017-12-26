import { EggApplication } from 'egg';
import { TTransport, TProtocol } from 'thrift';

export interface ClientConfig {
  client: string;
  alias?: string;
  multiplexed?: boolean;
  serviceName?: string;
  transport: TTransport;
  protocol: TProtocol;
  connectType: 'http' | 'https' | 'tcp' | 'tls';
  host: string;
  path?: string;
  port?: string;
  headers?: {
    [name: string]: number | string | string[] | undefined;
  };
}

export interface ServiceConfig {
  service: string;
  processor: string;
  multiplexed?: boolean;
  serviceName?: string;
  transport: TTransport;
  protocol: TProtocol;
  connectType: 'http' | 'https' | 'tcp' | 'tls';
  host: string;
  path?: string;
  port?: string;
  headers?: {
    [name: string]: number | string | string[] | undefined;
  };
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
