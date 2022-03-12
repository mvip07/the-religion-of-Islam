const btn = document.querySelector('.btnSubmit')
const form = document.querySelector('.form')
const input = document.querySelectorAll('input')
const textarea = document.querySelector('.msg')

for (let i = 2; i < input.length; i++) {

    btn.addEventListener('click', () => {
        const name = document.querySelector('.name').value
        const subject = document.querySelector('.subject').value
        const email = document.querySelector('.email').value
        const msg = document.querySelector('.msg').value

        if (name != "" && subject != "" && email != "" && msg != "") {
            Email.send({
                Host: "smtp.mailtrap.io",
                Username: "b37cb8823c318c",
                Password: "594af558936d76",
                To: "mirabzalozodov07@gmail.com",
                From: email,
                Subject: "Contact Us Query By the Customer",
                Body: `
                   Name: ${name}; 
                   Subject: ${subject}; 
                   Email: ${email}; 
                   Message: ${msg};
            `

            }).then(msg => alert("The email successfully sent"))
        }

        if (name == "" && subject == "" && email == "" && msg == "") alert("No data entered")
        input[i].value = "";
        textarea.value = ""
    })
}