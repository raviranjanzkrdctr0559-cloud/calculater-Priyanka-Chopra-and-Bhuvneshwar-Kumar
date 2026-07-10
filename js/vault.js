// ============================
// Private Vault V3
// ============================

window.addEventListener("load", async () => {

    // Database Open
    await openDatabase();

    console.log("Database Ready");
loadPhotos();
});

// ----------------------------
// Logout
// ----------------------------

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    if(confirm("Lock Vault?")){

      location.href="index.html";

    }

});

// ----------------------------
// Photo Upload
// ----------------------------

const photoPicker = document.getElementById("photoPicker");

const photosCard = document.getElementById("photos");

photosCard.addEventListener("click",()=>{

    photoPicker.click();

});

photoPicker.addEventListener("change",async()=>{

    const file = photoPicker.files[0];

    if(!file) return;

    await uploadPhoto(file);

    photoPicker.value="";

});

// ----------------------------
// Coming Soon Modules
// ----------------------------

document.getElementById("videos").onclick=()=>{

    alert("🎥 Videos Module Coming Next");

};

document.getElementById("documents").onclick=()=>{

    alert("📄 Documents Module Coming Next");

};

document.getElementById("folders").onclick=()=>{

    alert("📁 Folder System Coming Next");

};

document.getElementById("favorites").onclick=()=>{

    alert("⭐ Favorites Coming Next");

};

document.getElementById("recycle").onclick=()=>{

    alert("🗑️ Recycle Bin Coming Next");

};
