// ==========================
// Private Vault V3.1
// ==========================

// Logout
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    if(confirm("Lock Vault?")){

        window.location.href = "../index.html";

    }

});

// Cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        const id = card.id;

        switch(id){

            case "photos":
                alert("📷 Photos Module (Coming Next)");
                break;

            case "videos":
                alert("🎥 Videos Module (Coming Next)");
                break;

            case "documents":
                alert("📄 Documents Module (Coming Next)");
                break;

            case "folders":
                alert("📁 Folder System (Coming Next)");
                break;

            case "favorites":
                alert("⭐ Favorites (Coming Next)");
                break;

            case "recycle":
                alert("🗑️ Recycle Bin (Coming Next)");
                break;

        }

    });

});
