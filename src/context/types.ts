/* Class Comment: 
* Define trusted request context used throughout Kepler. 
*
* These types describe who is mkaing a request, which tenant they belong to, and what kind of 
* access they have, after the request has been validated by the server. 
*/
export type AccessMode = 'external' | 'internal'

export type RequestContext = {
    tenantId: string
    accessMode: AccessMode

    userId?: string
    roles?: string[]
}