import 'dotenv/config';
import { App } from '@tinyhttp/app'; // Remove json import
import bodyParser from 'body-parser'; // Import json middleware from body-parser
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Low, JSONFile } from 'lowdb';

// Verkrijg het pad van de huidige map
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Gebruik het pad om het bestand te maken
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
db.data ||= [];

await db.write();

const valorantAPI = `https://valorant-api.com/v1/`;
const valorantAgents = valorantAPI + `agents`;
const valorantMaps = valorantAPI + `maps`;

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use(bodyParser.urlencoded({ extended: true })) // Use body-parser's json middleware
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

  app.get('/', async (req, res) => {  
    const dataMaps = await fetch(valorantMaps);
    const maps = await dataMaps.json();
    // console.log(maps);
    const dataAgents = await fetch(valorantAgents);
    const agents = await dataAgents.json();

    const strategyID = new Date().getTime();
    console.log(strategyID);
    return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', maps: maps.data, strategyID, agents: agents.data }));
  });

  app.post('/', async (req, res) => {
    const { strategyID, mapID, strategyName } = req.body;
    await db.read();
  
   
      db.data.push({
        id: strategyID,
        name: strategyName,
        mapID: mapID,
        markers: [] 
      });
  
    // Wegschrijven naar disk
    await db.write();
    return res.redirect(`/map/${strategyID}/`);
  });




app.get('/map/:id/', async (req, res) => {
  const id = req.params.id;
  const strategy = db.data.find((item) => item.id == id);
  // const strategyNotFound = alert('StrategyID not found');
  if (!strategy) {
    return res.redirect('/', { status: 402 });
  }

  const markers = db.data.find(item => item.id === id).markers
  console.log("markers opnieuw:", markers);
  if (!markers) {
    console.log("No markers found");
  }


  const dataMaps = await fetch(valorantMaps);
  const maps = await dataMaps.json();

  const searchQuery = req.query.search;
  const dataAgents = await fetch(valorantAgents);
  const agents = await dataAgents.json();
  
  let filteredAgents = agents.data;
  if (searchQuery && agents) {
    const query = searchQuery.toLowerCase();
    filteredAgents = agents.data.filter(agent =>
      agent.displayName.toLowerCase().includes(query)
    );
  }

  return res.send(renderTemplate('server/views/strategy.liquid', { maps: maps.data, strategy: strategy, agents: filteredAgents, query: searchQuery, markers: markers }));
});

app.post('/map/:id', async (req, res) => {
  const id = req.params.id;

  const mapID = req.body.mapID;
  console.log(mapID);
  if (!mapID) {
    return res.status(400).send('No data provided');
  }

  await db.read()

  // Find the strategy by id (remember id is likely a string)
  const strategy = db.data.find(item => item.id === id)

  if (!strategy) {
    return res.status(404).send('Strategy not found')
  }

  // Update only the mapID
  strategy.mapID = mapID

  await db.write()
  console.log('Updated strategy:', strategy)

  return res.redirect(`/map/${id}/`)
});





app.post ('/map/:id/search', async (req, res) => {
  const id = req.params.id;
  console.log(id)

  const searchQuery = req.body.search;
  console.log(searchQuery);

  // return res.send(renderTemplate('server/views/strategy.liquid', { title: 'Search agent', agents: filteredAgents, query: searchQuery }));
  return res.redirect(`/map/${id}/?search=${searchQuery}`);
});



app.post('map/:id/addmarker', async (req, res) => {
  const id = req.params.id;
  const { x, y, markerID, type, agentID } = req.body;

  const dataAgents = await fetch(valorantAgents);
  const agents = await dataAgents.json();
  // await db.read();

  // Find the strategy by id (remember id is likely a string)
  const strategy = db.data.find(item => item.id === id)

  if (!strategy) {
    return res.status(404).send('Strategy not found')
  }

  // Update only the mapID
  strategy.markers.push({
    markerID: markerID,
    x: x,
    y: y,
    type: type,
    agentID: agentID,
    agent: agents.data.find(agent => agent.uuid === agentID),
    ability: agents.data.find(agent => agent.uuid === agentID).abilities.find(ability => ability.slot === type)
  })

  await db.write()
  console.log('Updated strategy:', strategy)

  return res.redirect(`/map/${id}/`)
});



const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data,
  }

  return engine.renderFileSync(template, templateData);
};



