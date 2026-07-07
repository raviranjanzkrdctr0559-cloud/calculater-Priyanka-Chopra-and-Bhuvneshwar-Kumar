const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");
const search = document.getElementById("search");

let files = JSON.parse(localStorage.getItem("vaultFiles")) || [];

renderFiles();

fileInput.addEventListener("change", function () {

    const selectedFiles = [...this.files];

    selectedFiles.forEach(file => {

        files.push({
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            size: file.size,
            favorite: false,
            deleted: false
        });

    });

    saveFiles();
    renderFiles();

    this.value = "";

});

search.addEventListener("input", renderFiles);

function saveFiles(){

    localStorage.setItem("vaultFiles", JSON.stringify(files));

}

function renderFiles(){

    fileList.innerHTML = "";

    let keyword = search.value.toLowerCase();

    files
    .filter(file => !file.deleted)
    .filter(file => file.name.toLowerCase().includes(keyword))
    .forEach(file => {

        let icon = "📄";

        if(file.type.startsWith("image")) icon = "🖼️";
        else if(file.type.startsWith("video")) icon = "🎥";

        const div = document.createElement("div");

        div.className = "file-item";

        div.innerHTML = `
            <div>
                ${icon} ${file.name}
            </div>

            <div>

                <button onclick="toggleFavorite('${file.id}')">
                    ${file.favorite ? "⭐" : "☆"}
                </button>

                <button onclick="deleteFile('${file.id}')">
                    🗑️
                </button>

            </div>
        `;

        fileList.appendChild(div);

    });

}

function toggleFavorite(id){

    files = files.map(file => {

        if(file.id == id){

            file.favorite = !file.favorite;

        }

        return file;

    });

    saveFiles();

    renderFiles();

}

function deleteFile(id){

    files = files.map(file => {

        if(file.id == id){

            file.deleted = true;

        }

        return file;

    });

    saveFiles();

    renderFiles();

}
