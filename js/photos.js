async function uploadPhoto(file){

    const reader = new FileReader();

    reader.onload = async function(e){

        const photo = {
            id: Date.now(),
            name: file.name,
            data: e.target.result
        };

        const tx = db.transaction("photos","readwrite");
        const store = tx.objectStore("photos");

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

    const tx = db.transaction("photos","readonly");
    const store = tx.objectStore("photos");

    const request = store.getAll();

    request.onsuccess = ()=>{

        const photos = request.result;

        if(photos.length===0){

            gallery.innerHTML="<p>No Photos Yet</p>";

            return;

        }

        photos.forEach(photo=>{

            const img=document.createElement("img");

            img.src=photo.data;

            img.className="photo-thumb";

            gallery.appendChild(img);

        });

    };

}
