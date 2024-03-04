const statuses = ['active', 'finished', 'hold', 'canceled']
let todos = []
const toggleLoader = () => {
    const loader = document.querySelector('.loader')
    loader.style.display = ['none', ''].includes(loader.style.display) ? 'flex' : 'none'
}

const loadPosts = async (search = '') => {
    toggleLoader()
    const {data} = await axios.get('https://spiced-sustaining-pilot.glitch.me/todo')
    todos = data
    toggleLoader()
    const lists = document.querySelectorAll('.todo-items')
    lists.forEach(list => { list.innerHTML = '' })
    data.forEach(({ title, status, id }) => {
        if(!statuses.includes(status)) return
        const list = document.querySelector(`.todo-col--${status} .todo-items`)
        const item = document.createElement('div')
        const remove = document.createElement('img')
        const text = document.createElement('p')
        remove.src = './assets/trash.svg'

        item.classList.add('todo-item')
        item.dataset.todoId = id
        text.innerText = title
        item.appendChild(text)
        item.appendChild(remove)
        list.appendChild(item)

        remove.addEventListener('click', async () => {
            toggleLoader()
            await axios.delete(`https://spiced-sustaining-pilot.glitch.me/todo/${id}`)
            item.remove()
            toggleLoader()
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
                    toggleLoader()
                    const {data} = await axios.put(`https://spiced-sustaining-pilot.glitch.me/todo/${id}`, {
                        title: input.value,
                        status,
                        id
                    })
                    input.blur()
                    text.innerText = data.title
                    toggleLoader()
                }
            })
            // await axios.delete(`https://spiced-sustaining-pilot.glitch.me/todo/${id}`)
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
            await axios.post(`https://spiced-sustaining-pilot.glitch.me/todo`, {
                title: input.value,
                status: radio.id,
            })
            loadPosts()
        }
    })
})


$( function() {
    $( ".todo-items" ).sortable({
        connectWith: ".todo-items",
        items: ".todo-item",
        stop: async function (container, data) {
            const todoId = data.item[0].dataset.todoId
            const status = container.toElement.parentNode.dataset.status
            if(todos.some(todo => todo.id === todoId && todo.status === status)) {
                return
            }
            toggleLoader()
            todos.find(todo => todo.id === todoId).status = status
            await axios.put(`https://spiced-sustaining-pilot.glitch.me/todo/${todoId}`, {
                status,
                title: data.item[0].firstChild.innerText
            })
            toggleLoader()
        },
    }).disableSelection();
} );