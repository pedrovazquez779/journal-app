import {v2 as cloudinary} from 'cloudinary';
import {fileUpload} from '../../src/helpers';
import {cloudinaryConfig} from './cloudinary-config';

cloudinary.config(cloudinaryConfig);

describe('fileUpload tests', () => {
    test('should upload the image to cloudinary', async () => {

        const imageUrl = 'https://pbs.twimg.com/profile_images/640666088271839233/OTKlt5pC_400x400.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'test_photo.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        // Clear image in cloudinary
        await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image',
        });
    });

    test('should return null', async () => {
        const file = new File([], 'test_photo.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});