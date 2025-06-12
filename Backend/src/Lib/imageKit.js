import {config} from 'dotenv';
import ImageKit from 'imagekit';

config();
const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

const url = imageKit.url({
    path: "/sample-image.jpg",
    transformation: [{ width: 300, format: "webp" }]
});

console.log(url);