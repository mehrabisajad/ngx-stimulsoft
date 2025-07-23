# NGX Stimulsoft

[![npm version](https://badge.fury.io/js/ngx-stimulsoft.svg)](https://badge.fury.io/js/ngx-stimulsoft)
[![GitHub issues](https://img.shields.io/github/issues/mehrabisajad/ngx-stimulsoft.svg)](https://github.com/mehrabisajad/ngx-stimulsoft/issues)
[![GitHub stars](https://img.shields.io/github/stars/mehrabisajad/ngx-stimulsoft.svg)](https://github.com/mehrabisajad/ngx-stimulsoft/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mehrabisajad/ngx-stimulsoft/master/LICENSE)

> Angular integration for [Stimulsoft Reports](https://www.stimulsoft.com) viewer and designer components.

---

## 📦 Installation

Install the package via npm:

```bash
npm install ngx-stimulsoft --save
```

---

## Usage

### Import the Module

To use `ngx-stimulsoft` in your Angular application, provide the Stimulsoft configuration in the root `NgModule`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { provideStimulsoft, IStimulsoftConfig } from 'ngx-stimulsoft';

const stimulsoftConfig: Partial<IStimulsoftConfig> = {
  baseUrl: '/content/reports/',
  viewerJsUrl: '/content/stimulsoft/stimulsoft.viewer.js',
  reportsJsUrl: '/content/stimulsoft/stimulsoft.reports.js',
  designerJsUrl: '/content/stimulsoft/stimulsoft.designer.js',
  designerCssUrl: '/content/stimulsoft/stimulsoft.designer.office2013.darkgrayblue.css',
  viewerCssUrl: '/content/stimulsoft/stimulsoft.viewer.office2013.darkgrayblue.css',
  licenseKey: '{{licenseKey}}', // Replace with your license key
};

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [provideStimulsoft(stimulsoftConfig)],
})
export class AppModule {}
```

### Using with a Shared Module

If you're using a `SharedModule` across multiple feature modules, you can export the `NgxStimulsoftModule` to avoid importing it repeatedly:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxStimulsoftModule } from 'ngx-stimulsoft';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, NgxStimulsoftModule],
})
export class SharedModule {}
```

---

## License

This project is licensed under the [MIT License](https://raw.githubusercontent.com/mehrabisajad/ngx-stimulsoft/master/LICENSE).

---
