var express = require('express');
var cheerio = require('cheerio');
const axios = require("axios");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/scrap', async function(req, res, next) {

  const url = req.query.url;
  const result = await axios.get(url);
  $ =  cheerio.load(result.data); 
  const resObj ={};
  //create a reference to the meta elements
  $title = $('head title').text(),
  $desc = $('meta[name="description"]').attr('content'),
  $kwd = $('meta[name="keywords"]').attr('content'),
  $ogTitle = $('meta[property="og:title"]').attr('content'),
  $ogUrl = $('meta[property="og:url"]').attr('content'),
  $ogType = $('meta[property="og:type"]').attr('content'),
  $ogSiteName = $('meta[property="og:site_name"]').attr('content'),
  $ogDescription = $('meta[property="og:description"]').attr('content'),
  $ogDeterminer = $('meta[property="og:determiner"]').attr('content'),
  $ogLocale = $('meta[property="og:locale"]').attr('content'),
  $ogVideo = $('meta[property="og:video"]').attr('content'),
  $ogAudio = $('meta[property="og:audio"]').attr('content'),
  $ogImage = $('meta[property="og:image"]').attr('content'),
  $ogkeywords = $('meta[property="og:keywords"]').attr('content'),
  $images = $('img');
    if ($title) {
        resObj.title = $title;
    }
    if ($desc) {
        resObj.description = $desc;
    }
    if ($kwd) {
        resObj.keywords = $kwd;
    }
    if ($ogImage && $ogImage.length){
        resObj.ogImage = $ogImage;
    }
    if ($ogTitle && $ogTitle.length){
        resObj.ogTitle = $ogTitle;
    }
    if ($ogUrl && $ogUrl.length){
      resObj.ogUrl = $ogUrl;
    }
    if ($ogType && $ogType.length){
      resObj.ogType = $ogType;
    }
    
    if ($ogSiteName && $ogSiteName.length){
      resObj.ogSiteName = $ogSiteName;
    }
    
    if ($ogImage && $ogImage.length){
      resObj.ogImage = $ogImage;
    }
    
    if ($ogDescription && $ogDescription.length){
      resObj.ogDescription = $ogDescription;
    }
    
    if ($ogDeterminer && $ogDeterminer.length){
      resObj.ogDeterminer = $ogDeterminer;
    }
    
    if ($ogLocale && $ogLocale.length){
      resObj.ogLocale = $ogLocale;
    }
    
    if ($ogVideo && $ogVideo.length){
      resObj.ogVideo = $ogVideo;
    }
    
    if ($ogAudio && $ogAudio.length){
      resObj.ogAudio = $ogAudio;
    }
    
    if ($ogkeywords && $ogkeywords.length){
        resObj.ogkeywords = $ogkeywords;
    }
    if ($images && $images.length){
        resObj.images = [];
        for (var i = 0; i < $images.length; i++) {
            resObj.images.push($($images[i]).attr('src'));
        }
    }
    //send the response
    res.send(resObj);  
});


module.exports = router;
