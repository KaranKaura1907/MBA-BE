const movieController= require('../controllers/movie.controller');
const {verifyMovieReqBody}= require('../middlewares');
const {verifyToken,isAdmin}=require('../middlewares/authjwt')
module.exports= function(app){
    app.get('/mba/api/movies',[verifyToken],movieController.getAllMovies);
    app.get('/mba/api/movies/:id',[verifyToken],movieController.getMovieById);
    app.post('/mba/api/movies',[verifyToken,isAdmin,verifyMovieReqBody.validateMovieReqBody],movieController.createMovie);
    app.put('/mba/api/movies/:id',[verifyToken,isAdmin,verifyMovieReqBody.validateMovieReqBody],movieController.updateMovie);
    app.delete('/mba/api/movies/:id',[verifyToken,isAdmin],movieController.deleteMovie);
}