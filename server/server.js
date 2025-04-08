import 'dotenv/config';
import { App } from '@tinyhttp/app'; // Remove json import
import bodyParser from 'body-parser'; // Import json middleware from body-parser
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

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

    return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', maps: maps.data }));
  });

// app.get('/strategy/', async (req, res) => {  
//   const searchQuery = req.query.search;
//   const dataAgents = await fetch(valorantAgents);
//   const agents = await dataAgents.json();
  
//   let filteredAgents = agents.data;
//   if (searchQuery && agents) {
//     // console.log(agents);
//     filteredAgents = agents.data.filter(agent => {
//       return agent.displayName.includes(searchQuery)
//     })
//   }

//   const dataMaps = await fetch(valorantMaps);
//   const maps = await dataMaps.json();

//   return res.send(renderTemplate('server/views/strategy.liquid', { title: 'Strategy', agents: filteredAgents, maps: maps.data, query: searchQuery }));
// });


// app.get('/video/', async (req, res) => {
//   return res.send(renderTemplate('server/views/detail.liquid', { title: `Video try out` }));
// });

app.get('/maps/:uuid', async (req, res) => {

  
  const id = req.params.uuid;
  const dataMaps = await fetch(valorantMaps);
  const maps = await dataMaps.json();
  const selectedMap = maps.data.find(map => map.uuid === id);

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

  if (!selectedMap) {
    return res.status(404).send('Not found');
  }
  return res.send(renderTemplate('server/views/strategy.liquid', { title: 'Strategy', agents: filteredAgents, maps: maps.data, query: searchQuery, map: selectedMap }));
}
);

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data,
  }

  return engine.renderFileSync(template, templateData);
};



