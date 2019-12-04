import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, filter, map, startWith, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  breadcrumbs$: Observable<Array<BreadCrumb>>;
  smallScreen: boolean;
  @ViewChild(MatSidenav, {static: false}) sidenav: MatSidenav;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.breadcrumbs$ = this.router.events.pipe(
      takeUntil(this.destroy$),
      startWith(new NavigationEnd(0, '', '')),
      filter((event) => {
        return event instanceof NavigationEnd;
      }),
      distinctUntilChanged(),
      map((event) => {
        return buildBreadCrumb(this.activatedRoute.root);
      })
    );
  }

  protected destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



  getSidenavMode(): 'over' | 'push' | 'side' {
    if (!this.smallScreen) {
      return 'side';
    } else {
      return 'over';
    }
  }

  getSidenavOpened(): boolean {
    return !this.smallScreen;
  }
}

export interface BreadCrumb {
  label: string;
  url: string;
}

export function buildBreadCrumb(route: ActivatedRoute, url: string = '',
                                breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
  // If no routeConfig is avalailable we are on the root path
  const label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : 'Home';
  const path = route.routeConfig ? route.routeConfig.path : '';
  // In the routeConfig the complete path is not available,
  // so we rebuild it each time
  const nextUrl = `${url}${path}/`;
  const breadcrumb = {
    label,
    url: nextUrl
  };
  // const newBreadcrumbs = [...breadcrumbs, breadcrumb];
  const newBreadcrumbs = [breadcrumb];
  if (route.firstChild && route.children && route.children.length > 0) {
    // If we are not on our current path yet,
    // there will be more children to look after, to build our breadcumb
    return buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
  }
  return newBreadcrumbs;
}
