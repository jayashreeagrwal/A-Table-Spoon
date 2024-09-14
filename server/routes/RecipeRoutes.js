const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes
 */
router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe);
router.get('/cuisines', recipeController.exploreCuisines);
router.get('/cuisine/:id', recipeController.exploreCuisineById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/random-recipe', recipeController.randomRecipe);
router.get('/learn-more', recipeController.learnMore);
router.get('/7uNwPCTyCSZA3pVj84DdbKtYQuEeEDv77hSdXkqGMpRAvpa4SqUsUw4hpS9sak8CvC8WnzBEkRUywPhbhLaxKuwpTnYexVUPjn48Jxc5BZdfn5SLQR7VFUHtymKrkSVpaSsK8YLtfCc5kYbjgMgXF9pPwQdqwqQRTd3hqcMmdnDmUreBMeuVcnHMtBeEQL4LkpR7cXfBvcgXqbxmECgGNsPfYpdRhzPR9Uzm8MdmsS27hdcqx4rhk84AM5s', recipeController.submitRecipe);
router.post('/7uNwPCTyCSZA3pVj84DdbKtYQuEeEDv77hSdXkqGMpRAvpa4SqUsUw4hpS9sak8CvC8WnzBEkRUywPhbhLaxKuwpTnYexVUPjn48Jxc5BZdfn5SLQR7VFUHtymKrkSVpaSsK8YLtfCc5kYbjgMgXF9pPwQdqwqQRTd3hqcMmdnDmUreBMeuVcnHMtBeEQL4LkpR7cXfBvcgXqbxmECgGNsPfYpdRhzPR9Uzm8MdmsS27hdcqx4rhk84AM5s', recipeController.submitRecipeOnPost);
module.exports = router;


