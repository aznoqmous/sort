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
        this.elements.map((el, i) => {
            el.setAttribute('data-index', i)
        })

        this.hr = document.createElement('hr')
        let styles = {
            opacity: 0,
            width: "100%",
            height: "1px",
            background: "blue",
            padding: 0,
            margin: 0
        }
        for(let key in styles) this.hr.style[key] = styles[key]
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
        el.style.opacity = 0.6

        el.setAttribute('data-active', true)
        let hrPosition = this.getHrPosition()
        if(hrPosition !== null){
            if(hrPosition < this.elements.length - 1) {
                if(el.getAttribute('data-index') <  hrPosition) hrPosition += 1
                this.container.insertBefore(this.hr, this.elements[hrPosition])
            }
            else this.container.appendChild(this.hr)
            this.hr.style.opacity = 1
        }
        else {
            this.hr.style.opacity = 0
        }

    }

    applyMove() {
        this.elements = this.getSortedElements()
        this.container.innerHTML = ''
        this.elements.map((el, i) => {
            el.setAttribute('data-index', i)
            el.style.transform = ''
            el.style.opacity = 1
            el.removeAttribute('data-active')
            this.container.appendChild(el)
        })
    }

    getSortedElements() {
        return this.elements
            .map((el)=>{return el})
            .sort((a, b) => {
                let ay = a.getBoundingClientRect().y
                if(a.transformedY) ay += a.transformedY
                let by = b.getBoundingClientRect().y
                if(b.transformedY) by += b.transformedY
                return (ay > by) ? 1 : -1;
        })
    }

    getHrPosition(){
        let currentEl = this.elements.filter(el => el.getAttribute('data-active'))[0].getAttribute('data-index')

        this.sortedElements = this.getSortedElements()
        let sortedIndices = this.sortedElements.map(el => el.getAttribute('data-index'))
        let indices = this.elements.map(el => el.getAttribute('data-index'))
        if(sortedIndices.join() === indices.join()) return null;

        for(let index of sortedIndices){
            if(sortedIndices[index] === currentEl) return parseInt(index);
        }
    }
}
