'use strict';
const path = require('path');
const { exec } = require('child_process');
function compileThrift(app) {
  if (!(app.config.thrift && app.config.thrift.package === null)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const packageDir = path.resolve(app.baseDir, app.config.thrift.dir);
    const outDir = path.resolve(app.baseDir, 'app/thrift');
    exec(`rm -rf ${outDir} | node-thrift ${packageDir}  -o ${outDir}`, (error, stdout, stderr) => {
      if (error) {
        app.logger.error(`[egg-thrift] thrift compiler error: ${error}`);
        reject(error);
      }

      if (stdout) app.logger.info(`[egg-thrift] ${stdout}`);
      if (stderr) app.logger.error(`[egg-thrift] thrift compiler error: ${stderr}`);

      resolve();
    });
  });
}

module.exports = compileThrift;
