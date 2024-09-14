require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

/**
 * GET /
 * Homepage
 */
exports.homepage = async(req, res) => {
    try {
        const limitNumber = 5;
        const cuisines = await Category.find({}).sort({_id: -1}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const indian = await Recipe.find({ 'category': 'Indian' }).limit(limitNumber);
        const italian = await Recipe.find({ 'category': 'Italian' }).limit(limitNumber);
        const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        const chinese = await Recipe.find({ 'category': 'Chinese' }).limit(limitNumber);
        const food = { latest, indian, american, chinese, italian};
        res.render('index', { cuisines, food });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" })
        console.log('err', + error)
    }
}

/**
 * GET /cuisines
 * Cuisines
 */
exports.exploreCuisines = async(req, res) => {
    try {
        const limitNumber = 65;
        const cuisines = await Category.find({}).limit(limitNumber);
        res.render('cuisines', { title: 'Cuisines', cuisines });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" })
    }
}

/**
 * GET /cuisine/:id
 * CuisineById
 */
exports.exploreCuisineById = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 100;
        const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);
        res.render('cuisine', { title: 'Cuisines', categoryById });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" })
    }
}


/**
 * GET /learn-more
 * Learn More
 */
exports.learnMore = async(req, res) => {
  try {
      res.render('learn-more', { title: 'Learn More'});
  } catch (error) {
      res.status(500).send({message: error.message || "Error Occured" })
  }
}


/**
 * GET /recipe/:id
 * Recipe
 */
exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);
        res.render('recipe', { title: 'Recipe', recipe });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" })
    }
}

/**
 * GET /search
 * Search
 */
exports.searchRecipe = async(req, res) => {
    try {
      let searchTerm = req.body.searchTerm;
      let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } });
      res.render('search', { title: 'Search', recipe } );
    } catch (error) {
      res.satus(500).send({message: error.message || "Error Occured" });
    }
    
  }

/**
 * GET /explore-latest
 * Explore Latest
 */
exports.exploreLatest = async(req, res) => {
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        res.render('explore-latest', { title: 'Explore Latest', recipe });
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" })
    }
}

/**
 * GET /random-recipe
 * Random Recipe as JSON
 */
exports.randomRecipe = async(req, res) => {
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render('random-recipe', { title: 'Random Recipe', recipe }  );
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured" })
    }
}


/**
 * GET /upload-recipe
 * Upload Recipe
 */
exports.submitRecipe = async(req, res) => {
    const limitNumber = 65;
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    const cuisines = await Category.find({}).limit(limitNumber);
    res.render('7uNwPCTyCSZA3pVj84DdbKtYQuEeEDv77hSdXkqGMpRAvpa4SqUsUw4hpS9sak8CvC8WnzBEkRUywPhbhLaxKuwpTnYexVUPjn48Jxc5BZdfn5SLQR7VFUHtymKrkSVpaSsK8YLtfCc5kYbjgMgXF9pPwQdqwqQRTd3hqcMmdnDmUreBMeuVcnHMtBeEQL4LkpR7cXfBvcgXqbxmECgGNsPfYpdRhzPR9Uzm8MdmsS27hdcqx4rhk84AM5s', { title: 'Upload Recipe', infoErrorsObj, infoSubmitObj, cuisines } );
  }

/**
 * GET /upload-recipe-post
 * Upload Recipe On Post
 */
exports.submitRecipeOnPost = async(req, res) => {
    try {
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files were uploaded.');
      } else {
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.status(500).send(err);
        })
  
      }
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        category: req.body.category,
        image: newImageName
      });
      
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect('/7uNwPCTyCSZA3pVj84DdbKtYQuEeEDv77hSdXkqGMpRAvpa4SqUsUw4hpS9sak8CvC8WnzBEkRUywPhbhLaxKuwpTnYexVUPjn48Jxc5BZdfn5SLQR7VFUHtymKrkSVpaSsK8YLtfCc5kYbjgMgXF9pPwQdqwqQRTd3hqcMmdnDmUreBMeuVcnHMtBeEQL4LkpR7cXfBvcgXqbxmECgGNsPfYpdRhzPR9Uzm8MdmsS27hdcqx4rhk84AM5s');
    } catch (error) {
      req.flash('infoErrors', error);
      res.redirect('/7uNwPCTyCSZA3pVj84DdbKtYQuEeEDv77hSdXkqGMpRAvpa4SqUsUw4hpS9sak8CvC8WnzBEkRUywPhbhLaxKuwpTnYexVUPjn48Jxc5BZdfn5SLQR7VFUHtymKrkSVpaSsK8YLtfCc5kYbjgMgXF9pPwQdqwqQRTd3hqcMmdnDmUreBMeuVcnHMtBeEQL4LkpR7cXfBvcgXqbxmECgGNsPfYpdRhzPR9Uzm8MdmsS27hdcqx4rhk84AM5s');
    }
  }

// async function insertDymmyCategoryData(){
//   try {
//     await Category.insertMany([
//       {
//         "name": "Japanese",
//         "image": "japanese-food.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }
// insertDymmyCategoryData();





// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "",
//         "description": ``,
//         "ingredients": [
//           "",
//           "",
//         ],
//         "instructions":"Instructions to be added in Database",
//         "category": "", 
//         "image": ".jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }
// insertDymmyRecipeData();

