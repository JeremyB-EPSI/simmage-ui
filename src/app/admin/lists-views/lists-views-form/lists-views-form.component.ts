import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CanComponentDeactivate } from '../../../services/guards/can-deactivate.guard';
import { DbListsviewList } from '../../../services/backend/db-models/lists';
import { ListsViewsService } from '../lists-views.service';

@Component({
  selector: 'app-lists-views-form',
  templateUrl: './lists-views-form.component.html',
  styleUrls: ['./lists-views-form.component.css']
})
export class ListsViewsFormComponent implements OnInit, AfterViewInit, CanComponentDeactivate {

  @ViewChild('getfocus') getfocus: ElementRef;

  id: number;

  form: FormGroup;
  nameCtrl: FormControl;

  originalData: any = null;
  pleaseSave = false;

  errorMsg = '';
  errorDetails = '';

  constructor(private route: ActivatedRoute, public router: Router,
    private fb: FormBuilder, public service: ListsViewsService) { }

  ngOnInit() {

    this.route.data.pluck('listsViews')
      .subscribe((element: DbListsviewList) => {
        this.originalData = element;
        this.id = element ? element.liv_id : null;
        this.errorMsg = '';
        this.errorDetails = '';
        this.pleaseSave = false;
        if (this.form) {
          this.updateForm(element);
        } else {
          this.createForm(element);
        }
      });
  }

  ngAfterViewInit() {
    setTimeout(_ => this.getfocus.nativeElement.focus(), 0);
  }

  private createForm(data: DbListsviewList) {
    this.nameCtrl = new FormControl(data ? data.liv_name : '', Validators.required);
    this.form = this.fb.group({
      name: this.nameCtrl
    });
  }

  private updateForm(data: DbListsviewList) {
    this.nameCtrl.setValue(data ? data.liv_name : '');
  }

  onSubmit() {
    if (!this.id) {
      this.service.addListsViews(this.nameCtrl.value)
        .subscribe((ret: number) => {
          this.id = ret;
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error adding lists-views';
          this.errorDetails = err.text();
        });
    } else {
      this.service.updateListsViews(this.id, this.nameCtrl.value)
        .subscribe(ret => {
          this.goBackToList(true);
        },
        (err) => {
          this.errorMsg = 'Error updating lists-views';
          this.errorDetails = err.text();
        });
    }
  }

  doCancel() {
    this.goBackToList();
  }

  doReset() {
    this.createForm(this.originalData);
    this.pleaseSave = false;
  }

  doDelete() {
    this.service.deleteListsViews(this.id).subscribe(ret => {
      this.goBackToList();
    },
      (err) => {
        this.errorMsg = 'Error deleting lists-views';
        this.errorDetails = err.text();
      });
  }

  goBackToList(withSelected = false) {
    if (this.form) {
      this.form.reset();
    }
    if (withSelected) {
      this.router.navigate(['/admin/lists-views', { selid: this.id }]);
    } else {
      this.router.navigate(['/admin/lists-views']);
    }
  }

  canDeactivate() {
    const ret = this.form.pristine;
    this.pleaseSave = !ret;
    return ret;
  }
}
