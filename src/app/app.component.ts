import { Component } from '@angular/core';
import { LineOfBusiness } from './LineOfBusiness';
import { RecentQuotes } from './RecentQuotes';
import { LineOfBusinessService } from './lineOfBusiness.service';
import { RecentQuotesService } from './recent-quotes.service';
import { TopLOBByQuotes } from './TopLOBByQuotes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Agency Authority - Insurance Coverages Allowed to be Rated';

  linesOfBusiness: LineOfBusiness[] = [];
  recentQuotes: RecentQuotes[] = [];

  topLOB: TopLOBByQuotes[] = [];

  constructor(private lineOfBusinessService: LineOfBusinessService, private recentQuotesService: RecentQuotesService) { }

  ngOnInit() {
    this.getLinesOfBusiness();
    this.getRecentQuotes();

    setTimeout(()=>{
      this.getTopTwoLOB()
    },700)



  }

  getTopTwoLOB():void{
    let arr:TopLOBByQuotes[] =[];
      this.linesOfBusiness.forEach(lob => {
        let top: TopLOBByQuotes = new TopLOBByQuotes();
        top.name = lob.name;
        top.numOfQuotes = this.getNumberOfQuotesPerLOB(lob.id);

        this.topLOB.push(top);
        console.log(top)

      })

      this.topLOB.sort((a,b) => b.numOfQuotes - a.numOfQuotes);

      this.topLOB = this.topLOB.slice(0,2)

      console.log(this.topLOB)




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
}
