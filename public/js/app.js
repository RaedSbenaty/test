console.log('hello world!')

var form = document.querySelector('form')
var search = document.querySelector('input')
var m1 = document.querySelector('#m1')
var m2 = document.querySelector('#m2')



form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    m1.textContent = 'Loading..'
    m2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                m1.textContent = data.error
                return m2.textContent = ''
            }
            m1.textContent = 'location: ' + data.location
            m2.textContent = 'forecast: ' + data.forecastResponse
        })
    })

})