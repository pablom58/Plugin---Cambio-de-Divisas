import { baseUrl , token } from './config'

export const getData = async () => {

    // if(!token)
    //     return {
    //         status: -1,
    //         message: 'Error al validar el token'
    //     }
    
    let response = await fetch(`${baseUrl}/api/returnRegistro`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    })

    response = await response.json()

    return response
}