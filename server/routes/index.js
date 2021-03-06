import { adminCheck, ownerCheck, isOwnerOrAdmin, validateCreateUser } from '../middleware/usersAuthorization';

const UserController = require('../controllers/userController');
const DocumentController = require('../controllers/documentController');
const RoleController = require('../controllers/roleController');
const authorization = require('../middleware/authorization');

const Routes = (app) => {
   /**
   * @swagger
   * definition:
   *   Roles:
   *     properties:
   *       roles:
   *          type: array
   *          items:
   *             $ref: '#/definitions/RoleData'
   */
    /**
   * @swagger
   * definition:
   *   RoleData:
   *     properties:
   *       title:
   *         type: string
   */
  /**
   * @swagger
   * definition:
   *   Users:
   *     properties:
   *       firstName:
   *         type: string
   *       lastName:
   *         type: string
   *       email:
   *         type: string
   */
    /**
   * @swagger
   * definition:
   *   metaData:
   *     properties:
   *       totalCount:
   *         type: integer
   *       pages:
   *         type: integer
   *       currentPage:
   *         type: integer
   *       pageSize:
   *          type: integer
   */
    /**
   * @swagger
   * definition:
   *   userPagination:
   *     properties:
   *       Users:
   *         type: array
   *         items:
   *           $ref: '#/definitions/Users'
   *       metaData:
   *         $ref: '#/definitions/metaData'
   */
    /**
   * @swagger
   * definition:
   *   Documents:
   *     properties:
   *       title:
   *         type: string
   *       content:
   *         type: string
   *       access:
   *         type: string
   */
   /**
   * @swagger
   * definition:
   *   documentPagination:
   *     properties:
   *       Documents:
   *         type: array
   *         items:
   *           $ref: '#/definitions/Documents'
   *       metaData:
   *         $ref: '#/definitions/metaData'
   */
   /**
   * @swagger
   * definition:
   *   SearchUser:
   *     properties:
   *       Users:
   *         type: array
   *         items:
   *           $ref: '#/definitions/Users'
   *       metaData:
   *         $ref: '#/definitions/metaData'
   */
    /**
   * @swagger
   * definition:
   *   SearchDocument:
   *     properties:
   *       Documents:
   *         type: array
   *         items:
   *           $ref: '#/definitions/Documents'
   *       metaData:
   *         $ref: '#/definitions/metaData'
   */

  // ROLES API ENDPOINT ROUTES

   /**
   * @swagger
   * /api/roles:
   *   post:
   *     tags:
   *       - Roles
   *     description: Creates a new role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: role
   *         description: Role object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Roles'
   *     responses:
   *       201:
   *         description: role created succesfully
   */
  app.post(
    '/api/roles', authorization.authorize, adminCheck, RoleController.create,
  );
  /**
   * @swagger
   * /api/roles/{id}:
   *   delete:
   *     tags:
   *       - Roles
   *     description: Deletes a single role
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: role's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Role deleted successfully
   */
  app.delete(
    '/api/roles/:id', authorization.authorize, adminCheck, RoleController.delete,
  );
  /**
   * @swagger
   * /api/roles/{id}:
   *   put:
   *     tags:
   *       - Roles
   *     description: Updates a single role
   *     produces: application/json
   *     parameters:
   *       name: role
   *       in: body
   *       description: Fields for the role resource
   *       schema:
   *         $ref: '#/definitions/Roles'
   *     responses:
   *       200:
   *         description: Role updated successfully
   */
  app.put(
    '/api/roles/:id', authorization.authorize, adminCheck, RoleController.update,
  );
  /**
   * @swagger
   * /api/roles:
   *   get:
   *     tags:
   *       - Roles
   *     description: Returns all roles
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object containing array of roles
   *         schema:
   *           $ref: '#/definitions/Roles'
   */
  app.get(
    '/api/roles', authorization.authorize, adminCheck, RoleController.getAll,
  );

  // USERS API ENDPOINT ROUTES

  /**
   * @swagger
   * /api/users:
   *   post:
   *     tags:
   *       - Users
   *     description: creates a new user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: user
   *         description: User object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Users'
   *     responses:
   *       201:
   *         description: user created succesfully
   */
  app.post(
    '/api/users', validateCreateUser, UserController.create,
  );
  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     tags:
   *       - Users
   *     description: sign a user into the application
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: user email address
   *         in: formData
   *         required: true
   *       - name: password
   *         description: user password
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: Login successful
   *         schema:
   *           $ref: '#/definitions/Users'
   */
  app.post(
    '/api/users/login', UserController.login,
  );

  app.get('/api/users/logout', authorization.authorize, UserController.logout);

  /**
   * @swagger
   * /api/users/:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object containing array of users and an object of metaData
   *         schema:
   *           $ref: '#/definitions/userPagination'
   */
  app.get(
    '/api/users/', authorization.authorize, adminCheck, UserController.getAll,
  );

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns a single user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single user
   *         schema:
   *           $ref: '#/definitions/Users'
   */
  app.get(
    '/api/users/:id', authorization.authorize, adminCheck, UserController.getOneUser,
  );
  /**
   * @swagger
   * /api/users/{id}:
   *   put:
   *     tags:
   *       - Users
   *     description: Updates a single user
   *     produces: application/json
   *     parameters:
   *       name: user
   *       in: body
   *       description: Fields for the User resource
   *       schema:
   *         type: array
   *         $ref: '#/definitions/Users'
   *     responses:
   *       200:
   *         description: Successfully updated
   */
  app.put(
    '/api/users/:id', authorization.authorize, ownerCheck, UserController.update,
  );
  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     description: Deletes a single user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: User's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: User successfully Deleted
   */
  app.delete(
    '/api/users/:id', authorization.authorize, isOwnerOrAdmin, UserController.delete,
  );

  /**
   * @swagger
   * /api/search/users/?:
   *   get:
   *     tags:
   *       - Users
   *     description: Returns all users based on the search input
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object containing an array of users and an object of metaData
   *         schema:
   *           $ref: '#/definitions/SearchUser'
   */
  app.get(
    '/api/search/users/?', authorization.authorize, UserController.searchUser,
  );

  // Documentss routes

  /**
   * @swagger
   * /api/documents:
   *   post:
   *     tags:
   *       - Documents
   *     description: Creates a new document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: document
   *         description: Document object
   *         in: body
   *         required: true
   *         schema:
   *           $ref: '#/definitions/Documents'
   *     responses:
   *       201:
   *         description: Successfully created
   */
  app.post(
    '/api/documents', authorization.authorize, DocumentController.create,
  );

  /**
   * @swagger
   * /api/documents/roles:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all role Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object containing array of documents and an object of metaData
   *         schema:
   *           $ref: '#/definitions/documentPagination'
   */
  app.get(
    '/api/documents/roles', authorization.authorize, DocumentController.getRolesDocuments,
  );

  /**
   * @swagger
   * /api/users/{id}/documents:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all of the users Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object containing array of documents and an object of metaData
   *         schema:
   *           $ref: '#/definitions/documentPagination'
   */
  app.get(
    '/api/users/:id/documents', authorization.authorize, ownerCheck, DocumentController.getDocuments,
  );

  /**
   * @swagger
   * /api/documents/public:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns all public Documents
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object containing array of documents and an object of metaData
   *         schema:
   *           $ref: '#/definitions/documentPagination'
   */
  app.get(
    '/api/documents', authorization.authorize, DocumentController.getAllPublic,
  );

  /**
   * @swagger
   * /api/documents/{id}:
   *   get:
   *     tags:
   *       - Documents
   *     description: Returns a single document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: A single document
   *         schema:
   *           $ref: '#/definitions/Documents'
   */
  app.get(
    '/api/documents/:id', authorization.authorize, DocumentController.getOneDocument,
  );

  /**
   * @swagger
   * /api/documents/{id}:
   *   put:
   *     tags:
   *       - Documents
   *     description: Updates a single document
   *     produces: application/json
   *     parameters:
   *       name: document
   *       in: body
   *       description: Fields for the Document resource
   *       schema:
   *         type: array
   *         $ref: '#/definitions/Documents'
   *     responses:
   *       200:
   *         description: Document updated successfully
   */
  app.put(
    '/api/documents/:id', authorization.authorize, DocumentController.update,
  );

  /**
   * @swagger
   * /api/documents/{id}:
   *   delete:
   *     tags:
   *       - Documents
   *     description: Deletes a single document
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Document's id
   *         in: path
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: Document successfully deleted
   */
  app.delete(
    '/api/documents/:id', authorization.authorize, DocumentController.delete,
  );

  /**
   * @swagger
   * /api/search/Documents/?:
   *   get:
   *     tags:
   *       - Documents
   *     description: search and returns all public documents based on the search input
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object containing an array of documents and an object of metaData
   *         schema:
   *           $ref: '#/definitions/SearchDocument'
   */
  app.get(
    '/api/search/documents/?', authorization.authorize, DocumentController.searchPublicDocuments,
  );

  /**
   * @swagger
   * /api/search/myDocuments/?:
   *   get:
    *     tags:
   *       - Documents
   *     description: search and returns all documents based on the search input
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object containing an array of documents and an object of metaData
   *         schema:
   *           $ref: '#/definitions/SearchDocument'
   */
  app.get(
    '/api/search/myDocuments/?', authorization.authorize, DocumentController.searchMyDocuments,
  );

  /**
   * @swagger
   * /api/search/roleDocuments/?:
   *   get:
    *     tags:
   *       - Documents
   *     description: search and returns all documents based on the search input
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object containing an array of documents and an object of metaData
   *         schema:
   *           $ref: '#/definitions/SearchDocument'
   */
  app.get(
    '/api/search/roleDocuments/?', authorization.authorize, DocumentController.searchRoleDocuments,
  );
};

module.exports = Routes;
