import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Grange } from '../../grange.service';
import { RecoverInfo } from '@guillotinaweb/grange-core';
import { markForCheck } from '@guillotinaweb/pastanaga-angular';

@Component({
  selector: 'grange-forgot',
  templateUrl: './forgot.html',
  styleUrls: ['./forgot.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotView implements OnInit {
  error = '';
  isLogged: boolean;
  title: string;

  constructor(
    public grange: Grange,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.grange.core.auth.isAuthenticated.subscribe(auth => {
      this.isLogged = auth.state;
      markForCheck(this.cdr);
    });
  }

  onSubmit(data: RecoverInfo) {
    this.error = '';
    this.grange.core.auth.requestPasswordReset(data.login).subscribe(
      res => {
        // TODO: add a message
        this.grange.traverser.traverse('/');
      },
      err => {
        this.error = err.response.error.reason;
        markForCheck(this.cdr);
      }
    );
  }
}
