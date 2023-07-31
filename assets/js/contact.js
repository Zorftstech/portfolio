let emailClear = document.getElementById('email');
let nameClear = document.getElementById('name');
let messageClear = document.getElementById('message');
let telClear = document.getElementById('tel');
let subjectClear = document.getElementById('subject');
const success = document.getElementById('success')

console.log(subjectClear)

function handleFormSubmit(e) {
    e.preventDefault();

    const formElement = e.target;
    const formData = new FormData(formElement);

    var formMessages = $('.ajax-response');

    // convert form to JSON object
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    console.log(jsonData)

    // send a POST request using Fetch API 
    fetch('https://sitebackend-api.vercel.app/contact/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(
        data => {
            console.log(data)
            formElement.reset();
            console.log(messageClear)
            success.classList.add('success')
        }
        
    )
    .catch(error => {
                // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Set the message text.
        if (data.responseText !== '') {
            $(formMessages).text(data.responseText);
        } else {
            $(formMessages).text('Oops! An error occured and your message could not be sent.');
        }
        console.error(error)
    })
}

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', handleFormSubmit);
document.getElementById('close').addEventListener('click', () => {
    success.classList.remove('success')
})