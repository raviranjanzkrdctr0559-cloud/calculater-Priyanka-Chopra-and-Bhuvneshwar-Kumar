// ============================
// Private Vault Database
// IndexedDB
// ============================

const DB_NAME = "PrivateVaultDB";
const DB_VERSION = 1;
const STORE_NAME = "files";

let db = null;

// Open Database
function openDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {

            db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true
                });

                store.createIndex("type", "type", { unique: false });
                store.createIndex("favorite", "favorite", { unique: false });
                store.createIndex("folder", "folder", { unique: false });

            }

        };

        request.onsuccess = function () {

            db = request.result;
            resolve(db);

        };

        request.onerror = function () {

            reject("Database Open Failed");

        };

    });

}

// Save File
function saveFile(data) {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        const request = store.add(data);

        request.onsuccess = () => resolve();

        request.onerror = () => reject();

    });

}

// Get All Files
function getAllFiles() {

    return new Promise((resolve) => {

        const tx = db.transaction(STORE_NAME, "readonly");

        const store = tx.objectStore(STORE_NAME);

        const request = store.getAll();

        request.onsuccess = () => {

            resolve(request.result);

        };

    });

}

// Delete File
function deleteFile(id) {

    return new Promise((resolve) => {

        const tx = db.transaction(STORE_NAME, "readwrite");

        const store = tx.objectStore(STORE_NAME);

        store.delete(id);

        tx.oncomplete = () => resolve();

    });

}
