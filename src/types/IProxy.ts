import { Document, Types } from 'mongoose';
import { Proxy as GraphQLProxy } from '../generated/graphql';
import { ProxyType } from '../constants/proxyType';

interface IProxy extends Document, Omit<GraphQLProxy, 'id' | 'creatorId' | 'proxyType'> {
    _id: Types.ObjectId;
    creatorId: Types.ObjectId;
    proxyType: ProxyType;
}

export default IProxy;
