# ngx stimulsoft
[![Build Status](https://travis-ci.org/mehrabisajad/ngx-stimulsoft.svg?branch=master)](https://travis-ci.org/mehrabisajad/ngx-stimulsoft)
[![codecov](https://codecov.io/gh/mehrabisajad/ngx-stimulsoft/branch/master/graph/badge.svg)](https://codecov.io/gh/mehrabisajad/ngx-stimulsoft)
[![npm version](https://badge.fury.io/js/ngx-stimulsoft.svg)](http://badge.fury.io/js/ngx-stimulsoft)
[![devDependency Status](https://david-dm.org/mehrabisajad/ngx-stimulsoft/dev-status.svg)](https://david-dm.org/mehrabisajad/ngx-stimulsoft?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/mehrabisajad/ngx-stimulsoft.svg)](https://github.com/mehrabisajad/ngx-stimulsoft/issues)
[![GitHub stars](https://img.shields.io/github/stars/mehrabisajad/ngx-stimulsoft.svg)](https://github.com/mehrabisajad/ngx-stimulsoft/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mehrabisajad/ngx-stimulsoft/master/LICENSE)

## Table of contents

- [About](#about)
- [Installation](#installation)

## About

angular stimulsoft, can report view and ...

## Installation

Install through npm:
```
npm install --save ngx-stimulsoft
```

use in one of your apps components:
```typescript
import { Component,OnInit } from '@angular/core';
import { Source, SourceType, NgxSourceService } from "ngx-stimulsoft";

@Component({
  template: ''
})
export class MyComponent implements OnInit {

    constructor(private ngxSourceService: NgxSourceService) {
        this.ngxSourceService.addSource(
            new Source('jquery', '/js/jquery.js', SourceType.SCRIPT)
        );
    }
    
    async ngOnInit() {
        await this.ngxSourceService.load('jquery');
        
        // use it
    }   


}
```
