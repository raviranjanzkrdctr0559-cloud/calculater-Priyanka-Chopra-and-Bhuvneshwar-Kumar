window.addEventListener("load", async () => {

    await openDatabase();

    loadRecycle();

});

document.getElementById("backBtn").onclick = () => {

    location.href = "vault.html";

};

function loadRecycle(){

    const gallery = document.getElementById("recycleGallery");

    gallery.innerHTML = "";

    const tx = db.transaction("files","readonly");

    const store = tx.objectStore("files");

    const request = store.getAll();

    request.onsuccess = () => {

        const deletedPhotos = request.result.filter(file =>

            file.type === "photo" && file.deleted

        );

        if(deletedPhotos.length === 0){

            gallery.innerHTML = "<p>No Deleted Photos</p>";

            return;

        }

        deletedPhotos.forEach(photo => {

            const box = document.createElement("div");

            box.className = "photo-box";

            const img = document.createElement("img");

            img.src = photo.data;

            img.className = "photo-thumb";

            const restoreBtn = document.createElement("button");

            restoreBtn.innerHTML = "♻️";

            restoreBtn.className = "delete-btn";

            restoreBtn.onclick = () => restorePhoto(photo.id);

            box.appendChild(img);
            box.appendChild(restoreBtn);

            gallery.appendChild(box);

        });

    };

}

function restorePhoto(id){

    const tx = db.transaction("files","readwrite");

    const store = tx.objectStore("files");

    const request = store.get(id);

    request.onsuccess = () => {

        const data = request.result;

        data.deleted = false;

        store.put(data);

        tx.oncomplete = () => {

            loadRecycle();

        };

    };

}
