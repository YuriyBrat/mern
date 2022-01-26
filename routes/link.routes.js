const { Router } = require('express');
const router = Router()

const Link = require('../models/Link')
const auth = require('../middleware/auth.middle')
const config = require('config')
const shortid = require('shortid')

router.post('/generate', auth, async (req, res) => {
   try {
      const baseUrl = config.get('baseUrl');
      const { from } = req.body

      const code = shortid.generate()

      const existing = await Link.findOne({ from })
      if (existing) {
         return res.json({ link: existing }) //! якщо return є, то код дальше не йде!
      }

      const to = baseUrl + '/t/' + code
      const link = new Link({
         code, to, from, owner: req.user.userId
      })

      await link.save()


      res.status(201).json({ message: 'Link is short', link })

   } catch (e) {
      res.status(500).json({ message: 'generate  not get', e })
   }
})

router.get('/', auth, async (req, res) => {
   try {
      const links = await Link.find({ owner: req.user.userId })  //! ?
      res.status(200).json({ message: 'Links received', links })

   } catch (e) {
      res.status(500).json({ message: 'links not get', e })
   }
})

router.get('/:id', auth, async (req, res) => {
   try {
      const link = await Link.findById(req.params.id);
      res.status(200).json({ message: 'Link by id received', link })

   } catch (e) {
      res.status(500).json({ message: 'link by id not get', e })
   }
})


module.exports = router