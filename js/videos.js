
(() => {
    window.addEventListener("load", () => {
        const videosCard = document.getElementById("videos");
        const photoGallery = document.getElementById("photoGallery");

        if (!videosCard) return;

        // Separate video section
        const panel = document.createElement("section");
        panel.id = "videoModule";
        panel.hidden = true;
        panel.style.cssText =
            "margin:20px;padding:16px;border:1px solid #888;" +
            "border-radius:12px;";

        const heading = document.createElement("h2");
        heading.textContent = "🎥 My Videos";

        const picker = document.createElement("input");
        picker.type = "file";
        picker.accept = "video/*";
        picker.hidden = true;

        const uploadButton = document.createElement("button");
        uploadButton.textContent = "＋ Upload Video";
        uploadButton.type = "button";
        uploadButton.style.cssText =
            "padding:10px 16px;margin:8px 0;cursor:pointer;";

        const status = document.createElement("p");

        const gallery = document.createElement("div");
        gallery.style.cssText =
            "display:grid;grid-template-columns:" +
            "repeat(auto-fill,minmax(220px,1fr));gap:12px;";

        panel.append(heading, uploadButton, picker, status, gallery);

        if (photoGallery) {
            photoGallery.insertAdjacentElement("afterend", panel);
        } else {
            document.body.appendChild(panel);
        }

        const objectURLs = [];

        function clearGallery() {
            objectURLs.forEach(url => URL.revokeObjectURL(url));
            objectURLs.length = 0;
            gallery.replaceChildren();
        }

        async function ensureDatabase() {
            if (!db) await openDatabase();
        }

        function loadVideos() {
            return new Promise(async (resolve, reject) => {
                try {
                    await ensureDatabase();

                    const tx = db.transaction("files", "readonly");
                    const request = tx.objectStore("files").getAll();

                    request.onsuccess = () => {
                        clearGallery();

                        const videos = request.result
                            .filter(item =>
                                item.type === "video" && !item.deleted
                            )
                            .sort((a, b) => (b.id || 0) - (a.id || 0));

                        if (videos.length === 0) {
                            gallery.textContent = "No Videos Yet";
                        }

                        videos.forEach(item => {
                            const box = document.createElement("div");
                            box.style.cssText =
                                "padding:10px;border:1px solid #aaa;" +
                                "border-radius:10px;";

                            const name = document.createElement("p");
                            name.textContent = item.name;

                            const player = document.createElement("video");
                            player.controls = true;
                            player.preload = "metadata";
                            player.playsInline = true;
                            player.style.width = "100%";
                            player.style.maxWidth = "420px";

                            if (item.data instanceof Blob) {
                                const url = URL.createObjectURL(item.data);
                                objectURLs.push(url);
                                player.src = url;
                            } else if (typeof item.data === "string") {
                                player.src = item.data;
                            } else {
                                return;
                            }

                            
const deleteButton = document.createElement("button");
deleteButton.type = "button";
deleteButton.textContent = "🗑️ Delete";
deleteButton.style.cssText =
    "padding:8px 14px;margin-top:8px;cursor:pointer;";

deleteButton.onclick = async () => {
    if (!confirm("Move this video to Recycle Bin?")) return;

    deleteButton.disabled = true;

    try {
        await new Promise((resolve, reject) => {
            const tx = db.transaction("files", "readwrite");
            const store = tx.objectStore("files");

            const request = store.get(item.id);

            request.onsuccess = () => {
                const savedVideo = request.result;

                if (!savedVideo || savedVideo.type !== "video") {
                    reject(new Error("Video not found"));
                    return;
                }

                // Keep the video data; only mark it deleted.
                savedVideo.deleted = true;
                store.put(savedVideo);
            };

            request.onerror = () => reject(request.error);
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error);
            tx.onabort = () => reject(tx.error);
        });

        status.textContent = "Video moved to Recycle Bin.";
        await loadVideos();

    } catch (error) {
        console.error("Video delete error:", error);
        alert("Video delete nahi hua. Dobara try karo.");
        deleteButton.disabled = false;
    }
};

box.append(name, player, deleteButton);

                            gallery.appendChild(box);
                        });

                        resolve();
                    };

                    request.onerror = () =>
                        reject(request.error || new Error("Videos load failed"));

                    tx.onerror = () =>
                        reject(tx.error || new Error("Database read failed"));

                } catch (error) {
                    reject(error);
                }
            });
        }

        async function uploadVideo(file) {
            if (!file) return;

            const knownVideo =
                file.type.startsWith("video/") ||
                /\.(mp4|webm|mov|m4v|avi|mkv|3gp)$/i.test(file.name);

            if (!knownVideo) {
                alert("Please select a video file.");
                return;
            }

            uploadButton.disabled = true;
            status.textContent = "Saving video...";

            try {
                await ensureDatabase();

                await new Promise((resolve, reject) => {
                    const tx = db.transaction("files", "readwrite");
                    const store = tx.objectStore("files");

                    store.add({
                        name: file.name,
                        data: file,
                        type: "video",
                        favorite: false,
                        folder: "Videos",
                        deleted: false
                    });

                    tx.oncomplete = resolve;
                    tx.onerror = () =>
                        reject(tx.error || new Error("Video save failed"));
                    tx.onabort = () =>
                        reject(tx.error || new Error("Video save aborted"));
                });

                status.textContent = "Video saved successfully!";
                await loadVideos();

            } catch (error) {
                console.error("Video upload error:", error);
                status.textContent =
                    "Video save nahi hua. Storage space check karo.";
                alert("Video save nahi hua. Purani photos ko delete mat karna.");

            } finally {
                picker.value = "";
                uploadButton.disabled = false;
            }
        }

        uploadButton.addEventListener("click", () => picker.click());

        picker.addEventListener("change", () => {
            uploadVideo(picker.files[0]);
        });

        // Replace only the Videos card's Coming Soon action.
        videosCard.onclick = async () => {
            panel.hidden = !panel.hidden;

            if (!panel.hidden) {
                status.textContent = "Loading videos...";
                try {
                    await loadVideos();
                    status.textContent = "";
                } catch (error) {
                    console.error(error);
                    status.textContent = "Videos load nahi ho paaye.";
                }
            }
        };
    });
})();
