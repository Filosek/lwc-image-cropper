import {LightningElement, api} from 'lwc';
import {loadScript, loadStyle} from 'lightning/platformResourceLoader';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import cropprResource from '@salesforce/resourceUrl/croppr';
import imageUploader from '@salesforce/apex/ImageCropper.uploadCroppedImage';

import IMAGE_CROPPER_BROKEN_FILE_ALT_TEXT from '@salesforce/label/c.ImageCropperBrokenFileAltText';
import IMAGE_CROPPER_BUTTON_LABEL from '@salesforce/label/c.ImageCropperButtonLabel';
import IMAGE_CROPPER_ERROR_TITLE from '@salesforce/label/c.ImageCropperErrorTitle';
import IMAGE_CROPPER_LABEL from '@salesforce/label/c.ImageCropperLabel';
import IMAGE_CROPPER_SUCCESS_TITLE from '@salesforce/label/c.ImageCropperSuccessTitle';
import IMAGE_CROPPER_UPLOAD_SUCCESS_MESSAGE from '@salesforce/label/c.ImageCropperUploadSuccessMessage';

export default class ImageCropper extends LightningElement {
    LABELS = {
        IMAGE_CROPPER_BROKEN_FILE_ALT_TEXT,
        IMAGE_CROPPER_BUTTON_LABEL,
        IMAGE_CROPPER_ERROR_TITLE,
        IMAGE_CROPPER_LABEL,
        IMAGE_CROPPER_SUCCESS_TITLE,
        IMAGE_CROPPER_UPLOAD_SUCCESS_MESSAGE
    }

    cropprCssUrl = `${cropprResource}/croppr.min.css`;
    cropprJsUrl = `${cropprResource}/croppr.min.js`;
    imageCroppr = {};
    isCropprLoaded = false;
    cropprOptions = {};
    cropprInitialized = false;

    imageElement;
    imageMimeType = '';
    imageName = '';

    croppedImageDataUrl = '';

    @api aspectRatio = null;
    @api maxCropWidth = 0;
    @api maxCropHeight = 0;
    @api minCropWidth = 0;
    @api minCropHeight = 0;
    @api recordId = '';

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
                        title: this.LABELS.IMAGE_CROPPER_ERROR_TITLE,
                        message: error.message,
                        variant: 'error'
                    })
                );
            });
    }

    prepareOptions() {
        let options = {startSize: [100, 100, '%']};
        if (this.maxCropHeight && this.maxCropWidth) {
            options.maxSize = [this.maxCropWidth, this.maxCropHeight, 'px'];
        }
        if (this.minCropHeight && this.minCropWidth) {
            options.minSize = [this.minCropWidth, this.minCropHeight, 'px'];
        }
        if (this.aspectRatio && !isNaN(this.aspectRatio)) {
            options.aspectRatio = Number(this.aspectRatio);
        }
        options.onInitialize = () => {
            this.cropprInitialized = true;
        }
        return options;
    }

    handleFileChange(event) {
        if (this.cropprInitialized) {
            this.imageCroppr.destroy();
            this.cropprInitialized = false;
        }
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
        canvas.height = croppedData.height;
        canvas.width = croppedData.width;
        let context = canvas.getContext('2d');
        context.drawImage(this.imageElement, croppedData.x, croppedData.y, croppedData.width, croppedData.height, 0, 0, croppedData.width, croppedData.height);
        this.croppedImageDataUrl = canvas.toDataURL(this.imageMimeType).split(';base64,')[1];
        this.uploadFile();
    }

    uploadFile() {
        imageUploader({fileName: this.imageName, imageBase64: this.croppedImageDataUrl, recordId: this.recordId})
            .then(() => {
                eval("$A.get('e.force:refreshView').fire();");
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: this.LABELS.IMAGE_CROPPER_SUCCESS_TITLE,
                        message: this.LABELS.IMAGE_CROPPER_UPLOAD_SUCCESS_MESSAGE,
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: this.LABELS.IMAGE_CROPPER_ERROR_TITLE,
                        message: error.message,
                        variant: 'error'
                    })
                );
            })
    }
}