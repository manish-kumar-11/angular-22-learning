import { Component, signal, Signal, computed, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  adultTickets:WritableSignal<number>  = signal<number>(0);
  childTickets:WritableSignal<number> = signal<number>(0);
  totalTickets:Signal<number> = computed<number>(() => this.adultTickets() + this.childTickets());
  protected readonly title = signal('angular-22-learning');
  readonly adultTicketPrice: number = 10;
  readonly childTicketPrice: number = 5;
  totalCost:Signal<number> = computed<number>(()=>{
    return (this.adultTickets()*this.adultTicketPrice) + (this.childTickets()*this.childTicketPrice);
  })

 summaryText : Signal<string> = computed<string>(
    () => {
      const show: string = this.selectedShowTime();
      const base: string = `You are booking ${this.totalTickets()} tickets, for $${this.totalCost()}`;
      return show ? `${base}, for the ${show} show.` : `${base}.`;
    }
  );


  readonly showTime:string[] = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'];

  selectedShowTime:WritableSignal<string> = signal<string>('');

selectShowTime(time:string):void{
  this.selectedShowTime.set(time);
}

  incrementAdultTickets(): void {
    this.adultTickets.update((value)=>value+1)
  }
  decrementAdultTickets(): void {
    this.adultTickets.update((value: number) => value > 0 ? value - 1 : value);
  }
  decrementChildTickets(): void {
    this.childTickets.update((value: number) => value > 0 ? value - 1 : value);
  }
  incrementChildTickets() :void {
    this.childTickets.update((value)=>value+1)
  }

  resetTickets():void{
    this.adultTickets.set(0);
    this.childTickets.set(0);
  }

  totalPrice(): number {
    return (this.adultTickets() * this.adultTicketPrice) + (this.childTickets() * this.childTicketPrice);
  }
}
