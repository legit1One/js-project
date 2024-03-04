const overlay = document.createElement('div')
const form = document.createElement('div')

form.classList.add('codenext-form')
overlay.classList.add('codenext-overlay')
overlay.appendChild(form)
document.body.appendChild(overlay)

const h3 = document.createElement('h3')
h3.innerHTML = 'Оставьте номер и мы <span style="color: #1E3A8A">сами вам перезвоним</span>'

const nameLabel = document.createElement('label')
const name = document.createElement('input')
name.id = 'name'
nameLabel.for = 'name'
nameLabel.innerText = 'Ваше имя'

const phoneLabel = document.createElement('label')
const phone = document.createElement('input')
phone.id = 'phone'
phone.type = 'tel'
phoneLabel.for = 'phone'
phoneLabel.innerText = 'Ваш номер'


const maskOptions = {
    mask: '+{7}({7}00)000-00-00'
};
const mask = IMask(phone, maskOptions);

const submit = document.createElement('button')
submit.classList.add('codenext-submit')
submit.innerText = 'Заказать'


const loaderOverlay = document.createElement('div')
const loader = document.createElement('div')
const checkmark = document.createElement('div')
loaderOverlay.classList.add('loader-overlay')
loader.classList.add('circle-loader')
checkmark.classList.add('checkmark', 'draw')
loader.appendChild(checkmark)
loaderOverlay.appendChild(loader)

form.appendChild(loaderOverlay)

form.appendChild(h3)
form.appendChild(nameLabel)
form.appendChild(name)
form.appendChild(phoneLabel)
form.appendChild(phone)
form.appendChild(submit)

const trigger = document.querySelector('#phone')

trigger.addEventListener('click', () => {
    overlay.classList.remove('codenext-layout-out')
    overlay.classList.add('codenext-overlay-in')
})

overlay.addEventListener('click', async () => {
    overlay.classList.add('codenext-layout-out')
    setTimeout(() => {
        loaderOverlay.classList.remove('loader-overlay-active')
        overlay.classList.remove('codenext-overlay-in')
        document.querySelector('.success-info')?.remove()
        loaderOverlay.classList.remove('loader-overlay-finished');
        checkmark.style.display = 'none';
        loader.classList.remove('load-complete')
    }, 500)
})

form.addEventListener('click', (e) => {
    e.stopPropagation()
})

submit.addEventListener('click', async (e) => {
    let hasError = false
    const numberCodes = [
        '700', '701', '702', '703', '704', '705', '706', '707', '708', '709',
        '747', '750', '751', '760', '761', '762', '763', '764', '771', '775',
        '776', '777', '778'
    ]

    console.log(phone.value)
    if(phone.value.length !== 16) {
        hasError = true
        phone.classList.add('error')
        phoneLabel.classList.add('error')
        const errorDescription = document.createElement('p')
        errorDescription.classList.add('phone-error')
        errorDescription.innerText = phone.value.length === 0 ? 'Это обязательное поле': 'Неверный формат телефона'
        if(!document.querySelector('.phone-error')) {
            phoneLabel.parentElement.insertBefore(errorDescription, phone.nextSibling)
        }
    } else if(!numberCodes.some((code) => phone.value.startsWith(`+7(${code}`))) {
        hasError = true
        phone.classList.add('error')
        phoneLabel.classList.add('error')
        const errorDescription = document.createElement('p')
        errorDescription.classList.add('phone-error')
        errorDescription.innerText = phone.value.length === 0 ? 'Это обязательное поле': 'Неверный формат телефона'
        if(!document.querySelector('.phone-error')) {
            phoneLabel.parentElement.insertBefore(errorDescription, phone.nextSibling)
        }
    }

    if(name.value.length === 0) {
        hasError = true
        name.classList.add('error')
        nameLabel.classList.add('error')
        const errorDescription = document.createElement('p')
        errorDescription.classList.add('name-error')
        errorDescription.innerText = 'Это обязательное поле'
        if(!document.querySelector('.name-error')) {
            name.parentElement.insertBefore(errorDescription, name.nextSibling)
        }
    }

    if(!hasError) {
        submit.disabled = true
        try {
            loaderOverlay.classList.add('loader-overlay-active')
            await fetch('https://codenext.kz/api/form', {
                mode: 'no-cors',
                method: 'POST',
                body: JSON.stringify({
                    name: name.value,
                    phone: phone.value,
                    info: "Taplink обратный звонок"
                })
            })
            loader.classList.add('load-complete');
            loaderOverlay.classList.add('loader-overlay-finished');
            checkmark.style.display = 'block';
            const successInfo = document.createElement('div')
            const successHeader =  document.createElement('p')
            const successText =  document.createElement('p')
            successHeader.classList.add('success-header')
            successInfo.classList.add('success-info')
            successText.classList.add('success-text')
            successHeader.innerText = 'Ваша заявка принята'
            successText.innerText = 'Наш менеджер скоро с вами свяжется 💙'
            successInfo.appendChild(successHeader)
            successInfo.appendChild(successText)
            loaderOverlay.appendChild(successInfo)
            setTimeout(() => {
            }, 1300)
        } catch(e) {
            loaderOverlay.classList.remove('loader-overlay-active')
            const errorDescription = document.createElement('p')
            errorDescription.classList.add('name-error')
            errorDescription.innerText = 'Это обязательное поле'
        } finally {
            submit.disabled = false
        }
    }
})


phone.addEventListener('input', () => {
    phone.classList.remove('error')
    phoneLabel.classList.remove('error')
    document.querySelector('.phone-error')?.remove()
})

name.addEventListener('input', () => {
    name.classList.remove('error')
    nameLabel.classList.remove('error')
    document.querySelector('.name-error')?.remove()
})