/** 
 * Create an instance of scrollspy.
*/
const IMScrollSpy = {
    /** 
     * initialize the scroll spy feature.
     * @param {string} [sectionName] section class to find in the DOM.
     * @param {(string|number)} [offsetScreen] the offset to start to count scroll.
    */
    init: function(sectionName, offsetScreen) {
        // init values of object
        this.sectionName = sectionName || 'section'
        this.offsetScreen = parseInt(offsetScreen) || 0
        this.sections = {}

        document.querySelectorAll(`.${this.sectionName}`)
            .forEach((section) => {
                this.sections[section.id] = section.offsetTop
            })
    
        // add class active to the very first list item
        document.querySelector('a[href*=' + Object.keys(this.sections)[0] + ']').setAttribute('class', 'active')

        // create listener to scroll
        window.onscroll = () => this.scroll()
    },

    scroll: function() {
        const offsetPos = document.documentElement.scrollTop || document.body.scrollTop

        Object.keys(this.sections).forEach((section) => {
            if (this.sections[section] <= (offsetPos - this.offsetScreen)) {
                // existing active class in list item anchor remove class 'active'
                document.querySelector('.active').setAttribute('class', ' ')
                document.querySelector('a[href*=' + section + ']').setAttribute('class', 'active')
            }
        })
    }
}

const InstanceScrollSpy = Object.create(IMScrollSpy)

InstanceScrollSpy.init(null, -51)