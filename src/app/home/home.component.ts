import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Profile } from '@models';
import { StorageHelper, AsyncHelper, ClipboardHelper } from '@helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  loading = true;
  form: FormGroup;

  isLinkedInShown: boolean;
  isStackOverFlowShown: boolean;
  isGitHubShown: boolean;
  isWebShown: boolean;

  private destroy$ = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.initForm();
    this.subscribeToToggles();
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.save());
    await this.preLoad();
    await AsyncHelper.delay(250);
    this.loading = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    this.form = this.fb.group({
      linkedIn: '',
      stackOverFlow: '',
      gitHub: '',
      web: '',
      isLinkedIn: null,
      isStackOverFlow: null,
      isGitHub: null,
      isWeb: null,
    });
  }

  private subscribeToToggles() {
    this.form.controls.isLinkedIn.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((state: boolean) => this.isLinkedInShown = state);
    this.form.controls.isStackOverFlow.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((state: boolean) => this.isStackOverFlowShown = state);
    this.form.controls.isGitHub.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((state: boolean) => this.isGitHubShown = state);
    this.form.controls.isWeb.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((state: boolean) => this.isWebShown = state);
  }

  private async preLoad() {
    const result = await this.existProfile();
    if (result) {
      const profile = JSON.parse(result) as Profile;
      this.form.setValue(profile);
    } else {
      this.form.setValue(new Profile());
    }
  }

  private async existProfile() {
    try {
      const data = await StorageHelper.getStorageValueAsPromise() as any;
      return data.profile;
    } catch {
      console.log('ERROR!');
    }
  }

  copyToClipboard(controlName: string) {
    const value = this.form.controls[controlName].value;
    if (value) {
      ClipboardHelper.copy(value);
      this.snackBar.open('Text copied into clipboard successfully!', null, { duration: 2000 });
    }
  }

  private async save() {
    const profileAsString = JSON.stringify(this.form.value);
    await StorageHelper.setStorageValueAsPromise(profileAsString);
  }

  async delete() {
    const empty = new Profile();
    this.form.reset(empty);
    await StorageHelper.removeStorageValueAsPromise();
    this.snackBar.open('Removed successfully!', null, { duration: 2000 });
  }

}
