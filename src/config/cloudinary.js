import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

const upload = (file, folder="Monza") => {
    return new Promise((resolve, reject) => {
        try{
            cloudinary.v2.uploader.upload(file, { folder })
                .then(response=> resolve(response) )
        }
        catch(err){ reject({
            err,
            msg:"Ocurrio un error durante la subida de una imagen"
        }) }
    }) 
}

export default {
    upload
}