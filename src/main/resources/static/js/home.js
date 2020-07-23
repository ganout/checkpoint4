class Carousel {

    /**
     * moveCallBacks
     *
     * @callback moveCallBack
     * @param {number} index
     */


    /**
     * @param {HTMLElement} element
     * @param {Object} options slideToScroll = number of items to scroll
     * @param {Object} options slideVisible = number of visible items
     * @param {boolean} options loop = doit-on boucler en fin de carrousel ?
     * */
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slideVisible: 1,
            loop: false
        }, options);
        let children = [].slice.call(element.children);
        this.isMobile = false;
        this.currentItem = 0;
        this.root = this.createDivWithClass("carousel");
        this.container = this.createDivWithClass("carousel-container");
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.moveCallBacks = [];
        this.items = children.map((child) => {
            let item = this.createDivWithClass("carousel-item");
            item.appendChild(child);
            this.container.appendChild(item);
            return item;
        });
        this.createNavigation();
        this.moveCallBacks.forEach(cb => cb(0))
        this.setStyle();
        this.onWindowResize();
        window.addEventListener("resize", this.onWindowResize.bind(this))
    }

    /**
     * Applique les bonnes dimensions aux éléments du carousel
     */
    setStyle() {
        let ratio = this.items.length / this.slideVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.slideVisible) / ratio) + "%");
    }

    createNavigation() {
        let nextButton = this.createDivWithClass("carousel-next");
        let prevButton = this.createDivWithClass("carousel-prev");
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener("click", this.next.bind(this));
        prevButton.addEventListener("click", this.prev.bind(this));
        if (this.options.loop === false) {
            this.onMove(index => {
                if (index === 0) {
                    prevButton.classList.add("carousel-prev-hidden");
                } else {
                    prevButton.classList.remove("carousel-prev-hidden");
                }
                if (this.items[this.currentItem + this.slideVisible] === undefined) {
                    nextButton.classList.add("carousel-next-hidden");
                } else {
                    nextButton.classList.remove("carousel-next-hidden");
                }
            })
        }
    }

    next () {
        this.goToItem(this.currentItem + this.slideToScroll);
    }

    prev () {
        this.goToItem(this.currentItem - this.slideToScroll);
    }

    /**
     *
     * @param {number} index Deplace le carrousel vers l'élement ciblé
     */
    goToItem (index) {
        if (index < 0) {
            index = this.items.length - this.options.slideVisible;
        } else if (index >= this.items.length || (this.items[this.currentItem + this.options.slideVisible] === undefined) &&
        index > this.currentItem) {
            index = 0;
        }
        let translateX = index * ((-100) / this.items.length);
        this.container.style.transform = "translate3d(" + translateX + "%, 0, 0)";
        this.currentItem = index;
        this.moveCallBacks.forEach(cb => cb(index))
    }

    /**
     *
     * @param {moveCallBack}cb
     */
    onMove (cb) {
        this.moveCallBacks.push(cb);
    }

    onWindowResize () {
        let mobile = window.innerWidth < 768;
        if (mobile !== this.mobile) {
            this.isMobile = mobile;
            this.setStyle();
            this.moveCallBacks.forEach(cb => cb(this.currentItem))
        }
    }

    /**
     *
     * @param {string}className
     * @returns {HTMLElement}
     */
    createDivWithClass (className) {
        let div = document.createElement("div");
        div.setAttribute("class", className);
        return div;
    }

    get slideToScroll() {
        return this.isMobile ? 1 : this.options.slideToScroll;
    }

    get slideVisible() {
        return this.isMobile ? 1 : this.options.slideVisible;
    }
}

new Carousel (document.querySelector('#carousel'),{
    slideToScroll: 1,
    slideVisible: 3,
    loop: false
});