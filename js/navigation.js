'use strict'

var galleryTabs = document.querySelectorAll('.gallery-tab')
var savedTabs = document.querySelectorAll('.saved-tab')
var randomTabs = document.querySelectorAll('.random-tab')

galleryTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        document.getElementById('gallery-container').style.display = 'block'
        document.getElementById('saved-container').style.display = 'none'
        document.getElementById('random-container').style.display = 'none'
    })
})

savedTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        document.getElementById('gallery-container').style.display = 'none'
        document.getElementById('saved-container').style.display = 'block'
        document.getElementById('random-container').style.display = 'none'
    })
})

randomTabs.forEach(tab => {
    tab.addEventListener('click', function () {
        document.getElementById('gallery-container').style.display = 'none'
        document.getElementById('saved-container').style.display = 'none'
        document.getElementById('random-container').style.display = 'block'
    })
})

function toggleMenu() {
    var menuIcon = document.getElementById('menu-icon')
    var mainNav = document.querySelector('.main-nav')
    mainNav.classList.toggle('active')
    document.body.classList.toggle('menu-open')

    if (mainNav.classList.contains('active')) {
        menuIcon.classList.replace('fa-bars', 'fa-times')
    } else {
        menuIcon.classList.replace('fa-times', 'fa-bars')
    }
}

function navigateToSaved() {
    closeDialog()
    toggleSavedMemesSection()
}

function toggleSavedMemesSection() {
    document.getElementById('gallery-container').style.display = 'none'
    document.getElementById('random-container').style.display = 'none'
    document.getElementById('saved-container').style.display = 'block'
}
