/**
 * Created by Kevin on 2016/7/20.
 */
exports.requireLogin = function(req,res,next){
    if(req.session.user){
        return next();
    }
    res.status(402);
    res.redirect('/login');
};