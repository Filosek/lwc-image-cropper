public with sharing class ImageCropper {
    @AuraEnabled
    public static void uploadCroppedImage(String fileName, String imageBase64, Id recordId) {
        Blob image = EncodingUtil.base64Decode(imageBase64);

        ContentVersion contentVersion = new ContentVersion(
            Title = fileName,
            PathOnClient = fileName,
            VersionData = image,
            Origin = 'C'
        );

        insert contentVersion;

        contentVersion = [SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE Id = :contentVersion.Id];

        ContentDocumentLink contentDocumentLink = new ContentDocumentLink(
            LinkedEntityId = recordId,
            ContentDocumentId = contentVersion.ContentDocumentId,
            ShareType = 'I',
            Visibility = 'AllUsers'
        );
        insert contentDocumentLink;
    }
}