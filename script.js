
const burgerBtn = document.querySelector('.burger-btn');
const navList = document.querySelector('.nav-list');

burgerBtn.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// Load password 
fetch('Other_Sources/t.txt')
    .then(response => response.text())
    .then(password => {
    // Store password
    const storedPassword = password.trim();

    // Add event listeners
    document.getElementById('download-cv').addEventListener('click', () => {
        promptForPassword(storedPassword, 'CV', 'Other_Sources/CV.pdf', 'CV - Ricardo De Wet');
    });

    document.getElementById('download-Transcript').addEventListener('click', () => {
        promptForPassword(storedPassword, 'Academic Transcript', 'Other_Sources/Academic Records.pdf', 'Academic Transcript - Ricardo De Wet');
    });

    document.getElementById('download-por').addEventListener('click', () => {
        promptForPassword(storedPassword, 'Proof of Registration', 'Other_Sources/Proof of Registration.pdf', 'Proof of Registration - Ricardo De Wet');
    });
});

// Prompt for password
function promptForPassword(storedPassword, fileName, fileUrl, downloadName) {
    const userInput = prompt(`Enter password to download Ricardo's ${fileName}:`);
    if (userInput === storedPassword) {
    // Create the link to download file
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = downloadName;
    link.click();
    } else {
    alert('Incorrect password');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modal_body = document.querySelectorAll('.modal_body')[0];
    const items = document.querySelectorAll('.scroll_item');
    const index_list = []

    function loadForm() {
        items.forEach((item) => {
            const itemContent = document.createElement('div');
            itemContent.className = 'form_item';
            const itemImg = item.querySelector('img');
            const itemH2 = item.querySelector('h2');
            const itemP = item.querySelector('p');
            itemContent.innerHTML = `
                <img src="${itemImg.src}" alt="Placeholder image">
                <div>
                    <h2>${itemH2.innerText}</h2>
                    <p>${itemP.innerText}</p>
                </div>
            `;
            if (index_list.includes(itemH2)== false) {
                index_list.push(itemH2)
                modal_body.appendChild(itemContent);
            }
        });
    }

    const openModalButton = document.querySelectorAll('[data-modal-target]')
    const closeModalButton = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')
    const stopAnimation = document.querySelectorAll('.scroll_item')
    
    openModalButton.forEach(div =>{
        div.addEventListener('click', () =>{
            const modal = document.querySelector(div.dataset.modalTarget)
            openModal(modal)
            loadForm()
        })
    })
    
    closeModalButton.forEach(div =>{
        div.addEventListener('click', () =>{
            const modal = div.closest('.modal')
            closeModal(modal)
        })
    })
    
    overlay.addEventListener('click', () =>{
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal=>{
            closeModal(modal)
        })
    })
    
    function openModal(modal){
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
        stopAnimation.forEach(div =>{div.classList.add('deactivate')})       
    }
    
    function closeModal(modal){
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
        stopAnimation.forEach(div =>{div.classList.remove('deactivate')})
    }
   
});







// This code is just an example and may not be necessary for your use case
document.querySelectorAll('.interest-item h3').forEach((h3) => {
    h3.addEventListener('click', () => {
      h3.nextElementSibling.classList.toggle('expanded');
    });
  });