FROM node:12

COPY dist/index.js /index.js

ENTRYPOINT ["node", "/index.js"]