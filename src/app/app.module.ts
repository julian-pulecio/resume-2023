import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoverComponent } from './components/cover/cover.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    CoverComponent,
    AboutmeComponent,
    PortfolioComponent,
    SkillsComponent,
    ProjectsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMasonryModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'), // Optional, only if you want the line numbers
        languages: {
          yaml: () => import('highlight.js/lib/languages/yaml'),
          python: () => import('highlight.js/lib/languages/python'),

        },
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
