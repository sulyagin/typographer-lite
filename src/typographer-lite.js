export default class typographerLite {
  constructor(options = {}) {
    const defaults = {
      container: 'body',
      excludeTags: [ 'script', 'style', 'title', 'code' ],
      locale: 'en_US',
    };
    this.settings = Object.assign({}, defaults, options);
    this.settings.excludeTags = this.settings.excludeTags.map((tag) => tag.toUpperCase());
    this.parse = this.parse.bind(this);
    document.addEventListener('DOMContentLoaded', this.parse);
  }
  parse() {
    const nodes = document.createNodeIterator(
      document.querySelector(this.settings.container),
      NodeFilter.SHOW_TEXT,
      { acceptNode: (node) => {
          if (
            /\S/.test(node.data) &&
            !this.settings.excludeTags.includes(node.parentNode.nodeName)
          ) {
            return NodeFilter.FILTER_ACCEPT
          }
        } },
      false
    );
    let currentNode;
    while (currentNode = nodes.nextNode()) {
      Object.keys(this.rules()).forEach((key) => {
        currentNode.nodeValue = this.rules()[key](currentNode.nodeValue);
      });
    }
  }
  rules() {
    return {
      setQuotesEntity: (text) => {
        return text.replace(/&quot;/g, '"');
      },
      setPretexts: (text) => {
        const subString = '(^|[ \u00A0(\uF000«‹»›„“‟”"])([а-яёa-z]{1,2}) ';
        const newString = '$1$2\u00A0';
        const re = new RegExp(subString, 'gim');
        return text.replace(re, newString).replace(re, newString);
      },
      setQuotes: (text) => {
        return this.settings.locale === 'ru_RU' ?
          text.replace(/"([^"]*)"/g, '«$1»') :
          text.replace(/"([^"]*)"/g, '“$1”').replace(/«([^"]*)»/g, '“$1”');
      },
      setDashes: (text) => {
        const re = new RegExp('([ \u00A0])(--?|‒|–|—)([ \u00A0\\n])', 'g');
        return text.replace(re, '\u00A0\u2014$3');
      },
      setSpaceAfterNumber: (text) => {
        const re = '(^|\\D)(\\d{1,5}) ([а-яёa-z]+)';
        return text.replace(new RegExp(re, 'gi'), '$1$2\u00A0$3');
      },
      setApostrophe: (text) => {
        if(this.settings.locale !== 'en_US')
          return text;
        const re = new RegExp('([a-z])\'([a-z])', 'gi');
        return text.replace(re, '$1’$2');
      },
      removeRepeatedSpaces: (text) => {
        return text.replace(/([^\n \t])[ \t]{2,}(?![\n \t])/g, '$1 ');
      },
    };
  }
}