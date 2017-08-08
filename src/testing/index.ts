import { DebugElement } from '@angular/core';
import { tick, ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
export * from './mock-http-response';
export * from './mock-http';
export * from './mocks/data/mock.user.data';
export * from './mocks/services/mock.auth.service';
export * from './mocks/services/mock.todo.service';
export * from './mocks/data/mock.todo.data';

///// Short utilities /////
export function expectPathToBe(l: Location, path: string, expectationFailOutput?: any) {
  expect(l.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

/** Wait a tick, then detect changes */
export function advance(f: ComponentFixture<any>): void {
  tick();
  f.detectChanges();
}

// See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 }
};

/** Simulate element click. Defaults to mouse left-button click event. */
export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
