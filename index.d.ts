import { EggApplication } from 'egg';

declare module 'egg' {
  export interface IThriftClient { }
  export interface IThriftType { }
  export interface Application extends EggApplication {
    thrift: IThriftClient,
    thriftType: IThriftType,
  }
}
