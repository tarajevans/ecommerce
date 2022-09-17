const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The /api/tags endpoint

router.get('/', (req, res) => {
  // find all tags
  // select * from tag left join product_tag on product_tag.tag_id=tag_id left join product on product.id=product_id
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  //   {
  //     model: ProductTag,
  //     attributes: ['id', 'product_id', 'tag_id']
  // }
]
  }).then(dbPostData => res.json(dbPostData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its id
  Tag.findOne({
      attributes: ['id', 'tag_name'],
      where: {id: req.params.id},
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its id value
  Tag.update(req.body, {
    where: {id: req.params.id}
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its id value
  Tag.destroy({
    where: {id: req.params.id}
  }).then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;