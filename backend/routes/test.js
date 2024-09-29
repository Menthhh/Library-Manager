import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json([
      {
        "id":"1",
        "title":"Book Review: The Name of the Wind....."
      },
      {
        "id":"2",
        "title":"Game Review: Pokemon Brillian Diamond"
      },
      {
        "id":"3",
        "title":"Show Review: Alice in Borderland"
      }
    ])
  })

export default router;