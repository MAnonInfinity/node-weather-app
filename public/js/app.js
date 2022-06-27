const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageTwo.textContent = ''
    messageOne.textContent = 'Loading....'

    const location = search.value
    fetch(`http://localhost:3000/weather?location=${location}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                console.log(data.error)
            }
            else {
                messageOne.textContent = data.location
                console.log(data.forecast)
                messageTwo.textContent = data.forecast
                console.log(data.location)
            }
        })
        .catch(err => {
            console.log(err)    
        })
})