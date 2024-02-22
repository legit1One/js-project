// // fetch('https://jsonplaceholder.typicode.com/posts/1', {
// //     method: 'DELETE'
// // })
//
// axios.get('http://localhost:3000/posts')
//     .then(response => {
//         console.log(response.data)
//     })
//
// axios.post('http://localhost:3000/posts', {
//     body: 'Baha',
//     title: 'Hot',
// })
//
// const loadPosts = async (search = '') => {
//     const {data} = await axios.get('http://localhost:3000/posts')
//     const list = document.querySelector('.posts')
//     list.innerHTML = ''
//     data.forEach(({title}) => {
//         if(title.toUpperCase().includes(search.toUpperCase())) {
//             const li = document.createElement('li')
//             li.innerText = title
//             list.appendChild(li)
//         }
//     })
// }
//
// loadPosts()
//
// const button = document.querySelector('#btn')
// const input = document.querySelector('input')
//
// button.addEventListener('click', () => {
//     loadPosts(input.value)
// })

const statuses = ['active', 'finished', 'hold', 'canceled']
const loadPosts = async (search = '') => {
    const {data} = await axios.get('http://localhost:3000/todo')
    data.forEach(({ title, status, id }) => {
        if(!statuses.includes(status)) return
        const list = document.querySelector(`.todo-col--${status} .todo-items`)
        const item = document.createElement('div')
        const remove = document.createElement('img')
        const text = document.createElement('p')
        remove.src = './assets/trash.svg'

        item.classList.add('todo-item')
        text.innerText = title
        item.appendChild(text)
        item.appendChild(remove)
        list.appendChild(item)

        remove.addEventListener('click', async () => {
            await axios.delete(`http://localhost:3000/todo/${id}`)
            item.remove()
        })

        text.addEventListener('dblclick', async () => {
            text.style.display = 'none'
            const input = document.createElement('input')
            input.value = text.innerText
            item.prepend(input)
            input.focus()

            input.addEventListener('blur', () => {
                input.remove()
                text.style.display = 'block'
            })

            input.addEventListener('keypress', async (e) => {
                if(e.code === 'Enter') {
                    const {data} = await axios.put(`http://localhost:3000/todo/${id}`, {
                        title: input.value,
                        status,
                        id
                    })
                    input.blur()
                    text.innerText = data.title
                }
            })
            // await axios.delete(`http://localhost:3000/todo/${id}`)
            // item.remove()
        })
    })
}

loadPosts()

document.querySelector('.form__head button').addEventListener('click', async () => {
    const input = document.querySelector('.form__name')
    if(input.value === '') {
       return alert('Название должно быть заполнено')
    }

    const radios = document.querySelectorAll('.form__radio')

    radios.forEach(async (radio) => {
        if(radio.checked) {
            await axios.post(`http://localhost:3000/todo`, {
                title: input.value,
                status: radio.id,
            })
            loadPosts()
        }
    })
    console.dir(radios)
    // const { data } = await axios.post(`http://localhost:3000/todo`, {
    //     title: input.value,
    //     status,
    //     id
    // })
})
// // axios.post('http://localhost:3000/posts', {
// //     name: 'AXIOS'
// // })
//
// // axios.delete('http://localhost:3000/posts/d349')
//
// const student = {
//     name: 'Baha',
//     age: 19,
//     getSurname: () => 'Hot'
// }
//
// const studentJson = JSON.stringify(student)
//
// const studentCopy = JSON.parse(studentJson)
//
// studentCopy.name = 'Skye'
//
// console.log(studentCopy)
// console.log(student)
// // console.log(studentJson)
// // console.log(JSON.parse(studentJson))
//
// const printGreeting = () => {
//     return 'Hello World'
// }
//
// console.log(printGreeting())