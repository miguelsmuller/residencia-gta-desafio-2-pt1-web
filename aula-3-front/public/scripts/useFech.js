"use strict";

/**
 * Callback
 *
 * @param {String} route
 * @param {Object} options e.g.: options = { method: "POST", body: form, ... }
 * @param {Object} extras { fnSucesso: { }, fnError: { } } : Anonymous functions
 */

const useFetch = function useFetch(
  route = "",
  { fnSucesso = null, fnError = null },
  options = {}
) {
  fetch(`${api.baseURL}/${route}`, options)
    .then((response) => response.json())
    .then((data) => {
      if (typeof fnSucesso == "function") fnSucesso(data);
    })
    .catch((err) => {
      if (typeof fnError == "function") fnError(data);
    });
};
