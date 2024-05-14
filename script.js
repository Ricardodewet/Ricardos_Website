
const burgerBtn = document.querySelector('.burger_btn');
const burgetIcon = document.querySelector('.burger_icon');
const navList = document.querySelector('.nav_list');
let isRotated = false;

burgerBtn.addEventListener('click', () => {
    navList.classList.toggle('shown');
    burgetIcon.classList.toggle('shown');
    burgerBtn.style.transform = 'rotate(90deg)';
    isRotated = !isRotated;
    if (isRotated) {
        burgerBtn.style.transform = 'rotate(90deg)';
    } else {
        burgerBtn.style.transform = 'rotate(0deg)';
    }
});

// Load password 
fetch('Other_Sources/t.txt')
    .then(response => response.text())
    .then(password => {
    // Store password
    const storedPassword = password.trim();

    // Add event listeners
    document.getElementById('download-cv').addEventListener('click', () => {
        promptForPassword(storedPassword, 'CV', 'Other_Sources/CV - Ricardo De Wet.pdf', 'CV - Ricardo De Wet');
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

// Creating extra scroll ribbon values
const scrollers = document.querySelectorAll(".scroll_ribbon");

scrollers.forEach((scroller) => {
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelectorAll('.modal')[0];
    const items = document.querySelectorAll('.scroll_item');
    const index_list = []
    
    function getSide(index_list, img, h2, p) {
        if (index_list.length % 2 == 0) {
            return `
                <img src="${img.src}" alt="Project Image">
                <div>
                    <h2>${h2.innerText}</h2>
                    <p>${p.innerText}</p>
                </div>
            `;
        } else {
            return `
                <div>
                    <h2>${h2.innerText}</h2>
                    <p>${p.innerText}</p>
                </div>
                <img src="${img.src}" alt="Project Image">
            `;
        }
    }

    function loadForm() {
        items.forEach((item) => {
            const itemContent = document.createElement('div');
            itemContent.className = 'modal_body';
            const itemImg = item.querySelector('img');
            const itemH2 = item.querySelector('h2');
            const itemP = item.querySelector('p');

            itemContent.innerHTML = getSide(index_list, itemImg, itemH2, itemP);

            if (index_list.includes(itemH2.innerText)== false) {
                index_list.push(itemH2.innerText);
                console.log(itemH2)
                modal.appendChild(itemContent);
            }
        });
        console.log(index_list)
    }
    console.log(index_list)

    const openModalButton = document.querySelectorAll('[data-modal-target]');
    const closeModalButton = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    const stopAnimation = document.querySelectorAll('.scroll_item');
    const modalHeader = document.querySelector('.modal_header');
    const mainModel = document.querySelector('.modal')
    
    openModalButton.forEach(div =>{
        div.addEventListener('click', () =>{
            const modal = document.querySelector(div.dataset.modalTarget);
            openModal(modal);
            loadForm();
        });
    });
    
    closeModalButton.forEach(div =>{
        div.addEventListener('click', () =>{
            const modal = div.closest('.modal_header');
            closeModal(modal);
        });
    });
    
    overlay.addEventListener('click', () =>{
        const modals = document.querySelectorAll('.modal_header');
        modals.forEach(modal=>{
            closeModal(modal);
        });
    });
    
    function openModal(modal){
        if (modal == null) return
        modal.classList.add('active');
        overlay.classList.add('active');
        modalHeader.classList.add('active');
        stopAnimation.forEach(div =>{div.classList.add('deactivate')})    ;   
    }
    
    function closeModal(modal){
        if (modal == null) return
        modal.classList.remove('active');
        overlay.classList.remove('active');
        mainModel.classList.remove('active');
        stopAnimation.forEach(div =>{div.classList.remove('deactivate')});
    }
    
//  Adding Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry)=>{
            if (entry.isIntersecting){
                entry.target.classList.add('show');
            }else{
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements_l = document.querySelectorAll('.NA_l');
    hiddenElements_l.forEach((element) => observer.observe(element));

    const hiddenElements_r = document.querySelectorAll('.NA_r');
    hiddenElements_r.forEach((element) => observer.observe(element));

});








