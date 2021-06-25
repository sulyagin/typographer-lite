# Typographer Lite

A lightweight library for basic text typography on your website

### [Demo](https://sulyagin.github.io/typographer-lite/)

### Features

* Written in vanilla javascript, no dependencies needed
* Lightweight, only 2kb
* It can be using to the entire page or to selected parent container
* Two locales are supported, English and Russian
* No additional CSS needed

### Usage

Simply include

```<script src="./dist/typographer-lite.min.js"></script>```

Initialize globally

```const typographer = new typographerLite({ locale: 'en_US' });```

Or only for selected container

```
const typographer = new typographerLite({
    container: '.example__text',
    locale: 'en_US'
});
```

Options

```
{
    container: 'body',
    excludeTags: [ 'script', 'style', 'title', 'code' ],
    locale: 'ru_RU'
}
```

### License

The MIT License (MIT)

### Thanks

[Typograf](https://github.com/typograf) by [Denis Seleznev](https://github.com/hcodes) for some typography regular expressions
