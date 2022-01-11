import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { PrimeNGConfig } from 'primeng/api';

import {PanelMenuModule} from 'primeng/panelmenu';
import {TableModule} from 'primeng/table';
import {FileUploadModule} from 'primeng/fileupload';

import { AppComponent } from './app.component';
import { BeaconTableComponent } from './beacon-table/beacon-table.component';
import { LongConnectionTableComponent } from './long-connection-table/long-connection-table.component';
import { DnsTableComponent } from './dns-table/dns-table.component';
import { UserAgentTableComponent } from './user-agent-table/user-agent-table.component';
import { HttpTrafficTableComponent } from './http-traffic-table/http-traffic-table.component';

@NgModule({
  declarations: [
    AppComponent,
    BeaconTableComponent,
    LongConnectionTableComponent,
    DnsTableComponent,
    UserAgentTableComponent,
    HttpTrafficTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PanelMenuModule,
    TableModule,
    FileUploadModule,
  ],
  providers: [
    PrimeNGConfig,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
