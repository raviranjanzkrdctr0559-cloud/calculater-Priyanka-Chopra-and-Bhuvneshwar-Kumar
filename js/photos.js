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

    document.getElementById("previewModal").style.display = "flex";

    document.getElementById("previewImage").src = photo.data;

};
            gallery.appendChild(img);

        });

    };

}
document.getElementById("closePreview").onclick = () => {

    document.getElementById("previewModal").style.display = "none";

};
