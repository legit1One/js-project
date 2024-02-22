// location.href = 'https://google.com'

// location.reload()

// const button = document.querySelector('#clicker')
// const input = document.querySelector('#input')
//
//
// input.addEventListener('blur', () => {
//     alert('Clicked')
// })
//
// input.focus()
//
// let name = 'Baha'
//
// name = 'Hot'


const increment = document.querySelector('#increment')
const span = document.querySelector('#number')

// let num = localStorage.getItem('number')
let num = sessionStorage.getItem('number')

console.log(num)
// localStorage, sessionStorage, cookies
// const ob = {
//     name: 'Baha'
// }


// increment.addEventListener('click', () => {
//     localStorage.setItem('number', num)
//     span.innerText = num
//     num++
// })

// increment.addEventListener('click', () => {
//     sessionStorage.setItem('number', num)
//     span.innerText = num
//     num++
// })

// document.cookie = "username=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";

const obj = {
    massive: [1, 2, 3]
}

const array = [
    { name : 'Baha' },
    { name : 'Hot' },
    { name : 'Skye' },
]

console.log(obj.massive[0])
console.log(array[2].name)