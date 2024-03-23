'use strict'

function shareToFacebook() {
    const urlToShare = window.location.href

    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`, '_blank')
}

function shareToInstagram() {
    const memeCanvas = document.getElementById('canvas')

    window.open('https://www.instagram.com/create', '_blank')
}

function shareToTwitter() {
    const urlToShare = window.location.href

    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}`

    window.open(twitterUrl, '_blank')
}
