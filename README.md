# NGX Stimulsoft

[![npm version](https://badge.fury.io/js/ngx-stimulsoft.svg)](http://badge.fury.io/js/ngx-stimulsoft)
[![GitHub issues](https://img.shields.io/github/issues/mehrabisajad/ngx-stimulsoft.svg)](https://github.com/mehrabisajad/ngx-stimulsoft/issues)
[![GitHub stars](https://img.shields.io/github/stars/mehrabisajad/ngx-stimulsoft.svg)](https://github.com/mehrabisajad/ngx-stimulsoft/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mehrabisajad/ngx-stimulsoft/master/LICENSE)

## Installation

First you need to install the npm module:

```
npm install ngx-stimulsoft --save
```

## Usage

#### Import the TranslateModule:

Finally, you can use ngx-stimulsoft in your Angular project. You have to import `NgxStimulsoftModule.forRoot()` in the root NgModule of your application.

The `forRoot` static method is a convention that provides and configures services at the same time.
Make sure you only call this method in the root module of your application, most of the time called `AppModule`.
This method allows you to configure the `NgxStimulsoftModule`.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IStimulsoftConfig, NgxStimulsoftModule } from 'ngx-stimulsoft';

const stimulsoftConfig: Partial<IStimulsoftConfig> = {
  baseUrl: '/content/reports/',
  stimulsoftViewerJsUrl: '/content/stimulsoft/stimulsoft.viewer.js',
  stimulsoftReportsJsUrl: '/content/stimulsoft/stimulsoft.reports.js',
  stimulsoftDesignerJsUrl: '/content/stimulsoft/stimulsoft.designer.js',
  stimulsoftDesignerCssUrl: '/content/stimulsoft/stimulsoft.designer.office2013.darkgrayblue.css',
  stimulsoftViewerCssUrl: '/content/stimulsoft/stimulsoft.viewer.office2013.darkgrayblue.css',
};

@NgModule({
  imports: [BrowserModule, NgxStimulsoftModule.forRoot(stimulsoftConfig)],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

##### SharedModule

If you use a `SharedModule` that you import in multiple other feature modules,
you can export the `NgxStimulsoftModule` to make sure you don't have to import it in every module.

```ts
@NgModule({
  exports: [CommonModule, NgxStimulsoftModule],
})
export class SharedModule {}
```
