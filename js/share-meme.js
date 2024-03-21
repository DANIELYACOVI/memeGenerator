'use strict'

function shareToInstagram() {
    const memeCanvas = document.getElementById('canvas')
    const canvasDataURL = memeCanvas.toDataURL('image/png')

    window.open('https://www.instagram.com/create', '_blank')
}
