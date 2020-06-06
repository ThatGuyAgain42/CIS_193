class SlideShow {
	
    // constructor
    constructor(gallery,image,caption,next,prev) {
		this.theGallery = gallery;
		this.theImage = image;
		this.imageCaption = caption;
		this.next = next;
		this.prev = prev;
		this.startPosition = Math.floor(Math.random() * gallery.length);
		
		this.next.onclick = () => {this._nextImage()};
		this.prev.onclick = () => {this._previousImage()};
    }
	
	
    // behaviours
	_displayImage(){
		this.theImage.src = this.theGallery[this.startPosition].src;
		this.theImage.alt = this.theGallery[this.startPosition].alt;
		
		if (this.theGallery.caption != undefined){
			this.imageCaption.innerHTML = this.theImage.caption;
		} else {
			this.imageCaption.innerHTML = this.theImage.alt;
		}
	}
	
	_previousImage(){
		// Decreases the value of startPosition by 1.
		this.startPosition--
		// Sets startPosition to one less than the length of theGallery if startPosition is less than 0.
		if (this.startPosition < 0){
			this.startPosition = this.theGallery.length - 1;
		}
		// Calls the _displayImage function.
		this._displayImage();
	}
	
	_nextImage(){
		
		this.startPosition++
		
		if (this.theGallery.length - 1 < this.startPosition){
			this.startPosition = 0;
		}
		
		this._displayImage();
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


var image = document.querySelector("#slideShow");
var caption = document.querySelector("#captionText");
var next = document.querySelector("#next");
var prev = document.querySelector("#prev");

var mySlideShow = new SlideShow(images,image,caption,next,prev);
console.dir(mySlideShow);

mySlideShow._displayImage()

