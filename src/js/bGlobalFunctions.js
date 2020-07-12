/**
 * Inserta en html un elemento template previamente establecido
 * 
 * @param {string} template - ID del template que va a ser insertado
 * @param {string} insertInto - Elemento en el que será insertado el template
 * @param {boolean} replace - Si se define en true, no quita los hijos existentes. Por defecto en false
 */
const insertForm = (template, insertInto, replace = false) => {

    const templateForm = document.getElementById(template);
    const insertIn = document.getElementById(insertInto);

    if (templateForm && insertIn) {

        const form = document.importNode(templateForm.content, true);

        if (replace) {
            insertIn.textContent = ''
        }
        insertIn.appendChild(form)
    }
}

/**
 * Asigna una clase css a "elem", pasado el tiempo asignado, la quita
 * 
 * @param {HTMLElemt} elem - Elemento al que se le quiere asignar la alerta
 * @param {string} attr - Clase de css que se le debe asignar
 * @param {number} timeout - El tiempo que debe pasar antes que la clase css que se asignó, se quite
 */
const alertEmptyField = (elem, attr, timeout) => {

    elem.classList.add(attr)

    setTimeout(() => {

        elem.classList.remove(attr)

    }, timeout);
}

/**
 * A modo de alerta, cambia el placeholder del input
 * Asignando como valor una ayuda visual de lo que necesita hacer.
 * Pasado el tiempo asignado la quita
 * 
 * @param {HTMLElement} elem - Input que se le quiere cambiar el placeholder
 * @param {string} newContent - Lo que se le quiere asignar como nuevo valor
 * @param {string} returnTo - El texto que se mostrará después de pasado el tiempo asignado
 * @param {number} timeout - El tiempo que pasará antes que se muestre el texto final
 */
const changePlaceholderValue = (elem, newContent, returnTo, timeout) => {

    elem.placeholder = newContent

    setTimeout(() => {

        elem.placeholder = returnTo

    }, timeout);
}

const redirect = () => {

    if (isLogin) {

        urlPage.replace(`${urlPage.origin}/login/`)

    } else if (!isLogin) {

        urlPage.replace(`${urlPage.origin}/`)
    }
}