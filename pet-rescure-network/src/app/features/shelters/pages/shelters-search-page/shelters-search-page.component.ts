import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatTableDataSource } from '@angular/material/table';

import { Shelter } from '../../../../shared/models/shelter.model';
import * as fromApp from './../../../../store/app.reducer';
import * as SheltersActions from './../../store/shelters.actions'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-shelters-search-page',
  templateUrl: './shelters-search-page.component.html',
  styleUrls: [],
})
export class SheltersSearchPageComponent implements OnInit, AfterViewInit, OnDestroy {
  shelters: Shelter[] = []
  dataSource: MatTableDataSource<Shelter> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'description', 'icons'];

  private sheltersSub!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.sheltersSub = this.store.select('shelters')
      .pipe(map(sheltersState => sheltersState.shelters))
      .subscribe((shelters: Shelter[]) => {
        this.shelters = shelters;
        this.dataSource.data = this.shelters;
      });
    this.store.dispatch(SheltersActions.fetchShelters())
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  redirectToDetails(id: string) { }

  redirectToUpdate(id: string) { }

  redirectToDelete(id: string) { }

  ngOnDestroy() {
    this.sheltersSub.unsubscribe()
  }
}
