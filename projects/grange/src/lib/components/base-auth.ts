import { Grange } from '../grange.service';
import { ConfigurationService } from '@guillotinaweb/grange-core';


import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { markForCheck } from '@guillotinaweb/pastanaga-angular';

@Component({
  selector: 'grange-auth',
  templateUrl: './base-auth.html',
  styleUrls: ['./base-auth.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseAuthComponent implements OnInit {
    logo?: string;

    constructor(
        public grange: Grange,
        protected config: ConfigurationService,
        private cdr: ChangeDetectorRef
    ) {
      this.logo = this.config.get('LOGO');
    }

    ngOnInit() {
        this.grange.core.auth.isAuthenticated.subscribe(auth => {
            markForCheck(this.cdr);
        });
    }
}
