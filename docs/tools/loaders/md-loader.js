const fm = require('gray-matter');

// Removes YAML from markdown file beggining
// Adds layouts for markdown
// (Shamelessly stolen from formik)
// @see https://github.com/formium/formik/blob/master/docs/src/lib/docs/md-loader.js
module.exports = async function (src) {
    const callback = this.async();
    const { content, data } = fm(src);
    const layout = data.layout || 'Docs';
    const code =
        `import { Layout${layout} } from 'layouts/Layout${layout}';
export const meta = ${JSON.stringify(data)};
export default ({ children, ...props }) => (
  <Layout${layout} meta={meta} {...props}>{children}</Layout${layout}>
);

` + content;

    return callback(null, code);
};
