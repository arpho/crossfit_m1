import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  normalizeDate(date: any) {
    const NormalizedDate: Date = new Date(
      date.year.value,
      date.month.value - 1,
      date.day.value
    );
    return NormalizedDate;
  }

  constructor() { }
}
