import { Injectable } from '@angular/core';
import { Sculpture } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class SculpturesService {
  sculptures: Sculpture[] = [];

  constructor() {
    const savedSculptures = localStorage.getItem('sculptures');
    const sculptures: Sculpture[] = savedSculptures
      ? JSON.parse(savedSculptures)
      : [];
    this.sculptures = sculptures;
  }

  saveSculptures(): void {
    localStorage.setItem('sculptures', JSON.stringify(this.sculptures));
  }

  getAllSculptures(): Sculpture[] {
    return this.sculptures;
  }

  addSculpture(sculpture: Sculpture): Sculpture[] {
    this.sculptures.push(sculpture);
    this.saveSculptures();
    return this.sculptures;
  }

  removeSculpture(id: string): Sculpture[] {
    this.sculptures = this.sculptures.filter(
      (sculpture) => sculpture.id !== id
    );
    this.saveSculptures();
    return this.sculptures;
  }

  getSculpture(id: string): Sculpture | undefined {
    return this.sculptures.find((sculpture) => sculpture.id === id);
  }

  getNextSculpture(id: string): Sculpture | undefined {
    const index = this.sculptures.findIndex((sculpture) => sculpture.id === id);
    if (index < 0) return;

    const nextIndex = index + 1 >= this.sculptures.length ? 0 : index + 1;
    return this.sculptures[nextIndex];
  }

  getPreviousSculpture(id: string): Sculpture | undefined {
    const index = this.sculptures.findIndex((sculpture) => sculpture.id === id);
    if (index < 0) return;

    const previousIndex =
      index - 1 < 0 ? this.sculptures.length - 1 : index - 1;
    return this.sculptures[previousIndex];
  }
}
