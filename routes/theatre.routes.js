const theatreController= require('../controllers/theatre.controller');
const {validateTheatreRequestBody}= require('../middlewares/validateTheatreReqBody');
const {verifyToken,isAdmin}= require('../middlewares/authjwt');
module.exports= function (app){
    app.post('/mba/api/theatres',[verifyToken,isAdmin,validateTheatreRequestBody],theatreController.createTheatre);
    app.get('/mba/api/theatres',[verifyToken],theatreController.getAllTheatres);
    app.get('/mba/api/theatres/:id',[verifyToken],theatreController.getTheatre);
    app.put('/mba/api/theatres/:id',[verifyToken,isAdmin],theatreController.updateTheatre);
    app.delete('/mba/api/theatres/:id',[verifyToken,isAdmin],theatreController.deleteTheatre);
    app.put('/mba/api/theatres/:id/movies',[verifyToken,isAdmin],theatreController.putMoviesToATheatre);
    app.get('/mba/api/theatres/:theatreId/movies/:movieId',[verifyToken],theatreController.checkMovieInsideATheatre)
}