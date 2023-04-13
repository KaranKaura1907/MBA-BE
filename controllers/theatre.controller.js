const Theatre= require('../models/theatre.model');
const Movie= require('../models/movie.model')
const createTheatre= async (req,res)=>{
    const theatreObject={
        name:req.body.name,
        city:req.body.city,
        description:req.body.description,
        pinCode:req.body.pinCode
    }
    try{
        const theatre= await Theatre.create(theatreObject);
        res.status(200).send(theatre);
    }
    catch(e)
    {
        console.log(e.message)
    }
}
const getAllTheatres= async (req,res)=>{
    const queryObj={};
    if(req.query.name!=undefined)
    {
        queryObj.name=req.body.name;
    }
    if(req.query.city!=undefined)
    {
        queryObj.city=req.body.city;
    }
    if(req.query.pinCode!=undefined)
    {
        queryObj.pinCode=req.body.pinCode;
    }
    try{
        let theatres= await Theatre.find(queryObj);
        if(req.query.movieId!=undefined)
        {
            theatres=theatres.filter(
                t=>t.movies.includes(req.query.movieId)
            )
        }
        res.status(200).send(theatres);
    }
    catch(e)
    {
        console.log("Get All failed because:",e.message);
    }
}
const getTheatre= async (req,res)=>{
    try{
        const theatre= await Theatre.findOne({
            _id:req.params.id
        });
        res.status(200).send(theatre);
    }
    catch(e)
    {
        console.log(e.message);
    }
}
const updateTheatre= async (req,res)=>{
    const savedTheatre= await Theatre.findOne({
        _id:req.params.id
    })
    if(!savedTheatre)
    {
        res.status(400).send({
            message:"Theatre being updated doesn't exist"
        })
    }
    savedTheatre.name=req.body.name!=undefined?req.body.name:savedTheatre.name;
    savedTheatre.city=req.body.city!=undefined?req.body.city:savedTheatre.city;
    savedTheatre.description=req.body.description!=undefined?req.body.description:savedTheatre.description;
    savedTheatre.pinCode=req.body.pinCode!=undefined?req.body.pinCode:savedTheatre.pinCode;
    try{
        const updatedTheatre= await savedTheatre.save();
        res.status(200).send(updatedTheatre);
    }
    catch(e)
    {
        console.log(e.message)
    }
}
const deleteTheatre= async (req,res)=>{
    try{
        await Theatre.deleteOne({
            _id:req.params.id
        });
        res.status(200).send({
            message:"Successfully deleted theatre with the id ["+req.params.id+"]"
        })
    }
    catch(e)
    {
        console.log(e.message)
    }
}
const putMoviesToATheatre=async(req,res)=>{
    let savedTheatre=await Theatre.findOne({
        _id:req.params.id
    })
    const movieIds=req.body.movieIds;
    if(req.body.insert)
    {
        movieIds.forEach(movieId=>{
            savedTheatre.movies.push(movieId)
        })
    }
    else{
        let savedMovieIds=savedTheatre.movies;
        movieIds.forEach(movieId=>{
            savedMovieIds=savedMovieIds.filter(
                element=>element!=movieId
            )
        })
        savedTheatre.movies=savedMovieIds
    }
    try
    {
        const updatedTheatre= await savedTheatre.save();
        res.status(200).send(updatedTheatre)
    }
    catch(e)
    {
        console.log(e.message)
    }
}
const checkMovieInsideATheatre= async (req,res)=>{
    const savedTheatre=await Theatre.findOne({
        _id:req.params.theatreId
    });
    const savedMovie= await Movie.findOne({
        _id:req.params.movieId
    });
    try{
        const responseBody={
            message: savedTheatre.movies.includes(savedMovie._id)
             ?"Movie is Present"
             :"Movie is not present"
        }
        res.status(200).send(responseBody)
    }
    catch(e){
        console.log(e.message)
    }

}

module.exports={
    createTheatre,
    getAllTheatres,
    getTheatre,
    updateTheatre,
    deleteTheatre,
    putMoviesToATheatre,
    checkMovieInsideATheatre
}