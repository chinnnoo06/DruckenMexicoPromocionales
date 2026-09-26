import colors from 'colors'
import server from './server';
import { PORT } from './config/env';

server.listen(PORT, () => {
  console.log(colors.cyan.bold(`Servidor escuchando en http://localhost:${PORT}`));
});
