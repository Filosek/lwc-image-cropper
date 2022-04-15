# LWC Image Cropper
This component is a LWC adaptation of [Croppr.js made by James Ooi](https://github.com/jamesssooi/Croppr.js) with simple file upload functionality.
Croppr.js version used here is modified (fixed condition racing when using larger images) and available as a forked repo [here](https://github.com/Filosek/Croppr.js)

![ImageCropperDemo](https://user-images.githubusercontent.com/33665058/163501568-e9b41e83-a0e9-4d31-ae48-599bcd018edb.gif)

## Record Page
Configurable properties for Record Page Builder:
- Aspect ratio - Constrain the crop region to an aspect ratio.
- Max crop width - Constrain the crop region maximum width to provided value (px).
- Max crop height - Constrain the crop region maximum height to provided value (px).
- Min crop width - Constrain the crop region minimum width to provided value (px).
- Min crop height - Constrain the crop region minimum height to provided value (px).

## Experience Builder
Configurable properties for Experience Builder:
- Record Id - Defaults to `{!recordId}` to provide record Id from experience site context.
- Aspect ratio - Constrain the crop region to an aspect ratio.
- Max crop width - Constrain the crop region maximum width to provided value (px).
- Max crop height - Constrain the crop region maximum height to provided value (px).
- Min crop width - Constrain the crop region minimum width to provided value (px).
- Min crop height - Constrain the crop region minimum height to provided value (px).

Copyright © 2022 Filip Osiński.
Released under the MIT License.
