// Cargar Popper.js
var popperScript = document.createElement('script');
popperScript.src = 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js';
popperScript.type = 'text/javascript';
document.head.appendChild(popperScript);

// Cargar Bootstrap.js
var bootstrapScript = document.createElement('script');
bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js';
bootstrapScript.type = 'text/javascript';
document.head.appendChild(bootstrapScript);

// Cargar Bootstrap Icons
var bootstrapIconsLink = document.createElement('link');
bootstrapIconsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
bootstrapIconsLink.rel = 'stylesheet';
document.head.appendChild(bootstrapIconsLink);

// Cargar elements.js
var elementsScript = document.createElement('script');
elementsScript.src = '/frontend/Resources/Js/Elements.js';
elementsScript.type = 'text/javascript';
document.head.appendChild(elementsScript);

// Cargar jQuery
var jqueryScript = document.createElement('script');
jqueryScript.src = 'https://code.jquery.com/jquery-3.5.1.slim.min.js';
jqueryScript.type = 'text/javascript';
document.head.appendChild(jqueryScript);