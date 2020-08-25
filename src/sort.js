export default class Sort {
    constructor(container) {
        this.container = container

        this.container.style.userSelect = 'none'

        this.currentTarget = null

        this.init()
        this.bind()
    }

    init() {
        this.elements = [...this.container.children]
    }

    bind() {
        let move = (e)=>{
            this.move(e, this.currentTarget)
        }

        let mouseup = ()=>{
            this.currentTarget = null
            this.container.removeEventListener('mousemove', move)
            document.body.removeEventListener('mouseup', mouseup)
            this.applyMove()
        }

        this.elements.map(el => {
            el.addEventListener('mousedown', (e) => {
                this.currentTarget = el
                this.initialPos = e.currentTarget.getBoundingClientRect()
                this.initialCursorPos = {x: e.pageX, y: e.pageY}

                this.container.addEventListener('mousemove', move)
                document.body.addEventListener('mouseup', mouseup)
            })
        })

    }

    move(e, el) {
        let currentCursorPos = {x: e.pageX, y: e.pageY}
        let cursorDiff = {x: currentCursorPos.x - this.initialCursorPos.x, y: currentCursorPos.y - this.initialCursorPos.y}
        el.style.transform = `translate(${cursorDiff.x}px, ${cursorDiff.y}px)`
        el.transformedX = cursorDiff.x
        el.transformedY = cursorDiff.y
        el.style.zIndex = 10000
    }

    applyMove() {
        this.elements = this.elements.sort((a, b) => {
            let ay = a.getBoundingClientRect().y
            if(a.transformedY) ay += a.transformedY
            let by = b.getBoundingClientRect().y
            if(b.transformedY) by += b.transformedY
            return (ay > by) ? 1 : -1;
        })
        this.container.innerHTML = ''
        this.elements.map(el => {
            el.style.transform = ''
            this.container.appendChild(el)
        })
    }
}