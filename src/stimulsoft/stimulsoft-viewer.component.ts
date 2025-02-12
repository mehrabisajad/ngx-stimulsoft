import { Component, effect, inject, input, OnInit, output, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { NgxSourceService } from 'ngx-source';
import { IStimulsoftOption } from './config';
import { StimulsoftSourceName } from './stimulsoft-source-name.model';
import { StimulsoftService } from './stimulsoft.service';
import { UniqueComponentId } from './util';

declare let Stimulsoft: any;

@Component({
  selector: 'ngx-stimulsoft-viewer',
  template: ` <div [id]="id()"></div>`,
})
export class StimulsoftViewerComponent implements OnInit {
  stimulsoftService = inject(StimulsoftService);
  sourceService = inject(NgxSourceService);
  private document = inject(DOCUMENT);

  id = input<string>(UniqueComponentId());
  baseUrl = input<string | undefined>(this.stimulsoftService.baseUrl);
  fileName = input.required<string>();
  fonts = input<Record<string, string> | undefined>(this.stimulsoftService.fonts);
  dataSet = input.required<any>();
  options = input<IStimulsoftOption | undefined>(this.stimulsoftService.options);
  ready = output<boolean>();
  isLoadedSource = signal(false);

  private stimulsoftOptions: any;
  private stimulsoftViewer: any;
  private stimulsoftReport: any;

  constructor() {
    this.sourceService.addSources(...this.stimulsoftService.stimulsoftSourceStore);

    effect(() => {
      const _ = [this.isLoadedSource(), this.options(), this.fonts(), this.dataSet(), this.fileName(), this.id()];
      this.initStimulsoft();
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.sourceService.loadBySourceName(StimulsoftSourceName.CSS_STIMULSOFT_VIEWER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.STIMULSOFT_REPORTER);
    await this.sourceService.loadBySourceName(StimulsoftSourceName.STIMULSOFT_VIEWER);
    this.isLoadedSource.set(true);
  }

  private initStimulsoft(): void {
    this.ready.emit(false);
    if (this.isLoadedSource()) {
      this.stimulsoftOptions = new Stimulsoft.Viewer.StiViewerOptions();
      this.stimulsoftViewer = new Stimulsoft.Viewer.StiViewer(this.stimulsoftOptions, 'StiViewer', false);
      this.stimulsoftReport = new Stimulsoft.Report.StiReport();

      this.setOptions();
      this.load();
    }
  }

  protected setOptions(): void {
    this.deepCopy(this.options(), this.stimulsoftOptions);
  }

  protected deepCopy(source: any, target: any): void {
    if (source && target) {
      for (const [key, value] of Object.entries(source)) {
        if (key) {
          if (typeof value === 'object') {
            this.deepCopy(value, target[key]);
          } else {
            target[key] = value;
          }
        }
      }
    }
  }

  protected load(): void {
    if (this.stimulsoftOptions && this.stimulsoftViewer && this.stimulsoftReport && this.fileName() && this.dataSet()) {
      this.applyFont();
      this.loadFile();
      this.applyDataSet();

      this.stimulsoftViewer.report = this.stimulsoftReport;
      const element = this.document.getElementById(this.id());
      if (element) {
        this.ready.emit(true);
        this.stimulsoftViewer.renderHtml(this.id());
      } else {
        console.warn(`Element with id "${this.id()}" not found.`);
      }
    }
  }

  private applyFont() {
    // set fonts
    const fonts = this.fonts();
    if (fonts && typeof fonts === 'object') {
      for (const [key, value] of Object.entries(fonts ?? {})) {
        if (key && value) {
          try {
            Stimulsoft.Base.StiFontCollection.addOpentypeFontFile(value, key);
          } catch (e) {
            console.log('can`t load font: ' + value);
          }
        }
      }
    }
  }

  private applyDataSet() {
    if (this.dataSet()) {
      const dataSet = new Stimulsoft.System.Data.DataSet('DataSet');
      const strJson = JSON.stringify(this.dataSet());
      dataSet.readJson(strJson);
      this.stimulsoftReport.dictionary.databases.clear();
      this.stimulsoftReport.regData('DataSet', 'DataSet', dataSet);
    }
  }

  private loadFile() {
    // set mrt file
    const filename = this.fileName();
    if (filename) {
      const baseUrl = this.baseUrl();
      this.stimulsoftReport.loadFile((baseUrl ? baseUrl : '') + filename);
    }
  }
}
