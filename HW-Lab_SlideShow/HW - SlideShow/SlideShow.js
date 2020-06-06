class SlideShow {
    // constructor
    constructor(theGallery, theImage, imageCaption, next, prev) {
        this.theGallery = theGallery;
        this.theImage = theImage;
        this.imageCaption = imageCaption;
        this.next = next;
        this.prev = prev;
        this.startPosition = Math.floor(Math.random() * theGallery.length);
    }
    // behaviours
    _displayImage() {
        this.theImage.src = this.theGallery[this.startPosition].src;
		this.theImage.alt = this.theGallery[this.startPosition].alt;
        if(this.theGallery.indexOf(this.startPosition).caption) {
            this.imageCaption.innerHTML = this.theGallery[this.startPosition].caption;
        }
        else {
            caption = this.theImage.alt;
        }
        
    }
    _previousImage() {
    }
    _nextImage() {
    }
}
// image array
let images = [
            { src: "images/stones.jpg", alt: "Pretty stones", caption: "My messing about with my camera in January" },
            { src: "images/sea-mist.jpg", alt: "Mist over the sea", caption: "A misty day at sea" },
            { src: "images/pier.jpg", alt: "A scenic pier" },
            { src: "images/mojave.jpg", alt: "The mojave desert" },
            { src: "images/lotus.jpg", alt: "A lotus flower" },
            { src: "images/lightning.jpg", alt: "Lightning across the sky" },
            { src: "images/ladybug.jpg", alt: "Close up of a lady bird" },
            { src: "images/grass-blades.jpg", alt: "Individual blades of grass" },
            { src: "images/flowing-rock.jpg", alt: "Water flowing across a rock" }
];

let image = document.getElementById("slideShow");
let caption = document.getElementById("captionText");
const mySlideShow = new SlideShow(images, image, caption);
console.dir(mySlideShow);
mySlideShow._displayImage()