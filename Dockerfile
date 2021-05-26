FROM node:14

COPY dist/index.js /index.js

ENTRYPOINT ["node", "/index.js"]