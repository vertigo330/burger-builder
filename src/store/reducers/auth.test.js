import reducer from './auth';
import * as actionType from '../actions/actionsTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false
        });
    });

    it('should populate user identity', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false
        }, {
            type: actionType.AUTH_SUCCEEDED,
            tokenId: 'test token id',
            userId: 'test user id'
        })).toEqual({
            token: 'test token id',
            userId: 'test user id',
            error: null,
            loading: false
        })
    })
});