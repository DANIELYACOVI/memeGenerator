'use strict'

const gTrans = {
    title: {
        english: 'Meme Generator',
        hebrew: 'מחולל ממים'
    },
    gallery: {
        english: 'Gallery',
        hebrew: 'גלריה'
    },
    saved: {
        english: 'Saved',
        hebrew: 'שמור'
    },
    randomized: {
        english: 'Randomized',
        hebrew: 'אקראי'
    },
    search: {
        english: 'search',
        hebrew: 'חפש...'
    }
}

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
    let transTxt = transMap[gCurrLang]
    if (!transTxt) transTxt = transMap.en
    return transTxt
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        // console.log('transKey:', transKey)
        const transTxt = getTrans(transKey)
        // console.log('transTxt:', transTxt)
        if (el.placeholder) el.placeholder = transTxt
        else el.innerText = transTxt
    })
}

var gCurrLang = 'english'

function setLang(lang) {
    gCurrLang = lang
}

function onSetLang(lang) {
    setLang(lang)
    doTrans()
}