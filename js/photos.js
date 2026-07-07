// ===============================
// Photo Upload Module
// ===============================

async function uploadPhoto(file){

    if(!file) return;

    await saveFile({

        name: file.name,

        type: "photo",

        folder: "Photos",

        favorite: false,

        deleted: false,

        date: Date.now(),

        blob: file

    });

    alert("📷 Photo Saved Successfully");

}
