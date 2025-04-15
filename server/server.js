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
    const strategyID = new Date().getTime();
    console.log(strategyID);
    return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', maps: maps.data, strategyID }));
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
  console.log("strategy:", strategy)
  if (!strategy) {
    return res.redirect('/', { status: 402 });
  }

  const dataMaps = await fetch(valorantMaps);
  const maps = await dataMaps.json();

  return res.send(renderTemplate('server/views/strategy.liquid', { maps: maps.data, strategy: strategy }));
});

app.post('/map/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const mapID = req.body;
  console.log(mapID);
  if (!mapID) {
    return res.status(400).send('No data provided');
  }

//   await db.read();
  
   
//   db.data.push({
//     id: strategyID,
//     name: strategyName,
//     map: map,
//     markers: [] 
//   });

// // Wegschrijven naar disk
// await db.write();

  return res.redirect(`/map/${id}/`)
});

app.get ('/map/:id/search', async (req, res) => {
  const searchQuery = req.query.search;
  const dataAgents = await fetch(valorantAgents);
  const agents = await dataAgents.json();
  
  let filteredAgents = agents.data;
  if (searchQuery && agents) {
    // console.log(agents);
    filteredAgents = agents.data.filter(agent => {
      return agent.displayName.includes(searchQuery)
    })
  }
  return res.send(renderTemplate('server/views/strategy.liquid', { title: 'Search agent', agents: filteredAgents, query: searchQuery }));
});

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data,
  }

  return engine.renderFileSync(template, templateData);
};



