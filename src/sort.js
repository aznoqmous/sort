/**
 * Callbacks:
 * - onSort(elements)
 */
export default class Sort {

    constructor(container, config={}) {

        for(let key in config) this[key] = config

        this.container = container

        this.container.style.userSelect = 'none'

        this.currentTarget = null

        this.init()
        this.buildHr()
        this.bind()

        let mo = (new MutationObserver((mutations, observer)=>{
            for(let mutation of mutations){
                if( !mutation.addedNodes.length && !mutation.removedNodes.length ) continue;
                if(this.elements.length == this.container.children.length - 1) continue;

                console.log(this.elements, this.container.children)

                this.unbind()
                this.init()
                this.bind()

            }
        })).observe(this.container, { childList: true })
    }

    init() {
        this.elements = [...this.container.querySelectorAll(':scope > *:not(hr)')]
        this.elements.map((el, i) => {
            el.setAttribute('data-index', i)
            if(!el.querySelector('span.sort')) {
                let sort = document.createElement('span')
                el.appendChild(sort)
                sort.className = 'sort'
                sort.innerHTML = '&#11205;&#11206;'
                let styles = {
                    'font-size': '0.8rem',
                    'letter-spacing': '-0.8em',
                    transform: 'translate(0, -0.3em)',
                    'writing-mode': 'vertical-lr',
                    cursor: 'n-resize',
                }
                for(let key in styles) sort.style[key] = styles[key]
            }
        })
    }

    buildHr(){
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
        this.container.appendChild(this.hr)
    }

    unbind(){
        let mousedown = (e) => {
            this.currentTarget = e.currentTarget.parentElement
            this.initialPos = e.currentTarget.parentElement.getBoundingClientRect()
            this.initialCursorPos = {x: e.pageX, y: e.pageY}

            this.container.addEventListener('mousemove', move)
            document.body.addEventListener('mouseup', mouseup)
        }
        this.elements.map(el => {
            el.querySelector('span.sort').removeEventListener('mousedown', mousedown)
        })
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

        let mousedown = (e) => {
            this.currentTarget = e.currentTarget.parentElement
            this.initialPos = e.currentTarget.parentElement.getBoundingClientRect()
            this.initialCursorPos = {x: e.pageX, y: e.pageY}

            this.container.addEventListener('mousemove', move)
            document.body.addEventListener('mouseup', mouseup)
        }

        this.elements.map(el => {
            el.querySelector('span.sort').addEventListener('mousedown', mousedown)
        })
    }

    move(e, el) {
        let currentCursorPos = {x: e.pageX, y: e.pageY}
        let cursorDiff = {x: currentCursorPos.x - this.initialCursorPos.x, y: currentCursorPos.y - this.initialCursorPos.y}
        el.style.transform = `translate(${cursorDiff.x}px, ${cursorDiff.y}px)`
        el.transformedX = cursorDiff.x
        el.transformedY = cursorDiff.y
        el.style.zIndex = 10000
        el.style.opacity = 0.8

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
        this.elements.map((el, i) => {
            el.setAttribute('data-index', i)
            el.style.transform = ''
            el.style.opacity = 1
            el.removeAttribute('data-active')
            this.container.appendChild(el)
        })
        if(this.onSort) this.onSort(this.elements)
        this.hr.style.opacity = 0
    }

    getSortedElements() {
        return this.elements
            .map((el)=>{return el})
            .sort((a, b) => {
                let ay = a.getBoundingClientRect().y + a.getBoundingClientRect().height / 2
                let by = b.getBoundingClientRect().y + b.getBoundingClientRect().height / 2
                return (ay > by) ? 1 : -1;
            })
    }

    getHrPosition(){
        let currentEl = this.elements.filter(el => el.getAttribute('data-active'))[0].getAttribute('data-index')

        let sortedElements = this.getSortedElements()
        let sortedIndices = sortedElements.map(el => el.getAttribute('data-index'))
        let indices = this.elements.map(el => el.getAttribute('data-index'))
        if(sortedIndices.join() === indices.join()) return null;

        console.log(sortedElements, this.elements)

        for(let index of sortedIndices){
            if(sortedIndices[index] === currentEl) return parseInt(index);
        }
    }
}
