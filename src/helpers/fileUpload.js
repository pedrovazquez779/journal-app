export const fileUpload = async (file) => {
    // if (!file) throw new Error('file is null');
    if (!file) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dteo1wkjz/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('file Upload failed');

        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    } catch (e) {
        // console.log(e);
        // throw new Error(e.message);
        return null;
    }
};