import sidebar from './sidebar'
import head from './head'
import nav from './nav'
import markdown from './markdown'
import lang from './lang'
const config = {
  title: "howtools",
  description: "howtools 使用文档",
  head,
  markdown,
  themeConfig: {
    sidebar,
    nav,
    demoblock: lang,
    logo: '../../assets/logo.svg'
  },
};

export default config;
