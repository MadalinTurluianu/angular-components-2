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

  saveSculptures() {
    localStorage.setItem('sculptures', JSON.stringify(this.sculptures));
  }

  getAllSculptures(): Sculpture[] {
    return this.sculptures;
  }

  addSculpture(sculpture: Sculpture) {
    this.sculptures.push(sculpture);
    this.saveSculptures();
    return this.sculptures;
  }

  removeSculpture(id: string) {
    this.sculptures = this.sculptures.filter(
      (sculpture) => sculpture.id !== id
    );
    this.saveSculptures();
    return this.sculptures;
  }

  getSculpture(id: string) {
    const sculpture = this.sculptures.find((sculpture) => sculpture.id === id);
    return sculpture ?? null;
  }
}
