document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    const terminos = document.getElementById("terminos");
    const modalButton = document.querySelector("[data-bs-target='#modalTerminos']");
    const terminosText = document.createElement("span");
    const successMessage = document.getElementById("successMessage");

    terminosText.classList.add("text-danger", "ms-2");
    modalButton.parentElement.appendChild(terminosText);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        event.stopPropagation();

        let valid = true;

        // Ocultar el mensaje de éxito si ya se mostró antes
        successMessage.style.display = "none";

        // Validar campo "Nombre"
        if (nombre.value.trim() === "") {
            nombre.setCustomValidity("El campo nombre es obligatorio.");
            nombre.classList.add("is-invalid");
            valid = false;
        } else {
            nombre.setCustomValidity("");
            nombre.classList.remove("is-invalid");
            nombre.classList.add("is-valid");
        }

        // Validar campo "Apellido"
        if (apellido.value.trim() === "") {
            apellido.setCustomValidity("El campo apellido es obligatorio.");
            apellido.classList.add("is-invalid");
            valid = false;
        } else {
            apellido.setCustomValidity("");
            apellido.classList.remove("is-invalid");
            apellido.classList.add("is-valid");
        }

        // Validar formato de email
        if (!email.validity.valid) {
            email.setCustomValidity("El email no es válido.");
            email.classList.add("is-invalid");
            valid = false;
        } else {
            email.setCustomValidity("");
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
        }

        // Validar contraseña (mínimo 6 caracteres)
        if (password1.value.length < 6) {
            password1.setCustomValidity("La contraseña debe tener al menos 6 caracteres.");
            password1.classList.add("is-invalid");
            valid = false;
        } else {
            password1.setCustomValidity("");
            password1.classList.remove("is-invalid");
            password1.classList.add("is-valid");
        }

        // Validar que las contraseñas coincidan
        if (password1.value !== password2.value) {
            password2.setCustomValidity("Las contraseñas no coinciden.");
            password2.classList.add("is-invalid");
            valid = false;
        } else {
            password2.setCustomValidity("");
            password2.classList.remove("is-invalid");
            password2.classList.add("is-valid");
        }

        // Validar términos y condiciones
        if (!terminos.checked) {
            terminos.setCustomValidity("Debes aceptar los términos.");
            terminosText.textContent = "No has aceptado los términos.";
            terminos.classList.add("is-invalid");
            valid = false;
        } else {
            terminos.setCustomValidity("");
            terminosText.textContent = "";
            terminos.classList.remove("is-invalid");
            terminos.classList.add("is-valid");
        }

        // Si todo es válido, mostrar mensaje de éxito
        if (valid) {
            successMessage.style.display = "block";
            form.reset();  // Reinicia el formulario después de un registro exitoso
            form.querySelectorAll(".is-valid").forEach(function (input) {
                input.classList.remove("is-valid"); // Remover validaciones visuales previas
            });
        }
    });

    // Validación en tiempo real de la contraseña
    password1.addEventListener("input", function () {
        // Validar longitud mínima
        if (password1.value.length >= 6) {
            document.getElementById("minLength").classList.remove("text-danger");
            document.getElementById("minLength").classList.add("text-success");
        } else {
            document.getElementById("minLength").classList.remove("text-success");
            document.getElementById("minLength").classList.add("text-danger");
        }

        // Validar que las contraseñas coincidan
        if (password1.value === password2.value) {
            document.getElementById("passwordsMatch").classList.remove("text-danger");
            document.getElementById("passwordsMatch").classList.add("text-success");
        } else {
            document.getElementById("passwordsMatch").classList.remove("text-success");
            document.getElementById("passwordsMatch").classList.add("text-danger");
        }
    });

    password2.addEventListener("input", function () {
        // Validar que las contraseñas coincidan en tiempo real
        if (password1.value === password2.value) {
            document.getElementById("passwordsMatch").classList.remove("text-danger");
            document.getElementById("passwordsMatch").classList.add("text-success");
            password2.classList.remove("is-invalid");
            password2.classList.add("is-valid");
        } else {
            document.getElementById("passwordsMatch").classList.remove("text-success");
            document.getElementById("passwordsMatch").classList.add("text-danger");
            password2.classList.add("is-invalid");
            password2.classList.remove("is-valid");
        }
    });
});
