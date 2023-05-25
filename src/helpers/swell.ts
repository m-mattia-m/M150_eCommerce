import swell from 'swell-js'

if (!import.meta.env.VITE_MY_STORE || !import.meta.env.VITE_SECRET_KEY) {
    throw new Error('Swell store could not be initialized!');
}


swell.init(import.meta.env.VITE_MY_STORE, import.meta.env.VITE_PRIVATE_KEY)

export async function swellListProducts():Promise<swell.ResultsResponse<swell.Product>> {
    return await swell.products.list()
}

export async function swellListSpecificProducts(idList: string[]){
    let cart: swell.Product[] = []
    for (const idListIndex in idList) {
        cart.push(await swell.products.get(idList[idListIndex]))
    }
    return cart
}