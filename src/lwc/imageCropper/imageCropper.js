import {LightningElement, api} from 'lwc';
import {loadScript, loadStyle} from 'lightning/platformResourceLoader';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import cropprResource from '@salesforce/resourceUrl/croppr';

export default class ImageCropper extends LightningElement {
    cropprCssUrl = `${cropprResource}/croppr.min.css`;
    cropprJsUrl = `${cropprResource}/croppr.min.js`;
    imageCroppr = {};
    isCropprLoaded = false;
    cropprOptions = {};
    cropprInitialized = false;

    imageElement;
    imageMimeType = '';
    imageName = '';

    croppedImageObject = {};

    @api aspectRatio = null;
    @api maxCropWidth = 0;
    @api maxCropHeight = 0;
    @api minCropWidth = 0;
    @api minCropHeight = 0;

    get isComponentReady() {
        return this.isCropprLoaded;
    }

    get isCroppingEnabled() {
        return this.isComponentReady && this.cropprInitialized;
    }

    renderedCallback() {
        if (this.isCropprLoaded) {
            return;
        }

        Promise.all([
            loadStyle(this, this.cropprCssUrl),
            loadScript(this, this.cropprJsUrl)
        ])
            .then(() => {
                this.cropprOptions = this.prepareOptions();
                this.imageElement = this.template.querySelector('img');
                this.isCropprLoaded = true;
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error!',
                        message: error.message,
                        variant: 'error'
                    })
                );
            })
    }

    prepareOptions() {
        let options = {startSize: [100, 100, '%']}
        if (this.maxCropHeight && this.maxCropWidth) {
            options.maxSize = [this.maxCropWidth, this.maxCropHeight, 'px'];
        }
        if (this.minCropHeight && this.minCropWidth) {
            options.minSize = [this.minCropWidth, this.minCropHeight, 'px'];
        }
        if (this.aspectRatio) {
            options.aspectRatio = this.aspectRatio;
        }
        options.onInitialize = () => {
            this.cropprInitialized = true;
        }
        return options;
    }

    handleFileChange(event) {
        this.cropprInitialized = false;
        const [file] = event.target.files;
        this.imageName = file.name;
        if (file) {
            this.imageElement = this.template.querySelector('img');
            this.imageElement.src = URL.createObjectURL(file);
            this.imageMimeType = file.type;
        }
    }

    imageLoadHandler(event) {
        event.target.style = '';
        this.imageCroppr = new Croppr(this.imageElement, this.cropprOptions);
    }

    handleImageCrop() {
        const croppedData = this.imageCroppr.getValue();
        let canvas = this.template.querySelector('canvas');
        let context = canvas.getContext('2d');
        context.drawImage(this.imageElement, croppedData.x, croppedData.y, croppedData.width, croppedData.height, 0, 0, croppedData.width, croppedData.height);
        let croppedImageDataUrl = canvas.toDataURL(this.imageMimeType);
        let croppedImageBlob = this.dataURLtoBlob(croppedImageDataUrl);
        this.prepareCroppedImageObject(croppedImageBlob);
    }

    dataURLtoBlob(dataURL) {
        let BASE64_MARKER = ';base64,';
        if(dataURL.indexOf(BASE64_MARKER) === -1) {
            let parts = dataURL.split(',');
            let contentType = parts[0].split(':')[1];
            let raw = decodeURIComponent(parts[1]);

            return new Blob([raw], {type: contentType});
        }
        let parts = dataURL.split(BASE64_MARKER);
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for(let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], {type: contentType});
    }

    prepareCroppedImageObject(blob) {
        this.croppedImageObject = {
            blob: blob,
            name: this.imageName
        }
    }
}