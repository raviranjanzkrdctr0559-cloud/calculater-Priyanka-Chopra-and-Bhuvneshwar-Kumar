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
async function loadPhotos(){

    const gallery = document.getElementById("photoGallery");

    const files = await getAllFiles();

    const photos = files.filter(file => file.type === "photo");

    gallery.innerHTML = "";

    if(photos.length===0){

        gallery.innerHTML="<p>No Photos Yet</p>";

        return;

    }

    photos.forEach(photo=>{

        const url = URL.createObjectURL(photo.blob);

        const card = document.createElement("div");

        card.className="photo-card";

        card.innerHTML=`

            <img src="${url}">

            <div class="photo-name">

                ${photo.name}

            </div>

        `;

        gallery.appendChild(card);

    });

}
