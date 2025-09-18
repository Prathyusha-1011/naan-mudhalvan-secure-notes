// Load saved encrypted note on startup
let encryptedNote = localStorage.getItem("secureNote") || "";

function encryptNote() {
  const note = document.getElementById("note").value;
  const password = document.getElementById("password").value;

  if (!note || !password) {
    alert("Please enter a note and password!");
    return;
  }

  encryptedNote = CryptoJS.AES.encrypt(note, password).toString();
  localStorage.setItem("secureNote", encryptedNote);

  document.getElementById("output").innerText = "✅ Note Encrypted & Saved!";
  document.getElementById("note").value = "";
}

function decryptNote() {
  const password = document.getElementById("password").value;

  if (!encryptedNote) {
    alert("No saved note found!");
    return;
  }
  if (!password) {
    alert("Enter password to decrypt!");
    return;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedNote, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) throw new Error("Wrong password");

    document.getElementById("output").innerText = "🔓 Decrypted Note: " + decrypted;
  } catch (err) {
    alert("❌ Incorrect password!");
  }
}

function clearNotes() {
  localStorage.removeItem("secureNote");
  encryptedNote = "";
  document.getElementById("output").innerText = "🗑️ Notes cleared.";
}
