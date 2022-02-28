import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { CollectionDaoService } from '../collection-dao.service';

@Component({
  selector: 'app-collection-selection',
  templateUrl: './collection-selection.component.html',
  styleUrls: ['./collection-selection.component.scss']
})
export class CollectionSelectionComponent implements OnInit {
  @ViewChild('pcapU')
  pcapUploadComponent!: FileUpload;

  collections: string[] = [];
  
  submitted = false;
  colName: string | null = null;
  colNameValid = false;
  pcap: File | null = null;

  constructor(
    private dao: CollectionDaoService,
    private messageService: MessageService,
    private primeConfig: PrimeNGConfig,
  ) { }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
    this.dao.getCollections().subscribe((c: any) => {
      this.collections = c.collections;
    });
  }

  public getSelectedFile(event: any) {
    this.pcap = event.files[0];
  }

  upload() {
    this.submitted = true;
    this.colNameValid = this.colName != null && !this.collections.includes(this.colName);
    if(this.pcap && this.colNameValid){
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
      });
    }
  }
}
