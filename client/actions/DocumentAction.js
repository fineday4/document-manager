import axios from 'axios';
import * as actionTypes from './ActionTypes';

/**
 *
 * @desc get user documents action creator.
 * @param {array} documents
 * @returns {object} actiontype, and payload
 */

export const getDocuments = documents =>
  ({ type: actionTypes.GET_USER_DOCUMENT, documents });

/**
 *
 * @desc calls the get user document endpoint.
 *  Retrieves documents for a specific user.
 * @param {object} userId
 * @param {string} page. Represents pagination index.
 * @returns {array} returns an array of a specific users document.
 */

export const getUserDocuments = (userID) => {
  return dispatch => axios.get(`/api/users/${userID}/documents`)
    .then((response) => {
      dispatch(getDocuments(response.data.documents));
    }).catch((error) => console.log(error));
};

export const deleteDocument = response =>
  ({ type: actionTypes.DELETE_USER_DOCUMENT, response });

export const deleteUserDocument = (docID) => {
  return dispatch => axios.delete(`/api/documents/${docID}`)
    .then((response) => {
      dispatch(deleteDocument(response));
    }).catch((error) => console.log(error));
};

export const viewDocument = document =>
  ({ type: actionTypes.GET_ONE_DOCUMENT_SUCCESS, document });

export const getOneDocument = (docID) => {
  return dispatch => axios.get(`/api/documents/${docID}`)
    .then((response) => {
      dispatch(viewDocument(response.data));
    }).catch((error) => console.log(error));
};

export const createDocument = response =>
  ({ type: actionTypes.CREATE_DOCUMENT_SUCCESS, response });

export const createUserDocument = (documentData) => {
  return dispatch => axios.post('/api/documents', documentData)
    .then((response) => {
      dispatch(createDocument(response.data));
    }).catch((error) => console.log(error));
};

export const updateDocument = response =>
  ({ type: actionTypes.UPDATE_DOCUMENT_SUCCESS, response });

export const updateUserDocument = (documentData) => {
  return dispatch => axios.put(`/api/documents/${documentData.id}`, documentData)
    .then((response) => {
      dispatch(updateDocument(response.data));
    }).catch((error) => console.log(error));
};

export const getPublicDocuments = documents =>
  ({ type: actionTypes.GET_ALL_PUBLIC_DOCUMENTS, documents });

export const getAllPublicDocuments = () => {
  return dispatch => axios.get('/api/documents/public')
    .then((response) => {
      dispatch(getPublicDocuments(response.data.documents));
    }).catch((error) => console.log(error));
};

export const deleteUser = response =>
  ({ type: actionTypes.DELETE_USER_SUCCESS, response });

export const deleteOneUser = (userID) => {
  return dispatch => axios.delete(`/api/documents/${userID}`)
    .then((response) => {
      dispatch(deleteUser(response));
    }).catch((error) => console.log(error));
};

export const searchPublic = documents =>
  ({ type: actionTypes.SEARCH_PUBLIC_DOCUMENTS, documents });

export const searchPublicDocuments = (document) => {
  return dispatch => axios.get(`/api/search/documents/?title=${document}`)
    .then((response) => {
      console.log('this is response from server', response.data.documents);
      dispatch(searchPublic(response.data.documents));
    })
    .catch((error) => console.log(error));
};

export const searchMyDocuments = documents =>
  ({ type: actionTypes.SEARCH_MY_DOCUMENTS, documents });

export const searchOwnDocuments = (document) => {
  return dispatch => axios.get(`/api/search/myDocuments/?title=${document}`)
    .then((response) => {
      dispatch(searchMyDocuments(response.data.documents));
    })
    .catch((error) => console.log(error));
};
