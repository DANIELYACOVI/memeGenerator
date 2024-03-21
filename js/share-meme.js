'use strict'

function shareToFacebook() {
    const urlToShare = window.location.href

    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`, '_blank')
}

function shareToInstagram() {
    const memeCanvas = document.getElementById('canvas')
    const canvasDataURL = memeCanvas.toDataURL('image/png')

    window.open('https://www.instagram.com/create', '_blank')
}