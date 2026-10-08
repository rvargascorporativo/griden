function closeMobileMenu() {
 const button = document.querySelector('.menu-button');
 if (button.getAttribute('aria-expanded') === 'true') button.click();
}
    function openAuth() {
      document.getElementById("authModal").style.display = "flex";
      clearAuthMessage();
    }

    function closeAuth() {
      document.getElementById("authModal").style.display = "none";
    }

    window.addEventListener("click", function (event) {
      const modal = document.getElementById("authModal");
      if (event.target === modal) {
        closeAuth();
      }
    });

    function showAuthMessage(message, isError = false) {
      const box = document.getElementById("authMessage");
      box.textContent = message;
      box.style.color = isError ? "#dc2626" : "#16a34a";
    }

    function clearAuthMessage() {
      document.getElementById("authMessage").textContent = "";
    }

    function clearAuthFields() {
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    }

    const firebaseConfig = {
      apiKey: "AIzaSyD5yoe5bl_u4AD4UT2aJmA3rQk86KKVJWo",
      authDomain: "gridenbolivia.firebaseapp.com",
      projectId: "gridenbolivia",
      storageBucket: "gridenbolivia.firebasestorage.app",
      messagingSenderId: "829778703180",
      appId: "1:829778703180:web:ca74494f370e6777dd55e9",
      measurementId: "G-4S77MHBCQ5"
    };

    const auth = typeof firebase !== 'undefined' ? (firebase.apps.length ? firebase.auth() : firebase.initializeApp(firebaseConfig).auth()) : null;

    function register() {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        showAuthMessage("Completa correo y contraseña.", true);
        return;
      }

      if (!auth) { showAuthMessage("No se pudo conectar. Recarga la página e intenta de nuevo.", true); return; }
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          showAuthMessage("Usuario creado correctamente.");
          clearAuthFields();
          setTimeout(() => closeAuth(), 900);
        })
        .catch((e) => {
          showAuthMessage("Firebase: " + e.message, true);
        });
    }

    function login() {
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        showAuthMessage("Completa correo y contraseña.", true);
        return;
      }

      if (!auth) { showAuthMessage("No se pudo conectar. Recarga la página e intenta de nuevo.", true); return; }
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          showAuthMessage("Sesión iniciada correctamente.");
          clearAuthFields();
          setTimeout(() => closeAuth(), 900);
        })
        .catch((e) => {
          showAuthMessage("Firebase: " + e.message, true);
        });
    }

    function logout() {
      if (!auth) return;
      auth.signOut()
        .then(() => {
          closeAuth();
          closeMobileMenu();
        })
        .catch((e) => {
          showAuthMessage("Firebase: " + e.message, true);
        });
    }

    if (auth) auth.onAuthStateChanged((user) => {
      const authNavLink = document.getElementById("authNavLink");
      const logoutLink = document.getElementById("logoutLink");
      const mobileAuthLink = document.getElementById("mobileAuthLink");
      const mobileLogoutLink = document.getElementById("mobileLogoutLink");

      if (user) {
        const email = user.email || "Usuario";
        const nombreCorto = email.split("@")[0];
        const textoUsuario = "Hola, " + nombreCorto;

        authNavLink.textContent = textoUsuario;
        mobileAuthLink.textContent = textoUsuario;

        authNavLink.onclick = function () { openAuth(); };
        mobileAuthLink.onclick = function () { openAuth(); closeMobileMenu(); };

        logoutLink.style.display = "inline-block";
        mobileLogoutLink.style.display = "block";
      } else {
        authNavLink.textContent = "Mi cuenta";
        mobileAuthLink.textContent = "Mi cuenta";

        authNavLink.onclick = function () { openAuth(); };
        mobileAuthLink.onclick = function () { openAuth(); closeMobileMenu(); };

        logoutLink.style.display = "none";
        mobileLogoutLink.style.display = "none";
      }
    });


document.addEventListener('keydown', event => { if(event.key === 'Escape') closeAuth(); });
