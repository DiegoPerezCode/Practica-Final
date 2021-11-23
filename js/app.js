let DB;
// Campos del Formulario
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const adicionalInput = document.querySelector('#adicional');

// Interfaz del Usuario
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let modificando;

window.onload = () => {
    eventListeners();
    crearDB();
}

// Contructor
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
    }

    eliminarReserva(id) {
        this.citas = this.citas.filter( cita => cita.id !== id)
    }

    editarReserva(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }
}

class UI {

    mostrarAlerta(mensaje, tipo) {
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12', 'display-3');

        // Agregar clase en base al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta
        setTimeout ( () => {
            divMensaje.remove();
        }, 2000 );
    }
    mostrarReservas() {

        this.limpiarHTML();
        
        // Leer el contenido de la base de datos
        const objectStore = DB.transaction('citas').objectStore('citas');

        objectStore.openCursor().onsuccess = function(e) {
            
            const cursor = e.target.result;

            if(cursor) {

            const { nombre, apellido, telefono, fecha, hora, adicional, id } = cursor.value;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const nombreParrafo = document.createElement('h2');
            nombreParrafo.classList.add('card-title', 'font-weight-bolder');
            nombreParrafo.textContent = nombre;

            const apellidoParrafo = document.createElement('p');
            apellidoParrafo.innerHTML = `
                <span class="font-weight-bolder">Apellidos: </span> ${apellido}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const adicionalParrafo = document.createElement('p');
            adicionalParrafo.innerHTML = `
                <span class="font-weight-bolder">Adicional: </span> ${adicional}
            `;

            // Boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add( 'btn-danger', 'mx-2');
            btnEliminar.innerHTML = 'Eliminar';

            btnEliminar.onclick = () => eliminarReserva(id);

            // Boton para eliminar esta cita
            const btnModificar = document.createElement('button');
            btnModificar.classList.add( 'btn-info', 'mx-2');
            btnModificar.innerHTML = 'Modificar';
            const cita = cursor.value;
            btnModificar.onclick = () => modificarReserva(cita);

            // Agregar los parrafos a divCita
            divCita.appendChild(nombreParrafo);
            divCita.appendChild(apellidoParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(adicionalParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnModificar);

            // Agregar citas al html 
            contenedorCitas.appendChild(divCita);
            
            // Ve al siguiente elemento
            cursor.continue();

            }
        }
        
    }

    

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild( contenedorCitas.firstChild );
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

// Registrar Eventos
eventListeners();
function eventListeners() {
    nombreInput.addEventListener('change', datosCita);
    apellidoInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change', datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    adicionalInput.addEventListener('change', datosCita);
    formulario.addEventListener('submit', nuevaCita);
}

// Objeto con la informacion de la Cita/Reserva
const citaObj = {
    nombre: '',
    apellido: '',
    telefono: '',
    fecha: '',
    hora: '',
    adicional: ''
}

// Agrega datos al Objeto Cita/Reserva
function datosCita(e) { 
    citaObj[e.target.name] = e.target.value; 

    console.log(citaObj); 
}

// Validar y Agregar una nueva cita  a la clase citas
function nuevaCita(e) {
    // e.preventDefault();

    // Extraer la informacion del objeto Cita
    const { nombre, apellido, telefono, fecha, hora, adicional } = citaObj;

    // Validar
    if( nombre === '' || apellido === '' || telefono === '' || fecha === '' || hora === '' || adicional === '') {
        ui.mostrarAlerta('Todos los campos son Obligatorios', 'error');

        return;
    } //else {
      //  ui.mostrarAlerta('Tu reserva ha sido Exitosa');
    //}

    if(modificando) {

        // Pasar el objeto de la cita a ediccion
        administrarCitas.editarReserva({...citaObj})

        // Edita en IndexDB
        const transaction = DB.transaction(['citas'], 'readwrite');
        const objectStore = transaction.objectStore('citas');

        objectStore.put(citaObj);

        transaction.oncomplete = () => {

            ui.mostrarAlerta("Modificado correctamente")
            // Regresar el texto del voton a su estado normal
            formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

            // Quitar modo edicion
            modificando = false;
        }
        transaction.onerror = () => {
            console.log('Hubo un error');
        }

        
    }else {
        // Nuevo registro


        // Generar un ID unico
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({...citaObj});

        // Insertar registro en indexDB
        const transaction = DB.transaction(['citas'], 'readwrite');

        // Habilitar el objectStore
        const objectStore = transaction.objectStore('citas');

        // Insertar en la DB
        objectStore.add(citaObj);

        transaction.oncomplete = function() {
            console.log('Cita Agregada');

            // Mensaje de agregado correctamente
            ui.mostrarAlerta("Se agrego correctamente");
        }
    }



    // Reiniciar el objeto para la validacion
    reiniciarObjeto();

    // Reinicia el Formulario
    formulario.reset();

    // Mostras el html de las citas
    ui.mostrarReservas();
}

function reiniciarObjeto() {
    citaObj.nombre = '';
    citaObj.apellido = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.adicional = '';
}

function eliminarReserva(id) {
    // Eliminar la cita
    const transaction = DB.transaction(['citas'], 'readwrite');
    const objectStore = transaction.objectStore('citas');

    objectStore.delete(id);

    // Muestre un mensaje
    transaction.oncomplete = () => {
        console.log(`Cita ${id} eliminada...`);
        ui.mostrarReservas();
    }
    transaction.onerror = () => {
        console.log('Hubo un error');
    } 


}

function modificarReserva(cita) {
    const { nombre, apellido, telefono, fecha, hora, adicional, id } = cita;

    // Llenar los inputs
    nombreInput.value = nombre;
    apellidoInput.value = apellido;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    adicionalInput.value = adicional;

    // Llenar el objeto
    citaObj.nombre = nombre;
    citaObj.apellido = apellido;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.adicional = adicional;
    citaObj.id = id;

    // Cambiar texto del boton 
    formulario.querySelector('button[type="submit"]').textContent = "Modificar";

    modificando = true;
}

function crearDB() {
    // Crear la base de datos en version 1.0 
    const crearDB = window.indexedDB.open('citas', 1);

    // Si hay un error
    crearDB.onerror = function() {
        console.log('Hubo un error');
    }

    // Si todo sale bien 
    crearDB.onsuccess = function() {
        console.log('Base de datos creada');

        DB = crearDB.result;

        // Mostrar citas al cargar (Pero Indexbn ya esta listo)
        ui.mostrarReservas();
    }

    // Definir el Schem,a
    crearDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('citas', {
            keyPath: 'id',
            aotoIncrement: true
        });

        // Definir todas las columnas
        objectStore.createIndex('nombre', 'nombre', { unique: false });
        objectStore.createIndex('apellido', 'apellido', { unique: false });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('fecha', 'fecha', { unique: false });
        objectStore.createIndex('hora', 'hora', { unique: false });
        objectStore.createIndex('adicional', 'adicional', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });

        console.log(' DB Creada y Lista');
    }
}