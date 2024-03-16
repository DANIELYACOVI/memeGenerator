'use strict'


document.addEventListener("DOMContentLoaded", function () {
    const randomMemeBtn = document.getElementById('randomMemeBtn')
    // const randomMemeImg = document.getElementById('randomMemeImg')

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const randomTexts = [
        "Hello World!",
        "I'm a meme!",
        "Coding is fun!",
        "Just for laughs!",
        "Make memes great again!",
        "Keep calm and meme on!",
        "Meme magic!",
        "This is hilarious!",
        "Random text here!",
        "Text goes brrr...",
        "You're awesome!",
        "LOL!",
        "What a meme!",
        "That's funny!",
        "Stay funny!",
        "Be creative!",
        "Let's meme!",
    ]

    function generateRandomMeme() {
        const randomImgIndex = Math.floor(Math.random() * gImgs.length)
        const randomImgUrl = gImgs[randomImgIndex].url

        const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)]

        const randomImg = new Image()
        randomImg.onload = function () {
            canvas.width = randomImg.width
            canvas.height = randomImg.height
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(randomImg, 0, 0)
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'
            ctx.fillText(randomText, 10, 50)
        }
        randomImg.src = randomImgUrl
    }

    generateRandomMeme()

    randomMemeBtn.addEventListener('click', function () {
        generateRandomMeme()
    })
})
