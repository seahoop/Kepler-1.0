import {resolveContext} from './context/resolveContext'

export async function handler(event: any) {
    const context = await resolveContext(event)

    console.log('Resolved context', context)

    return {
        statusCode: 200, 
        body: JSON.stringify({ok: true})
    }
}