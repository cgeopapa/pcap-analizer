import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TableModule} from 'primeng/table';
import {FileUploadModule} from 'primeng/fileupload';
import {SplitterModule} from 'primeng/splitter';
import {ChartModule} from 'primeng/chart';
import {AccordionModule} from 'primeng/accordion';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {RippleModule} from 'primeng/ripple';

import { AppComponent } from './app.component';
import { BeaconTableComponent } from './beacon-table/beacon-table.component';
import { LongConnectionTableComponent } from './long-connection-table/long-connection-table.component';
import { DnsTableComponent } from './dns-table/dns-table.component';
import { UserAgentTableComponent } from './user-agent-table/user-agent-table.component';
import { HttpTrafficTableComponent } from './http-traffic-table/http-traffic-table.component';
import { MainTablesComponent } from './main-tables/main-tables.component';
import { CollectionSelectionComponent } from './collection-selection/collection-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    BeaconTableComponent,
    LongConnectionTableComponent,
    DnsTableComponent,
    UserAgentTableComponent,
    HttpTrafficTableComponent,
    MainTablesComponent,
    CollectionSelectionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PanelMenuModule,
    TableModule,
    FileUploadModule,
    SplitterModule,
    ChartModule,
    AccordionModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    RippleModule,
    ConfirmPopupModule,
  ],
  providers: [
    PrimeNGConfig,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
