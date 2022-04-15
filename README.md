# LWC Image Cropper
This component is a LWC adaptation of [Croppr.js made by James Ooi](https://github.com/jamesssooi/Croppr.js) with simple file upload functionality.
Croppr.js version used here is modified (fixed condition racing when using larger images) and available as a forked repo [here](https://github.com/Filosek/Croppr.js)

![ImageCropperDemo](https://user-images.githubusercontent.com/33665058/163501568-e9b41e83-a0e9-4d31-ae48-599bcd018edb.gif)

## Custom Labels
Custom Labels used in component:
**ImageCropperBrokenFileAltText - Showed when uploaded file is broken**

![image](https://user-images.githubusercontent.com/33665058/163509255-aa077868-1aad-499b-9fd5-5f14f223674d.png)

**ImageCropperButtonLabel - Label showed on button that is capable of croping and uploading an image**

![image](https://user-images.githubusercontent.com/33665058/163508190-e67579d9-cbc3-415f-811d-dc942bc841c9.png)

**ImageCropperErrorTitle - Title of error toast**

![image](https://user-images.githubusercontent.com/33665058/163509143-6f8a22c8-ec9e-496d-b4c1-4de197862935.png)

**ImageCropperLabel - Label displayed over upload button**

![image](https://user-images.githubusercontent.com/33665058/163508663-72fec924-4378-4556-ab7a-8a22b5ddec40.png)

**ImageCropperSuccessTitle - Toast title when upload succeeded**

![image](https://user-images.githubusercontent.com/33665058/163508566-57626233-7e02-4bfd-bb5f-628236d9fa59.png)

**ImageCropperUploadSuccessMessage - Toast message when upload succeeded**

![image](https://user-images.githubusercontent.com/33665058/163508596-48010197-6a1b-4ecb-8364-08462073d06d.png)

## Record Page properties
Configurable properties for Record Page Builder:
- Aspect ratio - Constrain the crop region to an aspect ratio.
- Max crop width - Constrain the crop region maximum width to provided value (px).
- Max crop height - Constrain the crop region maximum height to provided value (px).
- Min crop width - Constrain the crop region minimum width to provided value (px).
- Min crop height - Constrain the crop region minimum height to provided value (px).

## Experience Builder properties
Configurable properties for Experience Builder:
- Record Id - Defaults to `{!recordId}` to provide record Id from experience site context.
- Aspect ratio - Constrain the crop region to an aspect ratio.
- Max crop width - Constrain the crop region maximum width to provided value (px).
- Max crop height - Constrain the crop region maximum height to provided value (px).
- Min crop width - Constrain the crop region minimum width to provided value (px).
- Min crop height - Constrain the crop region minimum height to provided value (px).
&nbsp;

&nbsp;

**Copyright © 2022 Filip Osiński.** Released under the MIT License.
