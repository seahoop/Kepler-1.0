// src/context/resolveContext.ts
import { RequestContext } from './types'

/**  
 * Figures out who is making the request. 
 * 
 * This function checks the request and decide : 
 * - if the user is logged in or not 
 * - which tenant they belong to 
 * - what kind of access they have 
 * 
 * Everything else in kepler uses this result 
 * If this cannot be figured out then request should stop. 
 * **/
export async function resolveContext(event: any): Promise<RequestContext> {
    const authHeader = 
        event.headers?.authorization || event.headers?.authorization

    // Below is for Kepler External System
    if(!authHeader) {
        return {
            tenantId: 'public',
            accessMode: 'external'
        }
    }

    // Below is for Kepler internal System
    return {
        tenantId: 'example - tenant',
        accessMode: 'internal',
        userId: 'user-123',
        roles: []
    }
}

