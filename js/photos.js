async function uploadPhoto(file){

    const reader = new FileReader();

    reader.onload = async function(e){

        const photo = {
    name: file.name,
    data: e.target.result,
    type: "photo",
    favorite: false,
    folder: "Photos"
};

        const tx = db.transaction("files","readwrite");
       const store = tx.objectStore("files");

        store.add(photo);

        tx.oncomplete = () => {

            loadPhotos();

        };

    };

    reader.readAsDataURL(file);

}

function loadPhotos(){

    const gallery = document.getElementById("photoGallery");

    gallery.innerHTML = "";

    const tx = db.transaction("files","readonly");
   const store = tx.objectStore("files");

    const request = store.getAll();

    request.onsuccess = ()=>{

       const photos = request.result.filter(file => file.type === "photo");

        if(photos.length===0){

            gallery.innerHTML="<p>No Photos Yet</p>";

            return;

        }

        photos.forEach(photo=>{

            const img=document.createElement("img");

            img.src=photo.data;

            img.className="photo-thumb";
img.onclick = () => {

    const modal = document.getElementById("previewModal");
    const image = document.getElementById("previewImage");

    image.src = photo.data;
    modal.style.display = "flex";

};
            gallery.appendChild(img);

        });

    };

}
window.addEventListener("load", () => {

    const closeBtn = document.getElementById("closePreview");

    if(closeBtn){

        closeBtn.onclick = () => {

            document.getElementById("previewModal").style.display = "none";

        };

    }

});
