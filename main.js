const getPokemon = (url, callback) => {
    const request = new XMLHttpRequest()

    request.addEventListener('readystatechange', () => {
        const isRequestOk = request.readyState === 4 && request.status === 200
        const isRequestNotOk = request.readyState === 4
        
        if (isRequestOk) {
            const data = JSON.parse(request.responseText)

            callback(null, data)
            return
        }

        if (isRequestNotOk) {
            callback('Não foi possível obter os dados', null)
        }
    })

    request.open('GET', url)
    request.send()
}

const logPokemonData = (error, data) => error 
    ? console.log(error)
    : console.log(data.name)  
    
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

getPokemon(getPokemonUrl(1), (error, data) => {
    logPokemonData(error, data)

    getPokemon(getPokemonUrl(4), (error, data) => {
        logPokemonData(error, data)

        getPokemon(getPokemonUrl(25), logPokemonData)
    })
})