import { Injectable } from '@angular/core';
import { Sculpture } from '../../types';
import { modelValidators } from '../../helpers';

@Injectable({
  providedIn: 'root',
})
export class SculpturesService {
  sculptures: Sculpture[] = [];

  constructor() {
    const savedSculptures = localStorage.getItem('sculptures');
    let sculptures: Sculpture[] = savedSculptures
      ? JSON.parse(savedSculptures)
      : [];

    sculptures = sculptures.filter(modelValidators.sculpture);
    this.sculptures = sculptures;
  }

  saveSculptures(): void {
    localStorage.setItem('sculptures', JSON.stringify(this.sculptures));
  }

  getAllSculptures(): Sculpture[] {
    return this.sculptures;
  }

  upsertSculpture(sculpture: Sculpture): Sculpture[] {
    const sculptureIndex = this.sculptures.findIndex(
      ({ id }) => id === sculpture.id
    );

    if (sculptureIndex >= 0) {
      this.sculptures[sculptureIndex] = sculpture;
    } else {
      this.sculptures.push(sculpture);
    }

    this.saveSculptures();
    return this.sculptures;
  }

  deleteSculpture(id: string): Sculpture[] {
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

    if (index + 1 >= this.sculptures.length) return undefined;

    return this.sculptures[index + 1];
  }

  getPreviousSculpture(id: string): Sculpture | undefined {
    const index = this.sculptures.findIndex((sculpture) => sculpture.id === id);
    if (index < 0) return;

    if (index - 1 < 0) return undefined;

    return this.sculptures[index - 1];
  }
}
