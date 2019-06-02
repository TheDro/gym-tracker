function randomId() {
    return new Date().valueOf()+''+Math.floor(1000*Math.random())
}

export default randomId
