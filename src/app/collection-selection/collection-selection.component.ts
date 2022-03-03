import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { map } from 'rxjs';
import { CollectionDaoService } from '../collection-dao.service';

@Component({
  selector: 'app-collection-selection',
  templateUrl: './collection-selection.component.html',
  styleUrls: ['./collection-selection.component.scss']
})
export class CollectionSelectionComponent implements OnInit {
  @ViewChild('pcapU')
  pcapUploadComponent!: FileUpload;

  collections: any[] = [];
  
  loading = false;
  submitted = false;
  colName: string | null = null;
  colNameValid = false;
  pcap: File | null = null;

  constructor(
    private dao: CollectionDaoService,
    private messageService: MessageService,
    private primeConfig: PrimeNGConfig,
    private router: Router,
    private conf: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
    this.getCol();
  }

  public selectCol(col: string) {
    this.router.navigate(["tables"], {queryParams: {col: col}})
  }

  public delCol(col: string, event: any) {
    this.conf.confirm({
      target: event.target,
      message: "Are you sure you want to delete this collection? \nYou cannot recover it after it is deleted.",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.dao.deleteCollection(col).then(() => this.getCol());
      }
    })
  }

  public getSelectedFile(event: any) {
    this.pcap = event.files[0];
  }

  public upload() {
    this.submitted = true;
    this.colNameValid = this.colName != null && !this.collections.includes(this.colName);
    if(this.pcap && this.colNameValid){
      this.loading = true;
      this.dao.uploadPcap(this.pcap, this.colName!).then(() => {
        this.submitted = false;
        this.colName = null;
        this.pcap = null;
        this.pcapUploadComponent.clear();
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: ".pcap file successfully uploaded"
        })
        this.loading = false;
        this.getCol();
      });
    }
  }

  private getCol() {
    this.dao.getCollections().then((c: any) => this.collections = c);  }
}
