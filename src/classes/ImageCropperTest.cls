@IsTest
private class ImageCropperTest {
    private static final String BLOB_STRING = 'CropperTest';

    @TestSetup
    private static void prepareTestData() {
        Contact contact = new Contact(
            FirstName = 'Test',
            LastName = 'Contact'
        );
        insert contact;
    }

    @IsTest
    private static void uploadCroppedImageTest() {
        Contact contact = [SELECT Id FROM Contact LIMIT 1];
        Blob testBlob = Blob.valueOf(BLOB_STRING);
        String testBlobB64 = EncodingUtil.base64Encode(testBlob);
        String testFileName = 'TestFile.jpg';

        Test.startTest();
        ImageCropper.uploadCroppedImage(testFileName, testBlobB64, contact.Id);
        Test.stopTest();

        ContentDocumentLink contentDocumentLink = [SELECT LinkedEntityId FROM ContentDocumentLink WHERE LinkedEntityId = :contact.Id];

        System.assertEquals(contact.Id, contentDocumentLink.LinkedEntityId);
    }
}