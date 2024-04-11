const express = require('express');
const app = express();

// define your "database" (just an array of objects for now)
const pets = [
  {
    id: 1,
    name: 'Floppy',
    owner: 'Jon'
  },
  {
    id: 2,
    name: 'Fuzzy',
    owner: 'Tyler'
  },
  {
    id: 3,
    name: 'Fred',
    owner: 'Jon'
  },
]

//get all pets
app.get('/api/v1/pets', (req, res) => {
  res.send(pets);
})

// get a single object (pet) based on it's owner using query string
app.get('/api/v1/pets/owner', (req, res) => {
  let foundPet = {};

  console.log(`REQ QUERY`, req.query);
  if(req.query.owner) {
    foundPet = pets.filter((pet) => {
      return pet.owner === req.query.owner; 
    })}
  res.send(foundPet);
})


// get single object (pet) based on it's :name
// Why does this have to go AFTER the pets/owner route?
app.get('/api/v1/pets/:name', (req, res) => {
  console.log(req.params); // returns { name: 'Floppy' }
  const { name } = req.params;
  console.log(name);
  
  const foundPet = pets.find((currentPet) => {
    return currentPet.name === name;
  })
  
  res.send(foundPet);
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
}); // Why does this have to go on the bottom of the code?