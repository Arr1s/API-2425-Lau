import 'dotenv/config';
import { App } from '@tinyhttp/app';
import { logger } from '@tinyhttp/logger';
import { Liquid } from 'liquidjs';
import sirv from 'sirv';

const valorantAPI = `https://valorant-api.com/v1/`
const valorantAgents = (valorantAPI + `agents`)
const valorantMaps = (valorantAPI + `maps`)

const engine = new Liquid({
  extname: '.liquid',
});

const app = new App();

app
  .use(logger())
  .use('/', sirv('dist'))
  .listen(3000, () => console.log('Server available on http://localhost:3000'));

app.get('/', async (req, res) => {
  const dataAgents = await fetch(valorantAgents);
  const agents = await dataAgents.json();
  console.log(agents)

  const dataMaps = await fetch(valorantMaps);
  const Maps = await dataMaps.json();
  // console.log(Maps);
  return res.send(renderTemplate('server/views/index.liquid', { title: 'Home', agents: agents, maps: Maps.data }));
});

app.get('/plant/:id/', async (req, res) => {
  const id = req.params.id;
  const item = data[id];
  if (!item) {
    return res.status(404).send('Not found');
  }
  return res.send(renderTemplate('server/views/detail.liquid', { title: `Detail page for ${id}`, item }));
});

const renderTemplate = (template, data) => {
  const templateData = {
    NODE_ENV: process.env.NODE_ENV || 'production',
    ...data
  };

  return engine.renderFileSync(template, templateData);
};

