/**
 * Callback
 *
 * @param {String} route
 * @param {Object} options e.g.: options = { method: "POST", body: form, ... }
 * @param {Object} extras { fnSucesso: { }, fnError: { } } : Anonymous functions
 */
const useFetch = function (route = "", { fnSucesso, fnError }, options = {}) {

  this.fnSucesso = fnSucesso;
  this.fnError = fnError;

  options = { ...api.options, ...options };

  console.log(`${api.baseURL}/${route}`);

  fetch(`${api.baseURL}/${route}`, options)
    .then(response => response.json())
    .then(data => {
      if (typeof this.fnSucesso == 'function') this.fnSucesso(data);
    }).catch(err => {
      //console.log(data);
      if (typeof this.fnError == 'function') this.fnError(data);
    });
}

//========================
//========================

/**
 * Async Await (Talvez)
 *
 * @param {String} route
 * @param {Object} options e.g.: options = { method: "POST", body: form, ... }
 *
 * @use async useFetch_sw('/rota', {});
 */
const useFetchSW = async function (route = "", options = {}) {
  return await fetch(`${URL}/${route}`, options);
}
