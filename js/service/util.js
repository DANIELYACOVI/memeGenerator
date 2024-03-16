'use strict'

function generateUniqueId() {
    if (!generateUniqueId.counter) {
        generateUniqueId.counter = 1
    }
    return generateUniqueId.counter++
}