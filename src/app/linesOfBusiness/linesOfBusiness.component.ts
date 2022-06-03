import { Component, OnInit } from '@angular/core';

import { LineOfBusiness } from '../LineOfBusiness';
import { LineOfBusinessService } from '../lineOfBusiness.service';
import { RecentQuotesService } from '../recent-quotes.service';
import { RecentQuotes } from '../RecentQuotes';

@Component({
  selector: 'app-linesOfBusiness',
  templateUrl: './linesOfBusiness.component.html',
  styleUrls: ['./linesOfBusiness.component.css']
})
export class LineOfBusinessComponent implements OnInit {
  linesOfBusiness: LineOfBusiness[] = [];
  recentQuotes: RecentQuotes[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService, private recentQuotesService: RecentQuotesService) { }

  ngOnInit() {
    this.getLinesOfBusiness();
    this.getRecentQuotes();
  }

  getLinesOfBusiness(): void {
    this.lineOfBusinessService.getLinesOfBusiness()
    .subscribe(linesOfBusiness => this.linesOfBusiness = linesOfBusiness);
  }

  getNumberOfQuotesPerLOB(id: number): number{
      return this.recentQuotes.filter(quote => quote.lineOfBusiness === id).length
  }

  getRecentQuotes(): void {
    this.recentQuotesService.getRecentQuotes()
    .subscribe(recentQ => {
      this.recentQuotes = recentQ
      console.log(recentQ)});
  }

  add(name: string, description: string): void {
    name = name.trim();
    if (!name) { return; }
    this.lineOfBusinessService.addLineOfBusiness({ name, description } as LineOfBusiness)
      .subscribe(lineOfBusiness => {
        this.linesOfBusiness.push(lineOfBusiness);
      });
  }

  delete(lineOfBusiness: LineOfBusiness): void {
    this.linesOfBusiness = this.linesOfBusiness.filter(lob => lob !== lineOfBusiness);
    this.lineOfBusinessService.deleteLineOfBusiness(lineOfBusiness.id).subscribe();
  }

}
